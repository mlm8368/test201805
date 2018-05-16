// css
import '../../common/sass/mui.init.scss'
import './index/style.scss'
// mui js
import '../../common/js/mui.init.js'
import '../../mui/js/mui.back.5+.js'
// self
import * as config from './index/config'
import { $, viewEXT } from '../../common/js/global.js'
import SFooterbar from './class/sfooterbar.class'
// ready
$.ready(function () {
  if (viewEXT === '.htm') return
  $.noop()
})
// plusReady
$.plusReady(function () {
  const sFooterbar = new SFooterbar(config.footbarProp)

  const tabBarNView = $.plus.nativeObj.View.getViewById('tabBarStudent')
  tabBarNView.addEventListener('click', function (e) {
    if (sFooterbar.getStatus() === 'doing') return
    let targetPage: string = null
    let activePage: string = sFooterbar.getActivePage()
    let currIndex: number = sFooterbar.getCurrIndex(window.innerWidth, e.clientX)

    if (currIndex > 0) targetPage = config.footbarProp.subpages[currIndex - 1].id
    else targetPage = config.footbarProp.firstWebviewId

    if (targetPage === activePage) return

    sFooterbar.toggleNview(currIndex)
    sFooterbar.changeSubpage(targetPage)
  })
})
