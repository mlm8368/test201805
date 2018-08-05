// css
import '../../common/sass/mui.init.scss'
import './index/style.scss'
// mui js
import '../../common/js/mui.init.js'
// self
import { $, viewEXT } from '../../common/js/global.js'
import * as config from './index/config'
import { appStorageKey } from '../../class/enum'
import SFooterbar from './class/sfooterbar.class'
import Index from './class/index.class'
import Baobao from './class/baobao.class'

const index = new Index()
const baobao = new Baobao()

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
  setTimeout(() => { index.setMenu() }, 100)
  window.addEventListener('openOffcanvas', () => { index.openMenu() })

  // tabBar(baobao)
  let tabBarItems = []
  let userInfo = index.getStorage(appStorageKey.userInfo)
  if (userInfo && userInfo.student) {
    let studentids = userInfo.student.studentids.split(',')
    let relatename = userInfo.student.relatename.split(',')

    studentids.forEach((studentid, index) => {
      let one = { title: relatename[index], activeClass: '', studentid: studentid }
      if (index === 0) {
        one['activeClass'] = 'aui-active'
        index.setStorage(appStorageKey.current_sbaobao_studentid, studentid)
      }
      tabBarItems.push(one)
    })
  } else {
    tabBarItems = [
      { id: 0, title: '宝宝', activeClass: 'aui-active', studentid: 0 }
    ]
  }
  index.setTabBar(tabBarItems)
  $('#tabBar').on('tap', '.aui-tab-item', (e) => {
    index.switchTab(e.target.dataset.index)
  })
  // getBaobao
  const doRenderBaobao = () => {
    $.plus.nativeUI.closeWaiting()

    tabBarItems.forEach((tabBarItem, index) => {
      baobao.renderBaobao(tabBarItem.studentid, index)
    })

    $.fire($.plus.webview.getWebviewById('sbaobao_school'), 'getClasses')
  }
  baobao.getBaobao(doRenderBaobao)
  // refreshBaobao
  window.addEventListener('refreshBaobao', (event: any) => {
    if (event.detail.op && event.detail.op === 'rmcache') {
      $.plus.nativeUI.showWaiting()
      baobao.rmBaobaoCache()
    }
    baobao.getBaobao(doRenderBaobao)
  })
  // renderBaobao
  window.addEventListener('renderBaobao', () => {
    baobao.renderBaobao(index.getCurrentStudentid(), index.getSlideCurrentIndex())
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
  // updateSubNViews
  window.addEventListener('updateSubNViews', (event: any) => {
    const schoolInfo = index.getSchoolInfo(event.detail.studentid, event.detail.classesid)
    sFooterbar.updateSubNViews(schoolInfo.schoolFirstchar, schoolInfo.classesFirstchar)
  })
})
