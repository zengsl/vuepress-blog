---
date: 2025-12-11
order: 3
description:  PDFJS and vue component - PDFJS和相关vue组件
head:
   - - meta
     - name: keywords
       content: PDF,PDFJS,Vue预览组件
---

# PDF预览方案

底层通过[pdfjs组件](https://mozilla.github.io/pdf.js/)实现，
项目中为使用的方便使用二次封装组件[vue-office-pdf](https://github.com/zengsl/vue-office-pdf)

vue-office-pdf采用将pdfjs源码全部copy进项目的方案，对应的版本可能会比较老

## vue-office-pdf相关逻辑

> 支持渲染文件地址、文件对象，这里主要针对文件地址的渲染说明

调用PDFJS相关方法open -> GetDocument2 -> ensureDoc -> ensure 发起普通的文件获取请求，拉取所有的字节数

无论何种加载方式，都需要后端的配合。

### 全量加载

默认会进行全量加载，只要后端直接返回所有文件，响应体不包含`Accept-Range: bytes`

### 全量加载 + 被动Range加载

```js title="ensureDoc"
async ensure(n, J, O)
{
    try {
        const L = n[J];
        // 执行checkHandler
        return typeof L == "function" ? L.apply(n, O) : L;
    } catch (L) {
        if (!(L instanceof p.MissingDataException)) throw L;
        return await this.requestRange(L.begin, L.end), this.ensure(n, J, O);
    }
}
requestRange(n, J)
{
    return this.streamManager.requestRange(n, J);
}
```

`ensure`中有一个核心逻辑：调用checkHandler，如果检测到返回到字节数量和自己所需的不对应，那么就会报错。大概就会校验PDF文件前几个字节的魔术字，判断是否真的是PDF文件等等，具体不表。

如果发现缺失字节，就会抛出异常进入调用requestRange，从而升级为Range请求，即将按需加载字节（如果后端支持的话）。

假设后端能够支持Range请求而且我们就是希望进行Range请求，那么完全可以直接发起Range请求，避免第一次多余的全量加载请求。而且这此请求也需要后端做一些特殊的处理，下面讲到后端实现的内容时进行描述。

### 主动Range加载

` vue-office-pdf`组件默认使用PDFJS#open方法打开远程文件，且不支持全量加载，但通过一些改造实现主动的Range加载。

开启Range加载前，最好是能够知道文件的总长度，我们可以提前准备好并通过参数的形式传递；也可以在没有传递时，对文件地址发送HEAD请求的方式去探测`Content-Length`。

所以可以增加一个控制Range请求的参数`range`：
```ts
type RangConfig = {
    enable: boolean
    total: number
}
type RangProps = Boolean | RangConfig
export default defineComponent({
    props: {
        config: {
            default: () => toolbarConfig,
            type: Object as PropType<ToolbarConfig>,
        },
        title: {type: Boolean, default: () => false},
        pdf: {type: [String, ArrayBuffer]},
        args: {type: Object},
        theme: String as PropType<Theme>,
        fileName: String,
        idConfig: {type: Object as PropType<ToolbarIdConfig>},
        pageScale: [Number, String] as PropType<PageScale>,
        pageNumber: Number,
        range: {type: [Boolean, Object] as PropType<RangProps>, default: () => false},
    }
```

通过自定义`PDFDataRangeTransport`以实现Range请求，代码片段如下（详情参考[pdf-viewer.vue](https://github.com/zengsl/vue-office-pdf/blob/feature-vite/src/components/pdf-viewer.vue)）：
```ts
// PDFJS发送Range所需结构
class MyRangeTransport extends PDFDataRangeTransport {
    // 文件地址
    private readonly url: string;
    // 授权信息
    private readonly authorization: string;

    constructor(length: number, url: string, authorization: string) {
        super(length);
        this.url = url;
        this.authorization = authorization
    }

    // 关键：v2.x 中方法名是 requestDataRange，高版本中为requestRange
    async requestDataRange(begin: number, end: number) {
        const headers = new Headers()
        // 按需设置，否则可能出错。如：如果传递给MINIO不需要的Authorization或者格式不正确，MINIO可能会handlerAuth产生400的错误。
        if (this.authorization) {
            headers.set('Authorization', this.authorization);
        }
        // 注意：PDF.js 传入的 [begin, end) 是开区间
        // HTTP Range 是闭区间，所以请求 bytes=begin-(end-1)
        headers.set('Range', `bytes=${begin}-${end - 1}`);
        const response = await fetch(this.url, {
            headers
        });
        // 后端有可能判定文件过小不需要range请求而进行全量传输
        if (response.status !== 200 && response.status !== 206 ) {
            throw new Error(`Expected 206 Partial Content or 200,than got ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);

        // 回传数据给 PDF.js
        this.onDataRange && this.onDataRange(begin, data);
    }

    /* // 必须存在（会被 PDF.js 内部替换，但需占位）
     onDataRange(begin: number, chunk: Uint8Array) {
       // 实际逻辑由 PDF.js 注入，这里只是防止 undefined
     }*/
}


