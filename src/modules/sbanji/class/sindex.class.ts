import { $, viewEXT } from '../../../common/js/global.js'
import Student from '../../../class/student.class'
import WebviewGroup from '../../../plugin/aui/webviewGroup.js'
import { TabBarItem } from '../../../class/interface'
import * as config from '../index/config'

export default class SIndex extends Student {
  private main: any
  // WebviewGroup
  private group: any
  private scrollTop = 0 // 显示卡片时上面部分完全卷入的高度

  constructor () {
    super()
    $.plusReady(() => {
      this.main = $.currentWebview
    })
  }

}
