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
import SBaobao from './class/sbaobao.class'

const sIndex = new SIndex()
const sBaobao = new SBaobao()

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
  // refreshBaobao
  window.addEventListener('refreshBaobao', () => {
    const c = document.querySelector('.aui-tab-item.aui-active')
    sIndex.refreshBaobao(c.getAttribute('data-index'))
  })

  // tabBar(baobao)
  let tabBarItems = []
  let userInfo = sIndex.getStorage('userInfo')
  if (userInfo && userInfo.student) {
    let studentids = userInfo.student.studentids.split(',')
    let relatename = userInfo.student.relatename.split(',')

    studentids.forEach((studentid, index) => {
      let one = { title: relatename[index], activeClass: '', studentid: studentid }
      if (index === 0) {
        one['activeClass'] = 'aui-active'
        sIndex.setStorage('current_sbaobao_studentid', studentid)
      }
      tabBarItems.push(one)
    })
  } else {
    tabBarItems = [
      { id: 0, title: '宝宝', activeClass: 'aui-active', studentid: 0 }
    ]
  }
  sIndex.setTabBar(tabBarItems)
  $('#tabBar').on('tap', '.aui-tab-item', (e) => {
    sIndex.switchTab(e.target.dataset.index, true)
  })
  // getBaobao
  sBaobao.getBaobao((baobaos) => {
    $.plus.nativeUI.closeWaiting()

    tabBarItems.forEach((tabBarItem, index) => {
      sBaobao.renderBaobao(tabBarItem.studentid, index, baobaos)
    })

    $.fire($.plus.webview.getWebviewById('sbaobao_school'), 'getClasses')
  })

  // footerBar
  const sFooterbar = new SFooterbar(config.footbarProp)
  sFooterbar.initSubpage()
  const tabBarNView = $.plus.nativeObj.View.getViewById('tabBarStudent')
  tabBarNView.addEventListener('click', (e) => {
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
