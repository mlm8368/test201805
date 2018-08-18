// css
import '../../common/sass/mui.init.scss'
// import './index/style.scss'
// mui js
import '../../common/js/mui.init.js'
// self
import { $, viewEXT, setImmersedHeight } from '../../common/js/global.js'
import Vue from 'vue'
import Classes from './class/classes.vue'

// const vm = new Vue({
//   el: '#vue-app',
//   mounted: () => {
//     setImmersedHeight($.byId('header'))
//   },
//   render: h => h(Classes, {})
// })

// ready
$.init({
  swipeBack: false,
  keyEventBind: { backbutton: false, menubutton: false },
  gestureConfig: { tap: true, swipe: true, doubletap: false, longtap: false, hold: false, flick: false, drag: false, pinch: false }
})
$.ready(() => {
  if (viewEXT === '.htm') return
})
// plusReady
$.plusReady(() => {
  const main = $.plus.webview.currentWebview().opener()
  window.addEventListener('swiperight', () => {
    $.fire(main, 'closeOffcanvas')
  })

  const vm = new Vue({
    el: '#vue-app',
    mounted: () => {
      setImmersedHeight($.byId('header'))
    },
    render: h => h(Classes, {})
  })
})
