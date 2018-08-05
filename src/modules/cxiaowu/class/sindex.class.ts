import { $, viewEXT } from '../../../common/js/global.js'
import * as config from '../index/config'
import Teacher from '../../../class/teacher.class'
import { ImageSliderImageStyles } from '../../../class/interface'
import Vue from 'vue'
import Home from './home.vue'

enum showMenuStatus {
  none,
  leftMy,
  rightPublish
}

export default class SIndex extends Teacher {
  private main: any
  private vm: Vue
  private vueData = {}
  // Offcanvas
  private showMenu = showMenuStatus.none
  private menu = { leftMy: null, rightPublish: null }

  constructor () {
    super()
    $.plusReady(() => {
      this.main = $.currentWebview
    })

    this.vm = new Vue({
      el: '#vue-app',
      data: this.vueData,
      components: {
        'home': Home
      }
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
    this.menu.leftMy = $.plus.webview.create('./my' + viewEXT, 'cxiaoyuan_my', { left: '0%', bottom: '0px', width: '70%', height: '100%', backButtonAutoControl: 'none', bounce: 'none' })
    this.menu.rightPublish = $.plus.webview.create('./publish' + viewEXT, 'cxiaoyuan_publish', { left: '30%', bottom: '0px', width: '70%', height: '100%', backButtonAutoControl: 'none', bounce: 'none' })
    this.main.addEventListener('maskClick', () => { this.closeMenu() }, false)
    window.addEventListener('dragright', function (e: any) { e.detail.gesture.preventDefault() })
    window.addEventListener('dragleft', function (e: any) { e.detail.gesture.preventDefault() })
    // 主界面向右滑动
    window.addEventListener('swiperight', () => {
      if (showMenuStatus[this.showMenu] === 'none') this.openMenu('leftMy')
      else if (showMenuStatus[this.showMenu] === 'rightPublish') this.closeMenu()
    })
    // 主界面向左滑动
    window.addEventListener('swipeleft', () => {
      if (showMenuStatus[this.showMenu] === 'none') this.openMenu('rightPublish')
      else if (showMenuStatus[this.showMenu] === 'leftMy') this.closeMenu()
    })
    window.addEventListener('closeOffcanvas', () => { this.closeMenu() })
  }
  /**
   * openMenu
   * @param type leftMy/rightPublish
   */
  public openMenu (type: string) {
    if (this.showMenu === showMenuStatus.none) {
      this.main.setStyle({ mask: 'rgba(0,0,0,0.5)' })
      if (type === 'leftMy') {
        this.menu.leftMy.show('none', 0, () => {
          this.main.setStyle({ left: '70%', transition: { duration: 150 } })
        })
        this.showMenu = showMenuStatus.leftMy
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
      if (showMenuStatus[this.showMenu] === 'leftMy') {
        setTimeout(() => { this.menu.leftMy.hide() }, 300)
      } else if (showMenuStatus[this.showMenu] === 'rightPublish') {
        setTimeout(() => { this.menu.rightPublish.hide() }, 300)
      }
      this.showMenu = showMenuStatus.none
    }
  }
}
