import { viewEXT } from '../../../common/js/global.js';
const subpageStyleXiaoyuan = { top: '0px', statusbar: { background: '#FF0000' }, titleNView: { backgroundColor: '#D74B28', titleText: '校园', titleColor: '#CCCCCC' } };
const subpageStyleBanji = { top: '0px', statusbar: { background: '#FF0000' }, titleNView: { backgroundColor: '#D74B28', titleText: '班级', titleColor: '#CCCCCC' } };
const subpageStyleBamaquan = { top: '0px', statusbar: { background: '#FF0000' }, titleNView: { backgroundColor: '#D74B28', titleText: '爸妈圈', titleColor: '#CCCCCC' } };
const subpageStyleMore = { top: '0px', statusbar: { background: '#FF0000' }, titleNView: { backgroundColor: '#D74B28', titleText: '更多', titleColor: '#CCCCCC' } };
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
};