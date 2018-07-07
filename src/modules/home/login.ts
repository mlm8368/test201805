// css
import '../../common/sass/mui.init.scss'
import './login/style.scss'
// mui js
import '../../common/js/mui.init.js'
// self
import { $, viewEXT } from '../../common/js/global.js'
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
    $.log(ret)
  }, 'json')
  $.noop()
  // 已登录 直接跳转
  login.checkLoginUserInfo(() => {
    login.toast(login.getStorage('username') + ',欢迎你回来', { verticalAlign: 'top' })
  }, () => {
    login.toast('请重新登录')
  })
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
