import procates from 'common/json/procates.json';
import dotList from './list.dot';

let $ = window.mui;

$.init({
  gestureConfig: {
    tap: true,
    doubletap: false,
    longtap: false,
    hold: false,
    flick: false,
    swipe: false,
    drag: false,
    pinch: false
  }
});

$.ready(function() {
  if (window.viewEXT === '.htm') return;
  $.loadCategList();
});

$.loadCategList = function() {
  let params = $.getStorage('productListParams');
  if (!params.categtopid) {
    $('#list').html('<input type="radio" name="categs" value="0" checked /><a data-id="0">所有分类</a>');
    return;
  }
  let procatesMax = procates[params.categtopid].child;
  let categmax = [{catid: 0, catname: '全部' + procates[params.categtopid].catname}];
  for (let catid in procatesMax) {
    let tmp = {};
    tmp['catid'] = catid;
    tmp['catname'] = procatesMax[catid].catname;
    categmax.push(tmp);
  }
  let categs = {list: categmax, currentId: params.bigcatid};
  $('#list').html(dotList(categs));
  let offset = $('a[data-id="' + categs.currentId + '"]').offset();
  window.scrollTo(0, offset.t);
  if (params.bigcatid !== 0) {
    let _input = document.querySelector('input[value="' + params.bigcatid + '"]');
    if (_input) _input.checked = 'checked';
  }
};