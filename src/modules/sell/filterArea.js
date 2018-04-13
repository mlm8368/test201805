import 'common/sass/mui.init.scss';
import './filterArea/style.scss';

import 'common/js/mui.init';
// import './list/plusready';
import './filterArea/muiready';

import {updateSellListParams} from './js/global';

let $ = window.mui;

$('#list').on('tap', 'a', function(e) {
  let id = Number(this.dataset.id);
  document.querySelector('input[value="' + id + '"]').checked = 'checked';
  updateSellListParams({areaid: id, title_shop_area: this.innerText});
  window.parent.window.resetMescrollPage('shop_area');
});