// 调用
pdfApp.PDFViewerApplication.open(props.pdf, finalArgs)
// 根据开关生成最终参数
// 构建最终使用的参数
const buildFinalArgs = async () => {
    // 是否开启了range请求，同时pdf是文件地址而不是字节数据
    if (rangeEnable.value && typeof props.pdf  === 'string') {
        // 认证信息
        const authorization = props.args?.httpHeaders?.Authorization
        // 文件总字节数
        let total = 0
        if (isRangeObject(props.range) && props.range.total) {
            total = props.range.total;
        } else {
            // 如果没有传递文件的总字节数量，那么就跟据文件地址发送HEAD请求获取文件总字节数
            const headers = new Headers();
            if (authorization) {
                headers.set('Authorization', authorization)
            }
            const res = await fetch(props.pdf, { method: 'HEAD', headers});
            if (res.ok) {
                const contentLength = res.headers.get('content-length');
                total = contentLength ? parseInt(contentLength) : 0;
            } else {
                console.error('Head请求获取文件长度失败，status: ', res.status)
            }
        }
        return {
            ...props.args,
            range: new MyRangeTransport(total, props.pdf, authorization)
        };
    } else {
        return props.args
    }
};
```

## 后端实现

如果支持Range请求，需要在响应体中增加`Accept-Ranges: bytes`

访问核心逻辑：判断是否有Range请求头，如果没有就返回全量数据，如果有就返回对应长度的数据。

探测Content-Length：通过对应的Head请求或者针对没有Range请求头时做特殊处理。

如果没有传递Range头时，想要当作探测请求的话（只传递`Content-Length`而不传递真实文件），需要做以下代码和Nginx处理：
```java
// 【情况二】 1.第一次处理分片请求
if (request == null || request.getHeader(HttpHeaders.RANGE) == null) {
    log.debug("Range detect-First");
    // Nginx可能需要关闭proxy_buffering，否则可能导致请求一直处于pending状态
    // 原因： content-length设置为实际文件大小，而不返回真实文件数据，导致nginx无法返回数据，请求一直处于pending状态。
    *//* Nginx配置示例：
 * location ^~ /test-api/file/gen-range {
 *             proxy_pass http://127.0.0.1:9320/pdf/gen-range;
 *             proxy_buffering off; # 关闭 Nginx 的缓存功能，防止PDF范围请求第一次获取content-length但是不返回对应数据，导致请求pending
 *         }
 *//*
    FileUtils.setRangeResponseHttpHeader(response, startByte, endByte, totalByte);
    
    response.setContentLengthLong(endByte - startByte + 1);
    response.setStatus(HttpServletResponse.SC_OK);
    // 防止报错
    response.getOutputStream().write(1);
    response.getOutputStream().flush();
} else {
    doPartialResourceTransfer(response, request, null, sysFileMetadata, totalByte, fileContentStream);
}*/
```

观察MINIO的处理：当没有接收到Range请求参数的时候，会全量返回文件以及响应体包含`Accept-Ranges: bytes`。前端上述PDFJS相关接方法收到`Accept-Ranges: bytes`会升级会Range请求，会持续发出Range请求，从而升级为范围加载文件。但是，第一次的全量文件传输并没有取消，仍然会占用贷款，影响性能。

所以结合上述总总情况，最好的方式就是在已知后端支持Range请求的时候，前端主动发起Range请求。这样后端代码和Nginx都不需要特殊处理。

最终的核心内容为：

```java title="相关代码"
@GetMapping("download/chunks/{fileCode}")
    public void downloadInChunks(HttpServletResponse response, HttpServletRequest request,
                                 @PathVariable("fileCode") String fileCode,
                                 @RequestHeader(value = "X-Full-Fetch", required = false, defaultValue = "false") Boolean isFullFetch) {
        try {
            // PDF小于一定大小不要分片
            int minSize = 1024 * 1024 * fileServiceProperties.getDownloadChunkSize();
            transferResource(request, response, fileCode, null, true, false, null,
                (sysFileMetadata) -> !fileServiceProperties.getChunkDownload() || (sysFileMetadata.getFileSize() < minSize || isFullFetch));
                
                
                
    }}
    
