// css
import '../../common/sass/mui.init.scss'
// import './index/style.scss'
// mui js
import '../../common/js/mui.init.js'
// self
// import './index/init.ts'
import { $, viewEXT, setImmersedHeight } from '../../common/js/global.js'
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
  let parent = $.currentWebview.parent()
  window.addEventListener("scroll", () => {
    $.buffer(() => {
      let scrollTop = document.documentElement.scrollTop
      parent.evalJS(`mui&&mui.doScroll(${scrollTop});`)
    })
  });
  $.noop()
})
