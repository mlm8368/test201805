import area from 'common/json/area.json';
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

  let params = $.getStorage('sellListParams');
  let areas = {list: area, currentId: params.areaid};
  if (!areas.currentId) areas.currentId = 0;
  $('#list').html(dotList(areas));
  let offset = $('a[data-id="' + areas.currentId + '"]').offset();
  window.scrollTo(0, offset.t);
});