// css
import '../../common/sass/mui.init.scss'
import './index/style.scss'
// mui js
import '../../common/js/mui.init.js'
// self
import { $, viewEXT } from '../../common/js/global.js'
import * as config from './index/config'
import { ImageSliderImageStyles } from '../../class/interface'
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
  $.noop()
})
// plusReady
$.plusReady(() => {
  let slideImages: ImageSliderImageStyles[] = []
  slideImages.push({ src: '_www/static/images/tmp/l1.png', width: '100%' })
  slideImages.push({ src: '_www/static/images/tmp/l2.png', width: '100%' })
  slideImages.push({ src: '_www/static/images/tmp/l3.png', width: '100%' })
  index.setSlideImages(slideImages)
})
// updateTitleNViewTitle
window.addEventListener('updateTitleNViewTitle', (event: any) => {
  const schoolInfo = index.getSchoolInfo(event.detail.studentid, event.detail.classesid)
  $.currentWebview.setStyle({ titleNView: { titleText: schoolInfo.schoolName } })
})
