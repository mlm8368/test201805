import 'common/sass/mui.init.scss';
import './filterCategMin/style.scss';

import 'common/js/mui.init';
// import './filterCategMin/plusready';
import './filterCategMin/muiready';

import {updateProductListParams} from './js/global';

let $ = window.mui;

$('#list').on('tap', 'a', function(e) {
  let id = Number(this.dataset.id);
  if (id === 0) {
    let params = $.getStorage('productListParams');
    if (params.bigcatid === 0) return;
  }
  document.querySelector('input[value="' + id + '"]').checked = 'checked';
  updateProductListParams({catid: id, title_shop_categ: this.innerText});
  window.parent.window.resetMescrollPage('shop_categ');
});

// do in maxCateg
window.loadCategList = function() {
  $.loadCategList();
};