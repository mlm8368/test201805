import 'common/sass/mui.init.scss';
import './filterSort/style.scss';

import 'common/js/mui.init';
// import './filterSort/plusready';
import './filterSort/muiready';

import {updateProductListParams} from './js/global';

let $ = window.mui;

$('#list').on('tap', 'a', function(e) {
  let id = this.dataset.id;
  document.querySelector('input[value="' + id + '"]').checked = 'checked';
  updateProductListParams({sort: id, title_shop_sort: this.innerText + '信息'});
  window.parent.window.resetMescrollPage('shop_sort');
});