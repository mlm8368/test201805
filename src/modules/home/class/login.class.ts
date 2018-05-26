import { $, viewEXT } from '../../../common/js/global.js'
import * as config from '../login/config'
import Abstract from '../../../class/abstract.class'

export default class Login extends Abstract {
  public goPortal (type: string): void {
    $.plus.nativeUI.showWaiting() // 等宝宝等页加载完后关闭
    // student
    let subNViews = [{
      'id': 'tabBarStudent',
      'styles': { bottom: '0px', left: '0px', height: config.common.footerbarHeight + 'px', width: '100%', backgroundColor: '#FFFFFF' },
      'tags': config.barTagsStudent
    }]
    let clickButtonOffcanvas = (): void => {
      // $.log('clickButtonOffcanvas')
      $.fire(wvSbaobaoIndex, 'openOffcanvas')
    }
    let titleNView = { backgroundColor: '#D74B28', titleText: '上学啦', titleColor: '#CCCCCC', buttons: [
      { text: '\ue563', fontSize: '20px', fontSrc: '_www/fonts/mui.ttf', float: 'left', onclick: clickButtonOffcanvas }
    ] }
    let wvSbaobaoIndex = $.openWindow({
      id: 'sbaobao_index',
      url: '../sbaobao/index' + viewEXT,
      styles: { top: '0px', backButtonAutoControl: 'none', subNViews: subNViews, titleNView: titleNView }
    })
  }
}
