// css
import '../../common/sass/mui.init.scss'
import './index/style.scss'
// mui js
import '../../common/js/mui.init.js'
import '../../mui/js/mui.back.5+.js'
// self
import './index/init.ts'
import util from '../../common/js/util.js'
import { $, viewEXT, getMuiPlus, setImmersedHeight } from '../../common/js/global.js'

// ready
$.ready(function () {
  setImmersedHeight($.byId('header'))
  if (viewEXT === '.htm') return
  $.noop()
})
// plusReady
$.plusReady(function () {
  $.plus = getMuiPlus()
  util.options.tabBarId = 'tabBarStudent'
  util.options.launchWebviewId = 'sbaobao_index'
  util.options.subpages = ['../sxiaoyuan/index' + viewEXT, '../sbanji/index' + viewEXT, '../sbamaquan/index' + viewEXT, '../smore/index' + viewEXT]
  util.initSubpage({})

  let nview = $.plus.nativeObj.View.getViewById('tabBarStudent')
  nview.addEventListener('click', function (e) {
    $.clickTabBar(e)
  })
})
