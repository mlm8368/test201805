import { $, viewEXT } from '../../../common/js/global.js'
import Student from '../../../class/student.class'

export default class SBaobao extends Student {
  private showMenu = false
  private main: any
  private menu: any
  private mask: any

  constructor () {
    super()
    this.main = $.currentWebview
    this.menu = $.preload({ id: 'sbaobao_school', url: './school' + viewEXT, styles: { left: '30%', width: '70%', zindex: 9997 } })
    this.mask = $.createMask(() => { this.closeMenu(false) })
    $.options.beforeback = (): boolean => {
      if (this.showMenu) {
        this.closeMenu()
        return false
      } else {
        this.menu.close('none')
        return true
      }
    }
    window.addEventListener('dragright', function (e: any) { e.detail.gesture.preventDefault() })
    window.addEventListener('dragleft', function (e: any) { e.detail.gesture.preventDefault() })
    window.addEventListener('swipeleft', () => { this.openMenu() })
    window.addEventListener('swiperight', () => { this.closeMenu() })
    window.addEventListener('closeOffcanvas', () => { this.closeMenu() })
  }

  /**
   * openMenu
   */
  public openMenu () {
    if (!this.showMenu) {
      this.menu.show('none', 0, () => {
        this.main.setStyle({ left: '-70%', transition: { duration: 150 } })
      })
      this.mask.show()
      this.showMenu = true
    }
  }

  /**
   * name
   */
  public closeMenu (this: SBaobao, closeMask = true) {
    if (this.showMenu) {
      this.main.setStyle({
        left: '0',
        transition: {
          duration: 150
        }
      })
      setTimeout(() => { this.menu.hide() }, 300)
      this.showMenu = false
    }
    if (closeMask) this.mask.close()
  }
}
