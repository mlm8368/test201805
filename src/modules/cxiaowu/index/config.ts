import { $, viewEXT } from '../../../common/js/global.js'

export * from '../../../class/config'

const subpageStyleTongji = { top: '0px', backButtonAutoControl: 'none', titleNView: { backgroundColor: '#880033', titleText: '统计', titleColor: '#CCCCCC' } }
const subpageStyleDaiding = { top: '0px', backButtonAutoControl: 'none', titleNView: { backgroundColor: '#540000', titleText: '待定', titleColor: '#CCCCCC' } }
export const footbarProp = {
  tabBarId: 'tabBarTeacher',
  firstWebviewId: 'txiaoyuan_index',
  activeColor: '#007aff',
  normalColor: '#000',
  subpages: [
    { id: 'ctongji_index', url: '../ctongji/index' + viewEXT, subpageStyle: subpageStyleTongji },
    { id: 'c1_index', url: '../ctongji/index' + viewEXT, subpageStyle: subpageStyleDaiding },
    { id: 'c2_index', url: '../ctongji/index' + viewEXT, subpageStyle: subpageStyleDaiding },
    { id: 'c3_index', url: '../ctongji/index' + viewEXT, subpageStyle: subpageStyleDaiding }
  ]
}
