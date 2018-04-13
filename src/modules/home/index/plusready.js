import util from './util';

let $ = window.mui;

$.plusReady(function() {
  // 渲染top,buttom view
  let self = window.plus.webview.getLaunchWebview(),
    nviewTitle = self.getTitleNView();
  // 页面切换
  let aniShow = {};
  util.initSubpage(aniShow);
  let nview = window.plus.nativeObj.View.getViewById('tabBar'),
    activePage = window.plus.webview.currentWebview(),
    targetPage,
    subpages = util.options.subpages;
  // for index
  $.clickTabBar = function(e) {
    let currIndex = util.getCurrIndex(window.innerWidth, e.clientX, nviewTitle);
    window.currIndex = currIndex;
    if (currIndex > 0) {
      targetPage = window.plus.webview.getWebviewById(subpages[currIndex - 1]);
    } else {
      targetPage = window.plus.webview.currentWebview();
    }
    if (targetPage === activePage) {
      return;
    }
    // change
    util.updateTitleNView(nviewTitle, currIndex);
    util.toggleNview(currIndex);
    util.changeSubpage(targetPage, activePage, aniShow);
    activePage = targetPage;
  };
  nview.addEventListener('click', function(e) {
    $.clickTabBar(e);
  });
  // 头部点击区域
  nviewTitle.addEventListener('click', function(e) {
    if (e.clientX > window.innerWidth * 0.8) {
      // console.log('nviewTitle click ...');
      if (window.currIndex === 1 || window.currIndex === 3) {
        targetPage = window.plus.webview.getWebviewById(subpages[window.currIndex - 1]);
        $.fire(targetPage, 'clickPopovers', {});
      }
    }
  });
});