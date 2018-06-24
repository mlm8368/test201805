// css
import '../../common/sass/mui.init.scss'
// import './index/style.scss'
// mui js
import '../../common/js/mui.init.js'
// self
import { $, viewEXT, setImmersedHeight } from '../../common/js/global.js'
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
  window.addEventListener('swipeleft', () => {
    $.fire($.currentWebview.opener(), 'closeOffcanvas')
  })
})
