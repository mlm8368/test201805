import { $, viewEXT } from '../../../common/js/global.js'
import Teacher from '../../../class/teacher.class'
import Vue from 'vue'
import IndexVue from './index.vue'
enum showMenuStatus {
  none,
  leftStaff,
  rightClasses
}

export default class Index extends Teacher {
  private main: any
  private vm: Vue
  // Offcanvas
  private showMenu = showMenuStatus.none
  private menu = { leftStaff: null, rightClasses: null }

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
    // $.options.beforeback = (): boolean => {
    //   if (this.showMenu) {
    //     this.closeMenu()
    //     return false
    //   } else {
    //     this.menu.close('none')
    //     return true
    //   }
    // }
    this.menu.leftStaff = $.plus.webview.create('./staff' + viewEXT, 'cxiaoyuan_staff', { left: '0%', bottom: '0px', width: '70%', height: '100%', backButtonAutoControl: 'none', bounce: 'none' })
    this.menu.rightClasses = $.plus.webview.create('./classes' + viewEXT, 'cjiaowu_classes', { left: '30%', bottom: '0px', width: '70%', height: '100%', backButtonAutoControl: 'none', bounce: 'none' })
    this.main.addEventListener('maskClick', () => { this.closeMenu() }, false)
    window.addEventListener('dragright', function (e: any) { e.detail.gesture.preventDefault() })
    window.addEventListener('dragleft', function (e: any) { e.detail.gesture.preventDefault() })
    // 主界面向右滑动
    window.addEventListener('swiperight', () => {
      if (showMenuStatus[this.showMenu] === 'none') this.openMenu('leftStaff')
      else if (showMenuStatus[this.showMenu] === 'rightClasses') this.closeMenu()
    })
    // 主界面向左滑动
    window.addEventListener('swipeleft', () => {
      if (showMenuStatus[this.showMenu] === 'none') this.openMenu('rightClasses')
      else if (showMenuStatus[this.showMenu] === 'leftStaff') this.closeMenu()
    })
    window.addEventListener('closeOffcanvas', () => { this.closeMenu() })
  }
  /**
   * openMenu
   * @param type leftStaff/rightClasses
   */
  public openMenu (type: string) {
    if (this.showMenu === showMenuStatus.none) {
      this.main.setStyle({ mask: 'rgba(0,0,0,0.5)' })
      if (type === 'leftStaff') {
        this.menu.leftStaff.show('none', 0, () => {
          this.main.setStyle({ left: '70%', transition: { duration: 150 } })
        })
        this.showMenu = showMenuStatus.leftStaff
      } else if (type === 'rightClasses') {
        this.menu.rightClasses.show('none', 0, () => {
          this.main.setStyle({ left: '-70%', transition: { duration: 150 } })
        })
        this.showMenu = showMenuStatus.rightClasses
      }
    }
  }

  /**
   * closeMenu
   */
  public closeMenu () {
    if (this.showMenu !== showMenuStatus.none) {
      this.main.setStyle({ mask: 'none' })

      this.main.setStyle({ left: '0%', transition: { duration: 150 } })
      if (showMenuStatus[this.showMenu] === 'leftStaff') {
        setTimeout(() => { this.menu.leftStaff.hide() }, 300)
      } else if (showMenuStatus[this.showMenu] === 'rightClasses') {
        setTimeout(() => { this.menu.rightClasses.hide() }, 300)
      }
      this.showMenu = showMenuStatus.none
    }
  }
  /**
   * openIndexVue
   */
  public openIndexVue () {
    this.vm = new Vue({
      el: '#vue-app',
      render: (h) => h(IndexVue, null)
    })

    // console.log(this.vm.$children)
    window.addEventListener('updateSelectClasses', (event: any) => {
      this.vm.$children[0].$data.classesId = event.detail.classesId
    })
  }
}
