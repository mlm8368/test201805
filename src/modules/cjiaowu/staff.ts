// css
import '../../common/sass/mui.init.scss'
import './staff/style.css'
// mui js
import '../../common/js/mui.init.js'
// self
import { $, viewEXT, nodeEnv, setImmersedHeight } from '../../common/js/global.js'
import Vue from 'vue'
import Staff from './class/staff.vue'

if (nodeEnv === 'development') {
  const vm = new Vue({
    el: '#vue-app',
    mounted: () => {
      setImmersedHeight($.byId('header'))
    },
    render: h => h(Staff, null)
  })
}

// ready
$.init({
  swipeBack: false,
  keyEventBind: { backbutton: false, menubutton: false },
  gestureConfig: { tap: true, swipe: true, doubletap: false, longtap: false, hold: false, flick: false, drag: false, pinch: false }
})
// plusReady
$.plusReady(() => {
  const main = $.currentWebview.opener()
  window.addEventListener('swipeleft', () => {
    $.fire(main, 'closeOffcanvas')
  })

  const vm = new Vue({
    el: '#vue-app',
    mounted: () => {
      setImmersedHeight($.byId('header'))
    },
    render: h => h(Staff, null)
  })
})
