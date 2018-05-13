import { $, viewEXT } from '../../../common/js/global.js'

import { barTagsStudent } from './config.js'

$.init({
  gestureConfig: { tap: true, doubletap: false, longtap: false, hold: false, flick: false, swipe: false, drag: false, pinch: false }
})

$.goPortal = function (type) {
  // student
  let statusbar = { background: '#FF0000' }
  let subNViews = [{
    'id': 'tabBarStudent',
    'styles': { bottom: '0px', left: '0px', height: '50px', width: '100%', backgroundColor: '#FFFFFF' },
    'tags': barTagsStudent
  }]
  let titleNView = { backgroundColor: '#D74B28', titleText: '宝宝', titleColor: '#CCCCCC' }
  $.openWindow({
    id: 'sbaobao_index',
    url: '../sbaobao/index' + viewEXT,
    styles: { top: '0px', backButtonAutoControl: 'quit', statusbar: statusbar, subNViews: subNViews, titleNView: titleNView }
  })
}
