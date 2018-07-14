// css
import '../../common/sass/mui.init.scss'
import './index/style.scss'
// mui js
import '../../common/js/mui.init.js'
// self
import { $, viewEXT } from '../../common/js/global.js'
// import SIndex from './class/sindex.class'
// vue
import Vue from 'vue'
import TimeLine from './class/TimeLine.vue'

// const sIndex = new SIndex()

// ready
$.init({
  swipeBack: false,
  keyEventBind: { backbutton: false, menubutton: false },
  gestureConfig: { tap: true, swipe: false, doubletap: false, longtap: false, hold: false, flick: false, drag: false, pinch: false }
})
$.ready(function () {
  if (viewEXT === '.htm') return
  $.noop()
})
// plusReady
$.plusReady(() => {
  $.noop()
})
// vue
const vm = new Vue({
  el: '#vue-app',
  components: { 'time-line': TimeLine }
})
