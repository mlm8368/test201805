// css
import '../../common/sass/mui.init.scss'
import './index/style.scss'
// mui js
import '../../common/js/mui.init.js'
import '../../mui/js/mui.back.5+.js'
// self
import './index/init.ts'
import { footbarProp } from './index/config.js'
// import util from '../../common/js/util.js'
import { $, viewEXT, setImmersedHeight } from '../../common/js/global.js'
import SFooterbar from './index/sfooterbar.class'
// ready
$.ready(function () {
  //setImmersedHeight($.byId('header'))
  if (viewEXT === '.htm') return
  $.noop()
})
// plusReady
$.plusReady(function () {
  const sFooterbar = new SFooterbar(footbarProp)

  const tabBarNView = $.plus.nativeObj.View.getViewById('tabBarStudent')
  tabBarNView.addEventListener('click', function (e) {
    if (sFooterbar.getStatus() === 'doing') return
    let targetPage: string = null
    let activePage: string = sFooterbar.getActivePage()
    let currIndex: number = sFooterbar.getCurrIndex(window.innerWidth, e.clientX)

    if (currIndex > 0) targetPage = footbarProp.subpages[currIndex - 1].id
    else targetPage = footbarProp.firstWebviewId

    if (targetPage === activePage) return

    sFooterbar.toggleNview(currIndex)
    sFooterbar.changeSubpage(targetPage)
  })
})
