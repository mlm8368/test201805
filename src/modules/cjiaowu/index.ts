// css
import '../../common/sass/mui.init.scss'
// import './index/style.scss'
// mui js
import '../../common/js/mui.init.js'
// self
import { $, viewEXT, nodeEnv } from '../../common/js/global.js'
import Index from './class/index.class'

const index = new Index()

if (nodeEnv === 'development') {
  index.openIndexVue()
}

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
  window.addEventListener('openLeftStaffOffcanvas', () => { index.openMenu('leftStaff') })
  window.addEventListener('openRightClassesOffcanvas', () => { index.openMenu('rightClasses') })
  $.plus.nativeUI.closeWaiting()

  index.openIndexVue()
})
