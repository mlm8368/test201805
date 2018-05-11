// css
import '../../common/sass/mui.init.scss'
import './index/style.scss'
// mui js
import '../../common/js/mui.init.js'
import '../../mui/js/mui.back.5+.js'
// self
import './index/init.ts'
import util from '../../common/js/util.js'
import { $, plus, viewEXT, setImmersedHeight } from '../../common/js/global.js'
// ready
$.ready(function () {
  setImmersedHeight($.byId('header'))
  if (viewEXT === '.htm') return
  $.noop()
})
// plusReady
$.plusReady(function () {
  util.options.subpages = ['../video/list' + viewEXT, '../news/main' + viewEXT, '../club/list' + viewEXT, '../my/index' + viewEXT]
  util.initSubpage({})

  let nview = plus.nativeObj.View.getViewById('tabBar')
  nview.addEventListener('click', function (e) {
    $.clickTabBar(e)
  })
})
