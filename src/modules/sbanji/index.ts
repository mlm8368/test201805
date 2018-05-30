// css
import '../../common/sass/mui.init.scss'
// import './index/style.scss'
// mui js
import '../../common/js/mui.init.js'
// self
import { $, viewEXT, setImmersedHeight } from '../../common/js/global.js'
import SIndex from './class/sindex.class'

import { SbbTabBarItem } from '../../class/interface'

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
$.plusReady(() => {
  // tabBar
  let tabBarItems: SbbTabBarItem[] = [
    { id: 'sbanji_timeline', url: './timeline' + viewEXT, title: '成长记录', activeClass: 'mui-active', extras: { catid: 1 } },
    { id: 'sbanji_groupteacher', url: './groupteacher' + viewEXT, title: '老师群', activeClass: '', extras: { catid: 2 } },
    { id: 'sbanji_groupparent', url: './groupparent' + viewEXT, title: '家长群', activeClass: '', extras: { catid: 3 } }
  ]
  sIndex.setTabBar(tabBarItems)
  $('#tabBar').on('tap', '.mui-control-item', function (e) {
    sIndex.switchTab(this.dataset.vwid)
  })
})
