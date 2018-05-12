import { viewEXT } from '../../../common/js/global.js'
export let footbarProp = {
  tabBarId: 'tabBarStudent',
  firstWebviewId: 'sbaobao_index',
  activeColor: '#007aff',
  normalColor: '#000',
  subpages: [
    { id: 'sxiaoyuan_index', url: '../sxiaoyuan/index' + viewEXT },
    { id: 'sbanji_index', url: '../sbanji/index' + viewEXT },
    { id: 'sbamaquan_index', url: '../sbamaquan/index' + viewEXT },
    { id: 'smore_index', url: '../smore/index' + viewEXT }
  ]
};