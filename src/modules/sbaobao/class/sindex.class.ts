import { $, viewEXT } from '../../../common/js/global.js'
import Student from '../../../class/student.class'
import { appCacheKey } from '../../../class/enum'
import Cache from '../../../class/cache.class'
import AuiSlide from '../../../plugin/aui/slide.js'

export default class SIndex extends Student {
  // Offcanvas
  private showMenu = false
  private main: any
  private menu: any
  // Auislide
  private slide: any
  private tabBarItems: any[]

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
  public closeMenu (this: SIndex, closeMask = true) {
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

    let tabBarHtml = []
    let slideNodeItems = []
    tabBarItems.forEach((tabBarItem, index) => {
      tabBarHtml.push(`<div class="aui-tab-item ${tabBarItem.activeClass}" data-index="${index}">${tabBarItem.title}</div>`)

      let slideNodeItem = `<div class="aui-slide-node aui-slide-node-middle aui-slide-node-center">
      <section class="aui-content baobao_${index}"></section>
      <section class="aui-content aui-grid aui-margin-b-15 jiazhang parent_${index}"></section>
      <section class="aui-content school_${index}"></section>
    </div>`
      slideNodeItems.push(slideNodeItem)
    })
    $('#tabBar').html(tabBarHtml.join(''))
    $('#slideBody').html(slideNodeItems.join(''))

    this.slide = new AuiSlide({
      container: document.getElementById('aui-slide'), height: 260, pageShow: false, loop: false, currentPage: (index) => {
        console.log(index)
        this.switchTab(index)
      }
    })
  }
  /**
   * switchTab
   */
  public switchTab (index: number, switchSlideBody = false) {
    if (switchSlideBody) this.slide.setPaginationActive(index)

    const c = document.querySelector('.aui-tab-item.aui-active')
    if (c) c.classList.remove('aui-active')
    const target = document.querySelector('.aui-tab .aui-tab-item:nth-child(' + (index + 1) + ')')
    target.classList.add('aui-active')

    this.setStorage('current_sbaobao_studentid', this.tabBarItems[index].studentid)
    $.fire($.plus.webview.getWebviewById('sbaobao_school'), 'getClasses')
  }
}
