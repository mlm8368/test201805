// css
import '../../common/sass/mui.init.scss'
import './login/style.scss'
// mui js
import '../../common/js/mui.init.js'
// self
import { $, viewEXT } from '../../common/js/global.js'
import { appStorageKey } from '../../class/enum'
import Login from './class/login.class'
import * as config from './login/config'
import Cache from '../../class/cache.class'

let login = new Login()
// ready
$.ready(() => {
  if (viewEXT === '.htm') return
  $.noop()
})
// plusReady
$.plusReady(() => {
  const cache = new Cache()
  cache.clearAll() // debug

  $.get(config.siteHost.siteurl + 'index.php?XDEBUG_SESSION_START=ECLIPSE_DBGP&KEY=15197212645396', null, (ret) => {
    $.log('XDEBUG...')
  }, 'json')
  $.noop()
  // 已登录 直接跳转
  if (login.isLogin()) {
    login.toast(login.getStorage(appStorageKey.username) + ',欢迎你回来', { verticalAlign: 'top' })
    login.goPortal()
    login.checkLoginUserInfo(() => {
      $.fire($.plus.webview.getWebviewById('sbaobao_index'), 'refreshBaobao')
    }, () => {
      login.toast('信息已更新，请重新登录')
    })
  }
})
// tap
$.byId('doLogin').addEventListener('tap', () => {
  login.doLogin()
})
$.byId('goReg').addEventListener('tap', () => {
  $.openWindow({
    id: 'home_reg',
    url: '../home/reg' + viewEXT,
    styles: { top: '0px', titleNView: { backgroundColor: '#D74B28', titleText: '用户注册', titleColor: '#CCCCCC', autoBackButton: true } }
  })
})
