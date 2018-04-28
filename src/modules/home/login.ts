// css
import '../../common/sass/mui.init.scss'
import './login/style.scss'
// mui js
import '../../common/js/mui.init.js'
import '../../mui/js/mui.back.5+.js'
// self
import './login/init.ts'
import { $, viewEXT, setImmersedHeight } from '../../common/js/global.js'
// ready
$.ready(function () {
  $.immersed = setImmersedHeight($.byId('header'))
  if (viewEXT === '.htm') return
  $.noop()
})
// plusReady
$.plusReady(function () {
  $.noop()
})
// tap
$.byId('doLogin').addEventListener('tap', function () {
  $.goPortal('student')
})
