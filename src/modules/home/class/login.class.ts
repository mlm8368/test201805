import { $, viewEXT } from '../../../common/js/global.js'
import * as config from '../login/config'
import Abstract from '../../../class/abstract.class'

export default class Login extends Abstract {
  /**
   * doLogin
   */
  public doLogin (type: string): boolean {
    if (type === 'student') {
      let mobile = $.byId('mobile').value
      let password = $.byId('password').value
      let uData = {}

      if (/^1[0-9]{10}$/.test(mobile) === false) {
        this.alert('请填写正确手机号')
        return false
      }
      if (password.length < 6) {
        this.alert('请填写6位数以上的密码')
        return false
      }

      uData['submit'] = 1
      uData['mobile'] = mobile
      uData['password'] = password

      this.setStorage('accessToken', '')
      $.post(config.siteHost.siteurl + 'index.php?moduleid=2&action=login', uData, (ret) => {
        $.log(ret)
        if (ret.status === 1) {
          this.setStorage('userId', ret.userInfo.id)
          this.setStorage('groupId', ret.userInfo.groupid)
          this.setStorage('accessToken', ret.userInfo.accessToken)
          this.setStorage('userInfo', ret.userInfo)
          this.setStorage('area', ret.userInfo.area)
          this.setStorage('areaId', ret.userInfo.areaId)
          // fire
          // alert
          this.alert('登录成功', () => {
            this.goPortalStudent()
          })
        } else {
          this.alert(ret.msg)
        }
      }, 'json')
    }
  }
  private goPortalStudent (): void {
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
