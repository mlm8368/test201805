import 'common/sass/mui.init.scss';
import 'common/sass/mui.button.loading.scss';
import './login/style.scss';

import 'common/js/mui.init';
// import './login/plusready';
import './login/muiready';

import 'mui/js/mui.dialog.alert';
import 'mui/js/mui.button';

import {SITE_HOST} from 'common/js/config';

let $ = window.mui;
let viewEXT = window.viewEXT;
// reg
$('section').on('tap', '#reg', function() {
  $(this).button('loading');
  $.later(function() {
    $(this).button('reset');
  }, 1000);
  $.openWindow({
    id: 'login_reg',
    url: './reg' + viewEXT,
    styles: {
      backButtonAutoControl: 'close',
      bounce: 'none',
      bounceBackground: '#1E90FF',
      titleNView: {
        titleText: '注册',
        titleColor: '#EE2C2C',
        titleSize: '17px',
        backgroundColor: '#FFFFFF',
        autoBackButton: true,
        progress: {
          color: '#00FF00',
          height: '2px'
        },
        splitLine: {
          color: '#CCCCCC',
          height: '1px'
        }
      }
    }
  });
});
// login
$('section').on('tap', '#login', function() {
  let that = this;
  $(this).button('loading');
  let username = $.trim($.byId('username').value),
    passwd = $.byId('passwd').value;
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

  uData['submit'] = 1;
  uData['username'] = username;
  uData['password'] = passwd;

  let userUrl = SITE_HOST.siteurl + 'index.php?moduleid=2&action=login';
  $.setStorage('accessToken', '');
  $.post(userUrl, uData, function(ret) {
    $(that).button('reset');
    // $.log(ret);
    if (ret.status === 1) {
      $.setStorage('userId', ret.userInfo.id);
      $.setStorage('groupId', ret.userInfo.groupid);
      $.setStorage('accessToken', ret.userInfo.accessToken);
      $.setStorage('userInfo', ret.userInfo);
      $.setStorage('area', ret.userInfo.area);
      $.setStorage('areaId', ret.userInfo.areaId);
      // fire
      let _self = window.plus.webview.currentWebview();
      let from = _self.from;
      let _page = null;
      if (from === 'my_index') {
        _page = window.plus.webview.getWebviewById('../my/index' + viewEXT);
        $.fire(_page, 'updatePersonInfo', {});
      }
      // alert
      $.alert('登录成功', '提示', function() {
        let ws = window.plus.webview.currentWebview();
        window.plus.webview.close(ws);
      });
    } else {
      $.alert(ret.msg, '提示');
    }
  }, 'json');
});