import { $, viewEXT } from '../../../common/js/global.js'
import Student from '../../../class/student.class'
import WebviewGroup from '../../../plugin/aui/webviewGroup.js'
import { SbbTabBarItem } from '../../../class/interface'
import * as config from '../index/config'

export default class SIndex extends Student {
  private main: any
  // WebviewGroup
  private group: any

  constructor () {
    super()
    $.plusReady(() => {
      this.main = $.currentWebview
    })
  }

  /**
   * setWebviewGroupItems
   */
  public setTabBar (tabBarItems: SbbTabBarItem[]) {
    const tabHeightAll = $.byId('tabBar').offsetHeight + $.immersed + config.common.titleNViewHeight + 200
    let WebviewGroupItems = []
    let tabBarHtml = []
    for (const tabBarItem of tabBarItems) {
      tabBarHtml.push(`<div class="aui-tab-item mui-control-item ${tabBarItem.activeClass}" data-vwid="${tabBarItem.id}">${tabBarItem.title}</div>`)

      let WebviewGroupItem = { id: tabBarItem.id, url: tabBarItem.url,
        styles: { top: tabHeightAll + 'px', height: '800px', render: 'always', backButtonAutoControl: 'none', bounce: 'none' }
      }
      if (tabBarItem.extras) WebviewGroupItem['extras'] = tabBarItem.extras
      WebviewGroupItems.push(WebviewGroupItem)
    }

    $('#tabBar').html(tabBarHtml.join(''))

    this.group = new WebviewGroup(this.main.id, {
      top: tabHeightAll, // 切换遮罩view
      height: '100%', // 切换遮罩view
      items: WebviewGroupItems,
      onChange: function (obj) {
        const c = document.querySelector('.mui-control-item.mui-active')
        if (c) c.classList.remove('mui-active')

        const target = document.querySelector('.mui-scroll .mui-control-item:nth-child(' + (obj.index + 1) + ')')
        target.classList.add('mui-active')
        if (target.scrollIntoView) target.scrollIntoView()
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
