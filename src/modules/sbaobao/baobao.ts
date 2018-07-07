// css
import '../../common/sass/mui.init.scss'
// import './index/style.scss'
// mui js
import '../../common/js/mui.init.js'
// self
import { $, viewEXT } from '../../common/js/global.js'
import SBaobao from './class/sbaobao.class'

let sBaobao = new SBaobao()

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
$.plusReady(function () {
  if (viewEXT === '.htm') return
  sBaobao.getBaobao($.currentWebview.studentid, () => {
    if ($.currentWebview.indexid === 0) {
      $.plus.nativeUI.closeWaiting()
      $.fire($.plus.webview.getWebviewById('sbaobao_school'), 'getClasses')
    }
  })
})
