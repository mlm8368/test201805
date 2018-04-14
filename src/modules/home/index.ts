import '../../common/sass/mui.init.scss'
import './index/style.scss'

import '../../common/js/mui.init.js'
import '../../mui/js/mui.back.5+.js'
import './index/muiready.js'
import './index/plusready.js'

import { $, viewEXT } from '../../common/js/global.js'
import AuiSlide from '../../plugin/aui/slide.js'

if (viewEXT === '.htm') {
  let _auiSlide = new AuiSlide({
    container: document.getElementById('aui-slide'),
    'height': 180,
    'speed': 500,
    'autoPlay': 3000,
    'loop': true,
    'pageShow': true,
    'pageStyle': 'line',
    'dotPosition': 'center'
  })
  $.noop(_auiSlide)
}
