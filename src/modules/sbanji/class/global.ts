import { $, viewEXT } from '../../../common/js/global.js'

export function setParentScroll () {
  let parent = $.currentWebview.parent()
  let bufferFn = $.buffer(() => {
    let scrollTop = document.body.scrollTop
    parent.evalJS(`mui&&mui.doScrollTop(${scrollTop});`)
  }, 150, this)
  window.addEventListener('scroll', bufferFn)
}
