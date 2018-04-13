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
  if (!params.categtopid || !params.bigcatid) {
    $('#list').html('');
    return;
  }
  let procatesMin = procates[params.categtopid].child[params.bigcatid].child;
  let categmin = [{catid: 0, catname: '全部' + procates[params.categtopid].child[params.bigcatid].catname}];
  for (let catid in procatesMin) {
    let tmp = {};
    tmp['catid'] = catid;
    tmp['catname'] = procatesMin[catid].catname;
    categmin.push(tmp);
  }
  let categs = {list: categmin, currentId: params.catid};
  $('#list').html(dotList(categs));
  let offset = $('a[data-id="' + categs.currentId + '"]').offset();
  window.scrollTo(0, offset.t);
  if (params.catid !== 0) {
    let _input = document.querySelector('input[value="' + params.catid + '"]');
    if (_input) _input.checked = 'checked';
  }
};
