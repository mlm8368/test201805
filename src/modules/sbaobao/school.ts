// css
import '../../common/sass/mui.init.scss'
// import './index/style.scss'
// mui js
import '../../common/js/mui.init.js'
// self
import { $, viewEXT, setImmersedHeight } from '../../common/js/global.js'
import School from './class/school.class'

let school = new School()

// ready
$.init({
  swipeBack: false,
  keyEventBind: { backbutton: false, menubutton: false },
  gestureConfig: { tap: true, swipe: true, doubletap: false, longtap: false, hold: false, flick: false, drag: false, pinch: false }
})
$.ready(() => {
  setImmersedHeight($.byId('header'))
  if (viewEXT === '.htm') return
})
// plusReady
$.plusReady(() => {
  if (viewEXT === '.htm') return
  // sSchool.getClasses()
})
// tap
$('body').on('tap', '.classes', (e) => {
  const classesid: number = parseInt(school.closestElement(e.target, 'li.classes').dataset.classesid, 10)
  school.setCurrentClassesid(classesid, 'reset')
  $.fire($.currentWebview.opener(), 'closeOffcanvas')
})
// fire
window.addEventListener('swipeleft', () => {
  $.fire($.currentWebview.opener(), 'closeOffcanvas')
})

window.addEventListener('getClasses', () => {
  school.getClasses()
})
