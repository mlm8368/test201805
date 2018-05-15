import { viewEXT } from '../../../common/js/global.js';
const subpageStyleXiaoyuan = { top: 0, statusbar: { background: '#FFff00' }, titleNView: { backgroundColor: '#FFff00', titleText: '校园', titleColor: '#CCCCCC' } };
const subpageStyleBanji = { top: 0, statusbar: { background: '#540000' }, titleNView: { backgroundColor: '#540000', titleText: '班级', titleColor: '#CCCCCC' } };
const subpageStyleBamaquan = { top: 0, statusbar: { background: '#668800' }, titleNView: { backgroundColor: '#668800', titleText: '爸妈圈', titleColor: '#CCCCCC' } };
const subpageStyleMore = { top: 0, statusbar: { background: '#aacc00' }, titleNView: { backgroundColor: '#aacc00', titleText: '更多', titleColor: '#CCCCCC' } };
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