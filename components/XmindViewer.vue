<template>
  <div id="xmind-container">
    <Loading v-if="showLoading"/>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
// 这样居然不能导入？
/*import Loading from 'Loading'*/

const showLoading = ref(true)

const props = defineProps({
  url: String,
  file: String
})

onMounted(async () => {
  const {XMindEmbedViewer} = await import('xmind-embed-viewer')
  const viewer = new XMindEmbedViewer({
    el: '#xmind-container', // HTMLElement | HTMLIFrameElement | string
    // 如果在中国大陆境内速度慢，可以添加的参数 `region: 'cn'` 改为使用 xmind.cn 的图库作为依赖。
    region: 'cn' //optinal, global(default) or cn
  })
  viewer.setStyles({
    width: '100%',
    height: '100%'
  })
  const callback = () => {
    showLoading.value = false
    viewer.removeEventListener('map-ready', callback)
  }
  viewer.addEventListener('map-ready', callback)

  if (props.file) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(props.file);
    reader.onload = function () {
      console.log("typeof reader.result",typeof reader.result)
      viewer.load(reader.result);
    };


  } else {
    fetch(props.url)
        .then(res => res.arrayBuffer())
        .then(file => {
          viewer.load(file)
        })
        .catch(err => {
          showLoading.value = false
          console.log('加载xmind文件出错！')
          viewer.removeEventListener('map-ready', callback)
        });
  }

})
</script>

<style>
#xmind-container {
  display: flex;
  height: 80vh;
  align-items: center;
  justify-content: center;
}
</style>