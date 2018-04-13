let $ = window.mui;

$.plusReady(function() {
  // 渲染top,buttom view
  let screenHeight = window.plus.screen.resolutionHeight - 121;
  $.byId('mescroll').style.height = screenHeight + 'px';
});