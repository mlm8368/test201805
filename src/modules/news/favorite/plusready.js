import {doLogin} from 'common/js/global';

import AuiDialog from 'plugin/aui/dialog';

let $ = window.mui;

$.plusReady(function() {
  // 渲染top,buttom view
  let screenHeight = window.plus.screen.resolutionHeight - $.currentWebview.tabHeight - 50 - 116;
  $.byId('mescroll').style.height = screenHeight + 'px';

  if (!$.isLogin()) {
    let dialog = new AuiDialog();
    dialog.alert({
      title: '提示',
      msg: '请登录后查看',
      buttons: ['确定']
    }, function() {
      doLogin();
    });
  }
});