import { $, viewEXT } from '../../../common/js/global.js'
import Student from '../../../class/student.class'
import WebviewGroup from '../../../plugin/aui/webviewGroup.js'
import { SbbTabBarItem } from '../../../class/interface'
import * as config from '../index/config'

export default class SIndex extends Student {
  private main: any
  private screenHeight: number
  // WebviewGroup
  private group: any
  private isTopShow: boolean

  constructor () {
    super()
    $.plusReady(() => {
      this.main = $.currentWebview
      this.screenHeight = $.plus.screen.resolutionHeight
      this.isTopShow = true
    })
  }

  /**
   * setWebviewGroupItems
   */
  public setTabBar (tabBarItems: SbbTabBarItem[]) {
    const tabHeightAll = $.byId('tabBar').offsetHeight + $.immersed + config.common.titleNViewHeight
    let WebviewGroupItems = []
    let tabBarHtml = []
    $.byId('tabbarcontent').style.height = (this.screenHeight - tabHeightAll - config.common.footerbarHeight) + 'px'
    let tabbarcontentOffset = $('#tabbarcontent').offset()
    // $.log(tabbarcontentOffset)
    for (const tabBarItem of tabBarItems) {
      tabBarHtml.push(`<div class="aui-tab-item mui-control-item ${tabBarItem.activeClass}" data-vwid="${tabBarItem.id}">${tabBarItem.title}</div>`)

      let WebviewGroupItem = { id: tabBarItem.id, url: tabBarItem.url,
        styles: { top: (tabbarcontentOffset.t) + 'px', height: (this.screenHeight - tabHeightAll - config.common.footerbarHeight) + 'px', render: 'always', backButtonAutoControl: 'none', bounce: 'none', position: 'static' }
      }
      if (tabBarItem.extras) WebviewGroupItem['extras'] = tabBarItem.extras
      WebviewGroupItems.push(WebviewGroupItem)
    }

    $('#tabBar').html(tabBarHtml.join(''))

    this.group = new WebviewGroup(this.main.id, {
      top: (tabbarcontentOffset.t) + 'px', // 切换遮罩view
      height: (this.screenHeight - tabHeightAll - config.common.footerbarHeight) + 'px', // 切换遮罩view
      items: WebviewGroupItems,
      onChange: function (obj) {
        const c = document.querySelector('.mui-control-item.mui-active')
        if (c) c.classList.remove('mui-active')

        const target = document.querySelector('.mui-scroll .mui-control-item:nth-child(' + (obj.index + 1) + ')')
        target.classList.add('mui-active')
        if (target.scrollIntoView) target.scrollIntoView()
      }
    })
    
    $.doScroll = (childScrollTop: number) => {
			if (childScrollTop === 0) {
				if (!this.isTopShow) {
					window.scrollTo(0, 0)
					this.isTopShow = true
				}
			} else {
				if(this.isTopShow) {
					window.scrollTo(tabbarcontentOffset.t, 0)
					this.isTopShow = false
				}
			}
		}
  }
  /**
   * switchTab
   */
  public switchTab (vwid: string) {
    this.group.switchTab(vwid)
  }
}
