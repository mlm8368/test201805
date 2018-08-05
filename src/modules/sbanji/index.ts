// css
import '../../common/sass/mui.init.scss'
import './index/style.scss'
// mui js
import '../../common/js/mui.init.js'
// self
import { $, viewEXT } from '../../common/js/global.js'
import Index from './class/index.class'

const index = new Index()

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
  index.getTimeLine()
})

// fire
window.addEventListener('reloadPage', () => {
  index.setVueData('refresh')
})
// updateTitleNViewTitle
window.addEventListener('updateTitleNViewTitle', (event: any) => {
  const schoolInfo = index.getSchoolInfo(event.detail.studentid, event.detail.classesid)
  $.currentWebview.setStyle({ titleNView: { titleText: schoolInfo.classesName } })
})
