import { $, viewEXT } from '../../../common/js/global.js'
import Teacher from '../../../class/teacher.class'
import Vue from 'vue'
import IndexVue from './index.vue'

export default class Index extends Teacher {
  // Offcanvas
  private showMenu = false
  private main: any
  private menu: any
  private vm: Vue

  constructor () {
    super()
    $.plusReady(() => {
      this.main = $.plus.webview.getWebviewById('cxiaowu_index')
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
    this.menu = $.plus.webview.create('./classes' + viewEXT, 'cjiaowu_classes', { left: '30%', bottom: '0px', width: '70%', height: '100%', backButtonAutoControl: 'none', bounce: 'none' })
    this.main.addEventListener('maskClick', () => {
      this.closeMenu()
    }, false)
    window.addEventListener('dragright', function (e: any) { e.detail.gesture.preventDefault() })
    window.addEventListener('dragleft', function (e: any) { e.detail.gesture.preventDefault() })
    // 主界面向左滑动
    window.addEventListener('swipeleft', () => { this.openMenu() })
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
      this.main.setStyle({ mask: 'rgba(0,0,0,0.5)' })
      this.showMenu = true
    }
  }

  /**
   * closeMenu
   */
  public closeMenu (this: Index) {
    this.main.setStyle({ mask: 'none' })
    if (this.showMenu) {
      this.main.setStyle({ left: '0%', transition: { duration: 150 } })
      setTimeout(() => { this.menu.hide() }, 300)
      this.showMenu = false
    }
  }

  /**
   * openIndexVue
   */
  public openIndexVue () {
    this.vm = new Vue({
      el: '#vue-app',
      render: h => h(IndexVue, {})
    })
  }
}
