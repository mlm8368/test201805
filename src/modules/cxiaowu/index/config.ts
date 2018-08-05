import { $, viewEXT } from '../../../common/js/global.js'

export * from '../../../class/config'

const clickButtonClasses = (): void => {
  $.fire($.plus.webview.getWebviewById('cjiaowu_index'), 'openRightClassesOffcanvas')
}
const subpageStyleJiaowu = { top: '0px', backButtonAutoControl: 'none', titleNView: { backgroundColor: '#880033', titleText: '教务', titleColor: '#CCCCCC', buttons: [
  { text: '班级', fontSize: '14px', float: 'right', onclick: clickButtonClasses }
] } }
const subpageStyleTongji = { top: '0px', backButtonAutoControl: 'none', titleNView: { backgroundColor: '#880033', titleText: '统计', titleColor: '#CCCCCC' } }
const subpageStyleDaiding = { top: '0px', backButtonAutoControl: 'none', titleNView: { backgroundColor: '#540000', titleText: '待定', titleColor: '#CCCCCC' } }
const subpageStyleMore = { top: '0px', backButtonAutoControl: 'none', titleNView: { backgroundColor: '#aacc00', titleText: '更多', titleColor: '#CCCCCC' } }
export const footbarProp = {
  tabBarId: 'tabBarCompany',
  firstWebviewId: 'cxiaowu_index',
  activeColor: '#007aff',
  normalColor: '#000',
  subpages: [
    { id: 'cjiaowu_index', url: '../cjiaowu/index' + viewEXT, subpageStyle: subpageStyleJiaowu },
    { id: 'ctongji_index', url: '../ctongji/index' + viewEXT, subpageStyle: subpageStyleTongji },
    { id: 'c2_index', url: '../ctongji/index' + viewEXT, subpageStyle: subpageStyleDaiding },
    { id: 'cmore_index', url: '../cmore/index' + viewEXT, subpageStyle: subpageStyleMore }
  ]
}
