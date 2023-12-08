<template>
  <div id="xmind-container">
    <Loading v-if="showLoading"/>
  </div>
  <div class="xmind-btn-container">
    <button id="zoomScaleUp">放大</button>
    <button id="fitMapBtn">自适应</button>
    <button id="zoomScaleDown">缩小</button>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
// 参考 https://juejin.cn/post/7265112695837655080
// 通过https://github.com/xmindltd/xmind-embed-viewer实现xmind文件阅读功能
// 导入vue要加后缀。如果使用registerComponentsPlugin插件注册组件，那么可以不导入组件
import Loading from './Loading.vue'

const showLoading = ref(true)

const props = defineProps({
  url: String,
})
console.log('props.url', props.url)
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
    console.debug('callback')
    showLoading.value = false
    viewer.removeEventListener('map-ready', callback)
  }
  viewer.addEventListener('map-ready', callback)
  viewer.setFitMap()

  const fitMapButton = document.querySelector('#fitMapBtn')
  fitMapButton.addEventListener('click', () => viewer.setFitMap())


  // console.log('currentZoomScale', currentZoomScale.value)
  const distance = 5
  const minZoom = 20
  const maxZoom = 500
  const zoomScaleUp = document.querySelector('#zoomScaleUp')
  zoomScaleUp.addEventListener('click', () => {
    const newZoomScale = (viewer.zoom + distance) > maxZoom ? maxZoom : (viewer.zoom + distance)
    console.log('newZoomScale',newZoomScale)
    viewer.setZoomScale(newZoomScale)
  })

  const zoomScaleDown = document.querySelector('#zoomScaleDown')
  zoomScaleDown.addEventListener('click', () => {
    const newZoomScale = (viewer.zoom - distance) < minZoom ? minZoom : (viewer.zoom - distance)
    console.log('newZoomScale2',newZoomScale)
    viewer.setZoomScale(newZoomScale)
  })

  fetch(props.url)
      .then(res => res.arrayBuffer())
      .then(file => {
        console.debug('file', file)

        viewer.load(file)
      })
      .catch(err => {
        showLoading.value = false
        console.error('加载xmind文件出错！', err)
        viewer.removeEventListener('map-ready', callback)
      });

})
</script>

<style>
#xmind-container {
  display: flex;
  height: 80vh;
  align-items: center;
  justify-content: center;
  border: 1px #C9CDD4;

}

.xmind-btn-container {
  display: flex;
  margin: 20px;
  justify-content:center;
}

.xmind-btn-container button {
  margin-right: 5px;
  cursor: pointer;
  box-sizing: border-box;
  border: 0 #C9CDD4;
  border-radius: 2px;
  height: 32px;
}
</style>