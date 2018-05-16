// css
import '../../common/sass/mui.init.scss'
import './login/style.scss'
// mui js
import '../../common/js/mui.init.js'
import '../../mui/js/mui.back.5+.js'
// self
import { $, viewEXT } from '../../common/js/global.js'
import Login from './login/login.class'

let login = new Login()
// ready
$.ready(function () {
  if (viewEXT === '.htm') return
  $.noop()
})
// plusReady
$.plusReady(function () {
  $.noop()
})
// tap
$.byId('doLogin').addEventListener('tap', function () {
  login.goPortal('student')
})
