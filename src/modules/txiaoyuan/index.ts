// css
import '../../common/sass/mui.init.scss'
import './index/style.scss'
// mui js
import '../../common/js/mui.init.js'
// self
import { $, viewEXT } from '../../common/js/global.js'
import * as config from './index/config'
import SFooterbar from './class/sfooterbar.class'
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
  $.noop()
})
// plusReady
$.plusReady(() => {
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

  // offcanvas
  setTimeout(() => { sIndex.setMenu() }, 100)
  window.addEventListener('openOffcanvas', () => { sIndex.openMenu() })

  // footerBar
  const sFooterbar = new SFooterbar(config.footbarProp)
  sFooterbar.initSubpage()
  const tabBarNView = $.plus.nativeObj.View.getViewById('tabBarTeacher')
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
})

// tap
$.byId('logout').addEventListener('tap', () => {
  sIndex.logout()
  sIndex.alert('期待你尽快回来哦', () => {
    $.plus.webview.close('tbanji_index')
  })
})
