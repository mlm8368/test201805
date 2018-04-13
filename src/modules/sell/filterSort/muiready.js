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
  document.querySelector('input[value="' + params.sort + '"]').checked = 'checked';
});