import { $, viewEXT } from '../../../common/js/global.js'
// import util from '../../../common/js/util.js'

let activePage = null

$.plus = null
$.init({
  gestureConfig: { tap: true, doubletap: false, longtap: false, hold: false, flick: false, swipe: false, drag: false, pinch: false }
})

// $.clickTabBar = function (e) {
//   let targetPage = null
//   let subpages = util.options.subpages
//   let currIndex = util.getCurrIndex(window.innerWidth, e.clientX)
//   if (!activePage) activePage = $.plus.webview.currentWebview()
//   if (currIndex > 0) {
//     targetPage = $.plus.webview.getWebviewById(subpages[currIndex - 1])
//   } else {
//     targetPage = $.plus.webview.currentWebview()
//   }
//   if (targetPage === activePage) {
//     return
//   }
//   // change
//   util.toggleNview(currIndex)
//   util.changeSubpage(targetPage, activePage, {})
//   activePage = targetPage
// }
