// css
import '../../common/sass/mui.init.scss'
import './teacher/style.css'
// mui js
import '../../common/js/mui.init.js'
// self
import { $, viewEXT, nodeEnv } from '../../common/js/global.js'
import Vue from 'vue'
import Teacher from './class/teacher.vue'

if (nodeEnv === 'development') {
  const vm = new Vue({
    el: '#vue-app',
    render: h => h(Teacher, null)
  })
}

// ready
$.init({
  swipeBack: true,
  keyEventBind: { backbutton: false, menubutton: false },
  gestureConfig: { tap: true, swipe: true, doubletap: false, longtap: false, hold: false, flick: false, drag: false, pinch: false }
})
$.ready(() => {
  if (viewEXT === '.htm') return
  $.noop()
})
// plusReady
$.plusReady(() => {
  const vm = new Vue({
    el: '#vue-app',
    render: h => h(Teacher, null)
  })
})
