// css
import '../../common/sass/mui.init.scss'
import './student/style.css'
// mui js
import '../../common/js/mui.init.js'
// self
import { $, viewEXT, nodeEnv } from '../../common/js/global.js'
import Vue from 'vue'
import Student from './class/student.vue'

if (nodeEnv === 'development') {
  const vm = new Vue({
    el: '#vue-app',
    render: h => h(Student, null)
  })
}

// ready
$.init({
  swipeBack: false,
  keyEventBind: { backbutton: false, menubutton: false },
  gestureConfig: { tap: true, swipe: false, doubletap: false, longtap: false, hold: false, flick: false, drag: false, pinch: false }
})
// plusReady
$.plusReady(() => {
  const vm = new Vue({
    el: '#vue-app',
    render: h => h(Student, null)
  })
})
