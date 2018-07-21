// css
import '../../common/sass/mui.init.scss'
import './index/style.scss'
// mui js
import '../../common/js/mui.init.js'
// self
import { $, viewEXT } from '../../common/js/global.js'
import SIndex from './class/sindex.class'

const sIndex = new SIndex()

// ready
$.init({
  swipeBack: false,
  keyEventBind: { backbutton: false, menubutton: false },
  gestureConfig: { tap: true, swipe: false, doubletap: false, longtap: false, hold: false, flick: false, drag: false, pinch: false }
})
$.ready(() => {
  if (viewEXT === '.htm') return
})
// plusReady
$.plusReady(() => {
  if (viewEXT === '.htm') return
  sIndex.getTimeLine()
})

// fire
window.addEventListener('refreshVueData', () => {
  sIndex.setVueData('refresh')
})
// updateTitleNViewTitle
window.addEventListener('updateTitleNViewTitle', (event: any) => {
  const schoolInfo = sIndex.getSchoolInfo(event.detail.studentid, event.detail.classesid)
  $.currentWebview.setStyle({ titleNView: { titleText: schoolInfo.classesName } })
  $.currentWebview.reload(true)
})
