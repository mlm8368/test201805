import { $, viewEXT } from '../../../common/js/global.js'
import * as config from '../login/config'
import Abstract from '../../../class/abstract.class'

export default class Login extends Abstract {
  public goPortal (type: string): void {
    // student
    let subNViews = [{
      'id': 'tabBarStudent',
      'styles': { bottom: '0px', left: '0px', height: '50px', width: '100%', backgroundColor: '#FFFFFF' },
      'tags': config.barTagsStudent
    }]
    let clickButtonOffcanvas = (): void => {
      $.log('clickButtonOffcanvas')
    }
    let titleNView = { backgroundColor: '#D74B28', titleText: '宝宝', titleColor: '#CCCCCC', buttons: [
      { text: '\ue563', fontSize: '20px', fontSrc: '_www/fonts/mui.ttf', float: 'left', onclick: clickButtonOffcanvas }
    ] }
    $.openWindow({
      id: 'sbaobao_index',
      url: '../sbaobao/index' + viewEXT,
      styles: { top: '0px', backButtonAutoControl: 'none', subNViews: subNViews, titleNView: titleNView }
    })
  }
}
