import { viewEXT } from '../../../common/js/global.js'

export * from '../../../common/js/config.js'

const subpageStyleXiaoyuan = { top: '0px', backButtonAutoControl: 'none', titleNView: { backgroundColor: '#FFff00', titleText: '阳光美智幼儿园', titleColor: '#CCCCCC' },
  subNViews: [{ id: 'schoolSlider', type: 'ImageSlider', styles: { left: '0px', right: '0px', top: '0px', height: '200px', position: 'static', loop: true, images: [] } }] }
const subpageStyleBanji = { top: '0px', backButtonAutoControl: 'none', titleNView: { backgroundColor: '#540000', titleText: '启蒙一班', titleColor: '#CCCCCC' } }
const subpageStyleBamaquan = { top: '0px', backButtonAutoControl: 'none', titleNView: { backgroundColor: '#668800', titleText: '爸妈圈', titleColor: '#CCCCCC' } }
const subpageStyleMore = { top: '0px', backButtonAutoControl: 'none', titleNView: { backgroundColor: '#aacc00', titleText: '更多', titleColor: '#CCCCCC' } }
export const footbarProp = {
  tabBarId: 'tabBarStudent',
  firstWebviewId: 'sbaobao_index',
  activeColor: '#007aff',
  normalColor: '#000',
  subpages: [
    { id: 'sxiaoyuan_index', url: '../sxiaoyuan/index' + viewEXT, subpageStyle: subpageStyleXiaoyuan },
    { id: 'sbanji_index', url: '../sbanji/index' + viewEXT, subpageStyle: subpageStyleBanji },
    { id: 'sbamaquan_index', url: '../sbamaquan/index' + viewEXT, subpageStyle: subpageStyleBamaquan },
    { id: 'smore_index', url: '../smore/index' + viewEXT, subpageStyle: subpageStyleMore }
  ]
}
