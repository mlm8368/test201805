import { $, viewEXT } from '../../../common/js/global.js'
import Student from '../../../class/student.class'
import * as config from '../index/config'

export default class SIndex extends Student {
  // Offcanvas
  private showMenu = false
  private main: any
  private menu: any

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
}
