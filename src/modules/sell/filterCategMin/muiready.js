import categ from 'common/json/categs.json';
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
  let params = $.getStorage('sellListParams');
  let categs = {list: categ[params.bigcatid].nodes, toptitle: categ[params.bigcatid].title, currentId: params.catid};
  $('#list').html(dotList(categs));
  let offset = $('a[data-id="' + categs.currentId + '"]').offset();
  window.scrollTo(0, offset.t);
  if (params.bigcatid !== 0 && params.catid !== 0) {
    let _input = document.querySelector('input[value="' + params.catid + '"]');
    if (_input) _input.checked = 'checked';
  }
};
