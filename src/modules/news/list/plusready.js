let $ = window.mui;

$.plusReady(function() {
  // 渲染top,buttom view
  let screenHeight = window.plus.screen.resolutionHeight - $.currentWebview.tabHeight - 116;
  $.byId('mescroll').style.height = screenHeight + 'px';
  // for extras
  $.resetMescrollPage();
});