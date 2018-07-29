import { viewEXT } from '../../../common/js/global.js'

export * from '../../../class/config'

const subpageStyleBanji = { top: '0px', backButtonAutoControl: 'none', titleNView: { backgroundColor: '#880033', titleText: '启蒙一班', titleColor: '#CCCCCC' } }
const subpageStyleDaiban = { top: '0px', backButtonAutoControl: 'none', titleNView: { backgroundColor: '#540000', titleText: '待办', titleColor: '#CCCCCC' } }
const subpageStyleJiaoshiquan = { top: '0px', backButtonAutoControl: 'none', titleNView: { backgroundColor: '#668800', titleText: '教师圈', titleColor: '#CCCCCC' } }
const subpageStyleMore = { top: '0px', backButtonAutoControl: 'none', titleNView: { backgroundColor: '#aacc00', titleText: '更多', titleColor: '#CCCCCC' } }
export const footbarProp = {
  tabBarId: 'tabBarTeacher',
  firstWebviewId: 'txiaoyuan_index',
  activeColor: '#007aff',
  normalColor: '#000',
  subpages: [
    { id: 'tbanji_index', url: '../tbanji/index' + viewEXT, subpageStyle: subpageStyleBanji },
    { id: 'tdaiban_index', url: '../tdaiban/index' + viewEXT, subpageStyle: subpageStyleDaiban },
    { id: 'tjiaoshiquan_index', url: '../tjiaoshiquan/index' + viewEXT, subpageStyle: subpageStyleJiaoshiquan },
    { id: 'tmore_index', url: '../tmore/index' + viewEXT, subpageStyle: subpageStyleMore }
  ]
}