private void transferResource(HttpServletRequest request, HttpServletResponse response,
                                  String fileCode, String mimeType, boolean download,
                                  boolean needCache, BiConsumer<HttpServletResponse, SysFileMetadata> cacheSetter,
                                  Predicate<SysFileMetadata> disableRange) {
        if (fileCode == null) {
            log.warn("fileCode为空");
            response.setStatus(HttpStatus.NOT_FOUND.value());
            return;
        }

        try {
            SysFileDownloadStreamDTO fileContentStream = sysFileService.getFileContentStream(fileCode);
            if (fileContentStream == null || fileContentStream.getSysFileMetadata() == null) {
                log.warn("[getFileContent][fileCode( {})) 文件不存在]", fileCode);
                response.setStatus(HttpStatus.NOT_FOUND.value());
                return;
            }
            SysFileMetadata sysFileMetadata = fileContentStream.getSysFileMetadata();
            // 需要缓存
            if (needCache) {
                // 不存在缓存设置器，则使用默认逻辑
                if (cacheSetter == null) {
                    // 设置缓存头，由于fileCode和文件是一一对应且无法修改，所以将Cache-Control设置为1年
                    // 只允许浏览器缓存
                    response.setHeader(HttpHeaders.CACHE_CONTROL, "private, max-age=31536000");
                    response.setHeader(HttpHeaders.ETAG, generateEtag(sysFileMetadata));
                    response.setDateHeader(HttpHeaders.LAST_MODIFIED, sysFileMetadata.getModifyTime().getTime());
                } else {
                    cacheSetter.accept(response, sysFileMetadata);
                }

                //处理条件请求（If-None-Match / If-Modified-Since）
                if (isNotModified(request, sysFileMetadata)) {
                    response.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
                    return;
                }
            } else {
                // 安全资源默认【不缓存】：因为止CDN缓存、浏览器缓存均以请求路径为单位而忽略请求参数，如果缓存了预签名地址，攻击者无需获取签名等参数，可能存在非法访问的情况。
                // 优化方向：缓存策略可以通过不同文件类型来进行设置
                response.setHeader(HttpHeaders.CACHE_CONTROL, "no-store, private");
                response.setHeader(HttpHeaders.PRAGMA, "no-cache");
                response.setHeader(HttpHeaders.EXPIRES, "0");
            }

            String originalFilename = sysFileMetadata.getFileName();
            if (download) {
                FileUtils.setAttachmentResponseHeader(response, originalFilename);
            }
            // 如果有扩展名，优先用它推断 MIME；否则用原文件名(暂不需要精确的mimetype)
            if (mimeType == null) {
                mimeType = getMimeType(originalFilename);
            }

            long totalByte = sysFileMetadata.getFileSize();
            if (request.getHeader(HttpHeaders.RANGE) == null || (disableRange != null && disableRange.test(sysFileMetadata))) {
                response.setContentType(mimeType);
                response.setContentLengthLong(sysFileMetadata.getFileSize());
                response.setHeader("Accept-Ranges", "bytes");
                response.setStatus(HttpServletResponse.SC_OK);
                fileContentStream.transferTo(response);
            } else {
                doPartialResourceTransfer(response, request, mimeType, sysFileMetadata, totalByte, fileContentStream);
            }
        } catch (Exception e) {
            log.error("[getFileContent][fileCode({})) 文件下载失败]", fileCode, e);
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }
    
private void doPartialResourceTransfer(HttpServletResponse response, HttpServletRequest request, String mimeType, SysFileMetadata sysFileMetadata, long totalByte, SysFileDownloadStreamDTO fileContentStream) throws IOException {
        response.setContentType(mimeType);
        log.debug("Range execute");
        // 【情况二】 2.真实处理分片请求，返回分片数据
        // 开启range下载
        ServletServerHttpRequest inputMessage = new ServletServerHttpRequest(request);
        List<HttpRange> httpRanges = inputMessage.getHeaders().getRange();
        // 目前考虑单次处理一个范围
        HttpRange httpRange = httpRanges.getFirst();
        // 下载的字节范围
        long startByte = httpRange.getRangeStart(sysFileMetadata.getFileSize());
        long endByte = httpRange.getRangeEnd(sysFileMetadata.getFileSize());
        response.setStatus(HttpServletResponse.SC_PARTIAL_CONTENT);
        FileUtils.setRangeResponseHttpHeader(response, startByte, endByte, totalByte);
        try {
            fileContentStream.transferTo(response, startByte, endByte);
        } catch (IORuntimeException e) {
            log.error("【doPartialResourceTransfer】fileName= {}, fileHash= {} 文件下载失败，连接异常，可能是主动取消传输", sysFileMetadata.getFileName(), sysFileMetadata.getFileHash());
        }
    }
```

