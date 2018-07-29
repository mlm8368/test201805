import { $, viewEXT, appName } from '../../../common/js/global.js'
import * as config from '../login/config'
import { appStorageKey } from '../../../class/enum'
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
      $.log(ret)
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
    $.post(config.siteHost.siteurl + 'index.php?moduleid=2&action=login&op=checkloginuserinfo', null, (ret) => {
      $.log(ret)
      if (ret.status === 1) {
        this.setLoginData(ret.userInfo, false)
        successFun()
      } else {
        this.logout()
        errorFun()
      }
    }, 'json')
  }

  public goPortal () {
    switch (appName) {
      case 'student':
        if (this.getStorage(appStorageKey.groupid) === 5) this.goPortalStudent()
        else this.alert('你的账户存在问题，请联系管理员sddd@123.com')
        break
      case 'teacher':
        if (this.getStorage(appStorageKey.groupid) === 6) this.goPortalCompany()
        else if (this.getStorage(appStorageKey.groupid) === 5) this.goPortalTeacher()
        else this.alert('你的账户存在问题，请联系管理员sddd@123.com')
        break
      case 'allapp':
        if (this.getStorage(appStorageKey.groupid) === 6) this.goPortalCompany()
        else if (this.getStorage(appStorageKey.userInfo).student) this.goPortalStudent()
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
      uData['areaid'] = this.getStorage(appStorageKey.areaid)
      if (!uData['areaid']) uData['areaid'] = 0

      this.setStorage(appStorageKey.accessToken, '')
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
    const subNViews = [{
      'id': 'tabBarStudent',
      'styles': { bottom: '0px', left: '0px', height: config.common.footerbarHeight + 'px', width: '100%', backgroundColor: '#FFFFFF' },
      'tags': config.barTagsStudent
    }]
    const clickButtonOffcanvas = (): void => {
      // $.log('clickButtonOffcanvas')
      $.fire(wvSbaobaoIndex, 'openOffcanvas')
    }
    const clickButtonRefresh = (): void => {
      $.fire(wvSbaobaoIndex, 'refreshBaobao', { op: 'rmcache' })
    }
    const titleNView = { backgroundColor: '#D74B28', titleText: '宝宝上学啦', titleColor: '#CCCCCC', buttons: [
      { text: '\ue563', fontSize: '20px', fontSrc: '_www/fonts/mui.ttf', float: 'left', onclick: clickButtonOffcanvas },
      { text: '刷新', fontSize: '14px', float: 'right', onclick: clickButtonRefresh }
    ] }
    const wvSbaobaoIndex = $.openWindow({
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
    const subNViews = [{
      'id': 'tabBarTeacher',
      'styles': { bottom: '0px', left: '0px', height: config.common.footerbarHeight + 'px', width: '100%', backgroundColor: '#FFFFFF' },
      'tags': config.barTagsTeacher
    }, {
      id: 'schoolSlider', type: 'ImageSlider',
      styles: { left: '0px', right: '0px', top: '0px', height: '200px', position: 'static', autoplay: true, loop: true, images: [] }
    }
    ]
    const clickButtonOffcanvas = (): void => {
      // $.log('clickButtonOffcanvas')
      $.fire(wvTxiaoyuanIndex, 'openOffcanvas')
    }
    const titleNView = { backgroundColor: '#D74B28', titleText: '幼教云', titleColor: '#CCCCCC', buttons: [
      { text: '\ue563', fontSize: '20px', fontSrc: '_www/fonts/mui.ttf', float: 'left', onclick: clickButtonOffcanvas }
    ] }
    const wvTxiaoyuanIndex = $.openWindow({
      id: 'txiaoyuan_index',
      url: '../txiaoyuan/index' + viewEXT,
      styles: { top: '0px', backButtonAutoControl: 'none', subNViews: subNViews, titleNView: titleNView }
    })
  }

  /**
   * goPortalCompany
   */
  public goPortalCompany (): void {
    $.plus.nativeUI.showWaiting() // 等宝宝等页加载完后关闭
    // company
    const subNViews = [{
      'id': 'tabBarCompany',
      'styles': { bottom: '0px', left: '0px', height: config.common.footerbarHeight + 'px', width: '100%', backgroundColor: '#FFFFFF' },
      'tags': config.barTagsCompany
    }]
    const clickButtonClassesOffcanvas = (): void => {
      // $.log('clickButtonOffcanvas')
      $.fire(wvCxiaowuIndex, 'openOffcanvas')
    }
    const clickButtonPublishOffcanvas = (): void => {
      // $.log('clickButtonOffcanvas')
      $.fire(wvCxiaowuIndex, 'openOffcanvas')
    }
    const clickButtonBackHome = (): void => {
      $.noop()
    }
    const titleNView = { backgroundColor: '#D74B28', titleText: '校务管理', titleColor: '#CCCCCC', buttons: [
      { text: '班级', fontSize: '14px', float: 'left', onclick: clickButtonClassesOffcanvas },
      { text: '发布', fontSize: '14px', float: 'right', onclick: clickButtonPublishOffcanvas },
      { text: '\ue500', fontSize: '20px', fontSrc: '_www/fonts/mui.ttf', float: 'right', onclick: clickButtonBackHome }
    ] }
    const wvCxiaowuIndex = $.openWindow({
      id: 'cxiaowu_index',
      url: '../cxiaowu/index' + viewEXT,
      styles: { top: '0px', backButtonAutoControl: 'none', subNViews: subNViews, titleNView: titleNView }
    })
  }

  private setLoginData (userInfo, updateAccessToken = true) {
    this.setStorage(appStorageKey.userid, userInfo.userid)
    this.setStorage(appStorageKey.username, userInfo.username)
    if (updateAccessToken) this.setStorage(appStorageKey.accessToken, userInfo.accessToken)
    this.setStorage(appStorageKey.groupid, userInfo.groupid)
    this.setStorage(appStorageKey.area, userInfo.area)
    this.setStorage(appStorageKey.areaid, userInfo.areaid)
    this.setStorage(appStorageKey.userInfo, userInfo)
  }

}
