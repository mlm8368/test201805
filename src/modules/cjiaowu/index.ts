// css
import '../../common/sass/mui.init.scss'
// import './index/style.scss'
// mui js
import '../../common/js/mui.init.js'
// self
import { $, viewEXT } from '../../common/js/global.js'
import Index from './class/index.class'
import Vue from 'vue'
import IndexVue from './class/index.vue'

const index = new Index()

const vm = new Vue({
  el: '#vue-app',
  render: h => h(IndexVue, {})
})

// ready
$.init({
  swipeBack: false,
  keyEventBind: { backbutton: false, menubutton: false },
  gestureConfig: { tap: true, swipe: true, doubletap: false, longtap: false, hold: false, flick: false, drag: false, pinch: false }
})
$.ready(() => {
  if (viewEXT === '.htm') return
  $.noop()
})
// plusReady
$.plusReady(() => {
  // offcanvas
  setTimeout(() => { index.setMenu() }, 100)
  window.addEventListener('openRightClassesOffcanvas', () => { index.openMenu() })
  $.plus.nativeUI.closeWaiting()

  const vm = new Vue({
    el: '#vue-app',
    render: h => h(IndexVue, {})
  })
})
