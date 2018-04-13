import 'common/sass/mui.init.scss';
import 'common/sass/mui.button.loading.scss';
import './reg/style.scss';

import 'common/js/mui.init';
// import './reg/plusready';
import './reg/muiready';

import 'mui/js/mui.dialog.alert';
import 'mui/js/mui.button';

import {SITE_HOST} from 'common/js/config';

let $ = window.mui;

$('section').on('tap', '#reg', function() {
  let that = this;
  $(this).button('loading');
  // reg
  let username = $.trim($.byId('username').value),
    passwd = $.byId('passwd').value,
    passwd2 = $.byId('passwd2').value;
  let uData = {};

  if (username.replace(/[^\x00-\xff]/g, '__').length < 4) {
    $.alert('请填写4个字节以上的用户名', '提示');
    $(this).button('reset');
    return false;
  }
  if (passwd.length < 6) {
    $.alert('请填写6位数以上的密码', '提示');
    $(this).button('reset');
    return false;
  }
  if (passwd !== passwd2) {
    $.alert('两次输入的密码不一致', '提示');
    $(this).button('reset');
    return false;
  }
  uData['submit'] = 1;
  uData['username'] = username;
  uData['password'] = passwd;
  uData['areaid'] = 0;
  let areaId = $.getStorage('areaId');
  if (areaId) uData['areaid'] = areaId;

  let userUrl = SITE_HOST.siteurl + 'index.php?moduleid=2&action=reg';
  $.setStorage('accessToken', '');
  $.post(userUrl, uData, function(ret) {
    $(that).button('reset');
    if (ret.status === 1) {
      $.alert('注册成功', '提示', function() {
        let ws = window.plus.webview.currentWebview();
        window.plus.webview.close(ws);
      });
    } else {
      $.alert(ret.msg, '提示');
    }
  }, 'json');
});