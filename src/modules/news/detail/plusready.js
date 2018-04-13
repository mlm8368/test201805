let $ = window.mui;

$.plusReady(function() {
  // 渲染top,buttom view
  $.currentWebview.addEventListener('hide', function (e) {
    window.scrollTo(0, 0);
    $.showDetailData();
  }, false);
});