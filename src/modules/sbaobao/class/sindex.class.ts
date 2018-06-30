import { $, viewEXT } from '../../../common/js/global.js'
import Student from '../../../class/student.class'
import Cache from '../../../class/cache.class'
import WebviewGroup from '../../../plugin/aui/webviewGroup.js'
import { TabBarItem } from '../../../class/interface'
import * as config from '../index/config'

export default class SIndex extends Student {
  private cache: any
  // Offcanvas
  private showMenu = false
  private main: any
  private menu: any
  // WebviewGroup
  private group: any

  constructor () {
    super()
    this.cache = new Cache()
    $.plusReady(() => {
      this.main = $.currentWebview
    })
  }

  /**
   * setMenu
   */
  public setMenu () {
    // this.menu = $.preload({ id: 'sbaobao_school', url: './school' + viewEXT, styles: { left: '0%', width: '70%', backButtonAutoControl: 'none', bounce: 'none' } })
    // $.options.beforeback = (): boolean => {
    //   if (this.showMenu) {
    //     this.closeMenu()
    //     return false
    //   } else {
    //     this.menu.close('none')
    //     return true
    //   }
    // }
    this.menu = $.plus.webview.create('./school' + viewEXT, 'sbaobao_school', { left: '0%', bottom: '0px', width: '70%', height: '100%', backButtonAutoControl: 'none', bounce: 'none' })
    this.main.addEventListener('maskClick', () => {
      this.main.setStyle({ mask: 'none' })
      this.closeMenu(false)
    }, false)
    window.addEventListener('dragright', function (e: any) { e.detail.gesture.preventDefault() })
    window.addEventListener('dragleft', function (e: any) { e.detail.gesture.preventDefault() })
    window.addEventListener('closeOffcanvas', () => { this.closeMenu() })
  }
  /**
   * openMenu
   */
  public openMenu () {
    if (!this.showMenu) {
      this.menu.show('none', 0, () => {
        this.main.setStyle({ left: '70%', transition: { duration: 150 } })
      })
      this.main.setStyle({ mask: 'rgba(0,0,0,0.5)' })
      this.showMenu = true
    }
  }

  /**
   * closeMenu
   */
  public closeMenu (this: SIndex, closeMask = true) {
    if (closeMask) this.main.setStyle({ mask: 'none' })
    if (this.showMenu) {
      this.main.setStyle({ left: '0%', transition: { duration: 150 } })
      setTimeout(() => { this.menu.hide() }, 300)
      this.showMenu = false
    }
  }
  /**
   * setWebviewGroupItems
   */
  public setTabBar (tabBarItems: TabBarItem[]) {
    const tabHeightAll = $.byId('tabBar').offsetHeight + $.immersed + config.common.titleNViewHeight
    let WebviewGroupItems = []
    let tabBarHtml = []
    for (const tabBarItem of tabBarItems) {
      tabBarHtml.push(`<div class="aui-tab-item mui-control-item ${tabBarItem.activeClass}" data-vwid="${tabBarItem.id}">${tabBarItem.title}</div>`)

      let WebviewGroupItem = { id: tabBarItem.id, url: tabBarItem.url,
        styles: { top: tabHeightAll + 'px', bottom: config.common.footerbarHeight + 'px', render: 'always', backButtonAutoControl: 'none', bounce: 'none' }
      }
      if (tabBarItem.extras) WebviewGroupItem['extras'] = tabBarItem.extras
      WebviewGroupItems.push(WebviewGroupItem)
    }

    $('#tabBar').html(tabBarHtml.join(''))

    this.group = new WebviewGroup(this.main.id, {
      top: tabHeightAll + 'px', // 切换遮罩view
      height: '100%', // 切换遮罩view
      items: WebviewGroupItems,
      onChange: (obj) => {
        $.log(obj)
        const c = document.querySelector('.mui-control-item.mui-active')
        if (c) c.classList.remove('mui-active')

        const target = document.querySelector('.mui-scroll .mui-control-item:nth-child(' + (obj.index + 1) + ')')
        target.classList.add('mui-active')
        if (target.scrollIntoView) target.scrollIntoView()

        this.setStorage('sbaobao_studentid_current', tabBarItems[obj.index].extras.studentid)
        $.fire($.plus.webview.getWebviewById('sbaobao_school'), 'getClasses')
      }
    })
  }
  /**
   * switchTab
   */
  public switchTab (vwid: string) {
    this.group.switchTab(vwid)
  }
}
