import 'common/sass/mui.init.scss';
import './filterCategTop/style.scss';

import 'common/js/mui.init';
// import './list/plusready';
import './filterCategTop/muiready';

import {updateProductListParams} from './js/global';

let $ = window.mui;

$('#list').on('tap', 'a', function(e) {
  let id = Number(this.dataset.id);
  document.querySelector('input[value="' + id + '"]').checked = 'checked';
  updateProductListParams({categtopid: id, bigcatid: 0, catid: 0, title_shop_categtop: this.innerText, title_shop_categ: '全部' + this.innerText});
  // do categmin function
  window.parent.window.document.getElementById('filterCategMax').contentWindow.loadCategList();
  window.parent.window.document.getElementById('filterCategMin').contentWindow.loadCategList();

  window.parent.window.resetMescrollPage('shop_categtop');
});
