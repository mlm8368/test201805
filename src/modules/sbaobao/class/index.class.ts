import { $, viewEXT } from '../../../common/js/global.js'
import * as config from '../index/config'
import { appStorageKey } from '../../../class/enum'
import Student from '../../../class/student.class'
import AuiSlide from '../../../plugin/aui/slide.js'

export default class Index extends Student {
  // Offcanvas
  private showMenu = false
  private main: any
  private menu: any
  // Auislide
  private slide: any
  private tabBarItems: any[]
  private studentid: number

  constructor () {
    super()
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
  public closeMenu (this: Index, closeMask = true) {
    if (closeMask) this.main.setStyle({ mask: 'none' })
    if (this.showMenu) {
      this.main.setStyle({ left: '0%', transition: { duration: 150 } })
      setTimeout(() => { this.menu.hide() }, 300)
      this.showMenu = false
    }
  }
  /**
   * setAuislide
   */
  public setTabBar (tabBarItems) {
    this.tabBarItems = tabBarItems
    this.studentid = this.tabBarItems[0].studentid

    const tabBodyHeight = $.plus.screen.resolutionHeight - (this.byId('tabBar').offsetHeight + $.immersed + config.common.titleNViewHeight + config.common.footerbarHeight)
    let tabBarHtml = []
    let slideNodeItems = []
    tabBarItems.forEach((tabBarItem, index) => {
      tabBarHtml.push(`<div class="aui-tab-item ${tabBarItem.activeClass}" data-index="${index}">${tabBarItem.title}</div>`)

      let slideNodeItem = `<div class="aui-slide-node">
      <div style="height:${tabBodyHeight}px;overflow-y:auto;">
      <section class="aui-content baobao_${index}"></section>
      <section class="aui-content aui-grid aui-margin-b-15 jiazhang parent_${index}"></section>
      <section class="aui-content school_${index}"></section>
      </div>
    </div>`
      slideNodeItems.push(slideNodeItem)
    })
    $('#tabBar').html(tabBarHtml.join(''))
    $('#slideBody').html(slideNodeItems.join(''))

    this.slide = new AuiSlide({
      container: document.getElementById('aui-slide'), height: tabBodyHeight, pageShow: false, loop: false, currentPage: (index) => {
        // console.log('AuiSlide-' + index)
        const tabItems = $.qsa('.aui-tab-item', this.byId('tabBar'))
        tabItems.forEach((element, k) => {
          if (k === index) element.classList.add('aui-active')
          else element.classList.remove('aui-active')
        })

        this.studentid = this.tabBarItems[index].studentid
        this.setStorage(appStorageKey.current_sbaobao_studentid, this.studentid)
        $.fire($.plus.webview.getWebviewById('sbaobao_school'), 'getClasses')
      }
    })
  }
  /**
   * switchTab
   */
  public switchTab (index: number) {
    this.slide.playTo(index)
  }

  /**
   * getCurrentIndex
   */
  public getSlideCurrentIndex (): number {
    return this.slide.getCurrentIndex()
  }

  /**
   * getCurrentStudentid
   */
  public getCurrentStudentid (): number {
    return this.studentid
  }
}
