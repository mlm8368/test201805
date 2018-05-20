// css
import '../../common/sass/mui.init.scss'
import './index/style.scss'
// mui js
import '../../common/js/mui.init.js'
// self
import { $, viewEXT } from '../../common/js/global.js'
import * as config from './index/config'
import { ImageSliderImageStyles } from '../../class/interface'
import SIndex from './class/sindex.class'

const sIndex = new SIndex()

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
  let slideImages: ImageSliderImageStyles[] = []
  slideImages.push({ src: '_www/static/images/tmp/l1.png', width: '100%' })
  slideImages.push({ src: '_www/static/images/tmp/l2.png', width: '100%' })
  slideImages.push({ src: '_www/static/images/tmp/l3.png', width: '100%' })
  sIndex.setSlideImages(slideImages)
})
