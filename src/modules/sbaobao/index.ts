// css
import '../../common/sass/mui.init.scss'
import './index/style.scss'
// mui js
import '../../common/js/mui.init.js'
// self
import * as config from './index/config'
import { $, viewEXT } from '../../common/js/global.js'
import SFooterbar from './class/sfooterbar.class'
import SIndex from './class/sindex.class'

import { SbbTabBarItem } from '../../class/interface'
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
  // backbutton
  /*
  $.plus.key.addEventListener('backbutton', () => {
    if (!$.__back__first) {
      $.__back__first = new Date().getTime()
      $.toast('再按一次退出应用')
      setTimeout(function () { $.__back__first = null }, 2000)
    } else {
      if (new Date().getTime() - $.__back__first < 2000) $.plus.runtime.quit()
    }
  }, false)
  */

  // tabBar
  const sFooterbar = new SFooterbar(config.footbarProp)
  const tabBarNView = $.plus.nativeObj.View.getViewById('tabBarStudent')
  tabBarNView.addEventListener('click', function (e) {
    if (sFooterbar.getStatus() === 'doing') return
    let targetPage: string = null
    let activePage: string = sFooterbar.getActivePage()
    let currIndex: number = sFooterbar.getCurrIndex(window.innerWidth, e.clientX)

    if (currIndex > 0) targetPage = config.footbarProp.subpages[currIndex - 1].id
    else targetPage = config.footbarProp.firstWebviewId

    if (targetPage === activePage) return

    sFooterbar.toggleNview(currIndex)
    sFooterbar.changeSubpage(targetPage)
  })

  const sIndex = new SIndex()

  // offcanvas
  sIndex.setMenu()
  window.addEventListener('openOffcanvas', () => { sIndex.openMenu() })

  // tabBar
  let tabBarItems: SbbTabBarItem[] = [
    { id: 'sbaobao_baobao_1', url: './baobao' + viewEXT, title: '大宝', activeClass: 'mui-active', extras: { catid: 1 } },
    { id: 'sbaobao_baobao_2', url: './baobao' + viewEXT, title: '二宝', activeClass: '', extras: { catid: 2 } },
    { id: 'sbaobao_baobao_3', url: './baobao' + viewEXT, title: '三宝', activeClass: '', extras: { catid: 3 } },
    { id: 'sbaobao_baobao_4', url: './baobao' + viewEXT, title: '四宝', activeClass: '', extras: { catid: 4 } }
  ]
  sIndex.setTabBar(tabBarItems)
  $('#tabBar').on('tap', '.mui-control-item', function (e) {
    sIndex.switchTab(this.dataset.vwid)
  })
})
