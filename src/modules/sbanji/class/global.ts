import { $, viewEXT } from '../../../common/js/global.js'

export function setParentScrollTop () {
  let parent = $.plus.webview.getWebviewById('sbanji_index')
  let bufferFn = $.buffer(() => {
    let scrollTop = document.body.scrollTop
    parent.evalJS(`mui&&mui.doScrollTop(${scrollTop});`)
  }, 150, this)
  window.addEventListener('scroll', bufferFn)
}
