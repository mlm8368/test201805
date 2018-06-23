import { $, viewEXT, appName } from '../../../common/js/global.js'
import * as config from '../login/config'
import Abstract from '../../../class/abstract.class'

export default class Login extends Abstract {
  /**
   * doLogin
   */
  public doLogin (): boolean {
    let uData = {}
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

    $.post(config.siteHost.siteurl + 'index.php?moduleid=2&action=login', uData, (ret) => {
      // $.log(ret)
      if (ret.status === 1) {
        this.setLoginData(ret.userInfo)
        // fire
        // alert
        this.alert('登录成功', () => {
          this.goPortal()
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
        // $.log(ret)
        if (ret.status === 1) {
          this.setLoginData(ret.userInfo, false)
          this.goPortal()
          successFun()
        } else {
          this.logout()
          errorFun()
        }
      }, 'json')
    }
  }

  public goPortal () {
    switch (appName) {
      case 'student':
        this.goPortalStudent()
        break
      case 'teacher':
        this.goPortalTeacher()
        break
      case 'allapp':
        if (this.getStorage('userInfo').student) this.goPortalStudent()
        else this.goPortalTeacher()
        break
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

  /**
   * goPortalTeacher
   */
  public goPortalTeacher (): void {
    $.plus.nativeUI.showWaiting() // 等宝宝等页加载完后关闭
    // teacher
    let subNViews = [{
      'id': 'tabBarStudent',
      'styles': { bottom: '0px', left: '0px', height: config.common.footerbarHeight + 'px', width: '100%', backgroundColor: '#FFFFFF' },
      'tags': config.barTagsTeacher
    }]
    let clickButtonOffcanvas = (): void => {
      // $.log('clickButtonOffcanvas')
      $.fire(wvTbanjiIndex, 'openOffcanvas')
    }
    let titleNView = { backgroundColor: '#D74B28', titleText: '幼教云', titleColor: '#CCCCCC', buttons: [
      { text: '\ue563', fontSize: '20px', fontSrc: '_www/fonts/mui.ttf', float: 'left', onclick: clickButtonOffcanvas }
    ] }
    let wvTbanjiIndex = $.openWindow({
      id: 'tbanji_index',
      url: '../tbanji/index' + viewEXT,
      styles: { top: '0px', backButtonAutoControl: 'none', subNViews: subNViews, titleNView: titleNView }
    })
  }

  private setLoginData (userInfo, updateAccessToken = true) {
    this.setStorage('userid', userInfo.userid)
    this.setStorage('username', userInfo.username)
    if (updateAccessToken) this.setStorage('accessToken', userInfo.accessToken)
    // this.setStorage('student', userInfo.student)
    // this.setStorage('classes', userInfo.classes)
    this.setStorage('groupid', userInfo.groupid)
    this.setStorage('area', userInfo.area)
    this.setStorage('areaid', userInfo.areaid)
    this.setStorage('userInfo', userInfo)
  }

}
