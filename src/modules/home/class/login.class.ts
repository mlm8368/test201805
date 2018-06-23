import { $, viewEXT, appName } from '../../../common/js/global.js'
import * as config from '../login/config'
import Abstract from '../../../class/abstract.class'

export default class Login extends Abstract {
  /**
   * doLogin
   */
  public doLogin (): boolean {
    let uData = {}
    if (appName === 'student') {
      let mobile = $.byId('mobile').value
      let password = $.byId('password').value

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
    } else if (appName === 'teacher') {
      uData['submit'] = 1
      uData['username'] = 'mobile'
      uData['password'] = 'password'
    } else {
      return false
    }

    $.post(config.siteHost.siteurl + 'index.php?moduleid=2&action=login', uData, (ret) => {
      if (ret.status === 1) {
        this.setLoginData(ret.userInfo)
        // fire
        // alert
        this.alert('登录成功', () => {
          if (appName === 'student') this.goPortalStudent()
        })
      } else {
        this.alert(ret.msg)
      }
    }, 'json')
  }

  /**
   * checkLoginUserInfo
   */
  public checkLoginUserInfo (successFun: () => void, errorFun: () => void) {
    if (this.isLogin()) {
      $.post(config.siteHost.siteurl + 'index.php?moduleid=2&action=login&op=checkloginuserinfo', null, (ret) => {
        if (ret.status === 1) {
          this.setLoginData(ret.userInfo)
          successFun()
        } else {
          this.logout()
          errorFun()
        }
      }, 'json')
    }
  }

  /**
   * doReg
   */
  public doReg (type: string) {
    if (type === 'student') {
      let mobile = $.byId('mobile').value
      let password = $.byId('password').value
      let password1 = $.byId('password1').value
      let uData = {}

      if (/^1[0-9]{10}$/.test(mobile) === false) {
        this.alert('请填写正确手机号')
        return false
      }
      if (password.length < 6) {
        this.alert('请填写6位数以上的密码')
        return false
      }
      if (password !== password1) {
        this.alert('两次输入密码不一致')
        return false
      }

      uData['submit'] = 1
      uData['mobile'] = mobile
      uData['password'] = password
      uData['cpassword'] = password1
      uData['areaid'] = this.getStorage('areaid')
      if (!uData['areaid']) uData['areaid'] = 0

      this.setStorage('accessToken', '')
      $.post(config.siteHost.siteurl + 'index.php?moduleid=2&action=reg', uData, (ret) => {
        if (ret.status === 1) {
          this.alert('注册成功', () => {
            $.plus.webview.close($.currentWebview)
          })
        } else {
          this.alert(ret.msg)
        }
      }, 'json')
    }
  }

  /**
   * goPortalStudent
   *
   * @memberof Login
   */
  public goPortalStudent (): void {
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

  private setLoginData (userInfo) {
    this.setStorage('userid', userInfo.userid)
    this.setStorage('username', userInfo.username)
    this.setStorage('accessToken', userInfo.accessToken)
    this.setStorage('studentids', userInfo.studentids)
    this.setStorage('classesids', userInfo.classesids)
    this.setStorage('groupid', userInfo.groupid)
    this.setStorage('area', userInfo.area)
    this.setStorage('areaid', userInfo.areaid)
    this.setStorage('userInfo', userInfo)
  }
}
