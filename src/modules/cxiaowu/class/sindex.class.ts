import { $, viewEXT } from '../../../common/js/global.js'
import Student from '../../../class/student.class'
import { ImageSliderImageStyles } from '../../../class/interface'
import * as config from '../index/config'

enum showMenuStatus {
  none,
  leftClasses,
  rightPublish
}

export default class SIndex extends Student {
  // Offcanvas
  private showMenu = showMenuStatus.none
  private main: any
  private menu = { leftClasses: null, rightPublish: null }

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
    // $.options.beforeback = (): boolean => {
    //   if (this.showMenu) {
    //     this.closeMenu()
    //     return false
    //   } else {
    //     this.menu.close('none')
    //     return true
    //   }
    // }
    this.menu.leftClasses = $.plus.webview.create('./classes' + viewEXT, 'cxiaoyuan_classes', { left: '0%', bottom: '0px', width: '70%', height: '100%', backButtonAutoControl: 'none', bounce: 'none' })
    this.menu.rightPublish = $.plus.webview.create('./publish' + viewEXT, 'cxiaoyuan_publish', { left: '30%', bottom: '0px', width: '70%', height: '100%', backButtonAutoControl: 'none', bounce: 'none' })
    this.main.addEventListener('maskClick', () => { this.closeMenu() }, false)
    window.addEventListener('dragright', function (e: any) { e.detail.gesture.preventDefault() })
    window.addEventListener('dragleft', function (e: any) { e.detail.gesture.preventDefault() })
    // 主界面向右滑动
    window.addEventListener('swiperight', () => {
      if (showMenuStatus[this.showMenu] === 'none') this.openMenu('leftClasses')
      else if (showMenuStatus[this.showMenu] === 'rightPublish') this.closeMenu()
    })
    // 主界面向左滑动
    window.addEventListener('swipeleft', () => {
      if (showMenuStatus[this.showMenu] === 'none') this.openMenu('rightPublish')
      else if (showMenuStatus[this.showMenu] === 'leftClasses') this.closeMenu()
    })
    window.addEventListener('closeOffcanvas', () => { this.closeMenu() })
  }
  /**
   * openMenu
   * @param type leftClasses/rightPublish
   */
  public openMenu (type: string) {
    if (this.showMenu === showMenuStatus.none) {
      this.main.setStyle({ mask: 'rgba(0,0,0,0.5)' })
      if (type === 'leftClasses') {
        this.menu.leftClasses.show('none', 0, () => {
          this.main.setStyle({ left: '70%', transition: { duration: 150 } })
        })
        this.showMenu = showMenuStatus.leftClasses
      } else if (type === 'rightPublish') {
        this.menu.rightPublish.show('none', 0, () => {
          this.main.setStyle({ left: '-70%', transition: { duration: 150 } })
        })
        this.showMenu = showMenuStatus.rightPublish
      }
    }
  }

  /**
   * closeMenu
   */
  public closeMenu (this: SIndex) {
    if (this.showMenu !== showMenuStatus.none) {
      this.main.setStyle({ mask: 'none' })

      this.main.setStyle({ left: '0%', transition: { duration: 150 } })
      if (showMenuStatus[this.showMenu] === 'leftClasses') {
        setTimeout(() => { this.menu.leftClasses.hide() }, 300)
      } else if (showMenuStatus[this.showMenu] === 'rightPublish') {
        setTimeout(() => { this.menu.rightPublish.hide() }, 300)
      }
      this.showMenu = showMenuStatus.none
    }
  }

  /**
   * setSlideImages
   */
  public setSlideImages (images: ImageSliderImageStyles[]) {
    const slideNView = $.plus.nativeObj.View.getViewById('schoolSlider')
    slideNView.setImages(images)
  }
}
