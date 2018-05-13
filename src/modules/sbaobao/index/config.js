import { viewEXT } from '../../../common/js/global.js';
const subpageStyleXiaoyuan = { top: '50px', statusbar: { background: '#FF0000' }, titleNView: { backgroundColor: '#D74B28', titleText: '宝宝', titleColor: '#CCCCCC' }};
const subpageStyleBanji = { top: '50px', statusbar: { background: '#FF0000' }, titleNView: { backgroundColor: '#D74B28', titleText: '班级', titleColor: '#CCCCCC' }};
const subpageStyleBamaquan = { top: '50px', statusbar: { background: '#FF0000' }, titleNView: { backgroundColor: '#D74B28', titleText: '爸妈圈', titleColor: '#CCCCCC' }};
const subpageStyleMore = { top: '50px', statusbar: { background: '#FF0000' }, titleNView: { backgroundColor: '#D74B28', titleText: '更多', titleColor: '#CCCCCC' }};
export let footbarProp = {
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
};