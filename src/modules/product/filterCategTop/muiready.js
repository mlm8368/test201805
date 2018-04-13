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

  let categtop = [{catid: 0, catname: '全部'}];
  for (let catid in procates) {
    let tmp = {};
    tmp['catid'] = catid;
    tmp['catname'] = procates[catid].catname;
    categtop.push(tmp);
  }
  let params = $.getStorage('productListParams');
  let categtops = {list: categtop, currentId: params.categtopid};
  if (!categtops.currentId) categtops.currentId = 0;
  $('#list').html(dotList(categtops));
  let offset = $('a[data-id="' + categtops.currentId + '"]').offset();
  window.scrollTo(0, offset.t);
});