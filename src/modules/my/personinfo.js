import 'common/sass/mui.init.scss';
import 'common/sass/mui.button.loading.scss';
import './personinfo/style.scss';

import 'common/js/mui.init';
import './personinfo/muiready';
import './personinfo/plusready';

import 'mui/js/mui.dialog.prompt';
import 'mui/js/mui.button';

import 'mui/js/mui.class';
import 'plugin/muipicker/mui.picker';
import 'plugin/muipicker/mui.poppicker';

import {SITE_HOST} from 'common/js/config';
import AuiDialog from 'plugin/aui/dialog';

import area from 'common/json/area.json';

let $ = window.mui;
let viewEXT = window.viewEXT;
let dialog = new AuiDialog();
let webViewFrom = null;

let userInfo = $.getStorage('userInfo');
// logout
$('section').on('tap', '#logout', function() {
  let that = this;
  $(this).button('loading');
  $.rmStorage('userId');
  $.rmStorage('accessToken');
  $.rmStorage('userInfo');
  $.rmStorage('city');
  $.rmStorage('cityId');
  // fire
  let _page = window.plus.webview.getWebviewById('../my/index' + viewEXT);
  $.fire(_page, 'updatePersonInfo', {});
  // alert
  dialog.alert({
    title: '提示',
    msg: '退出成功',
    buttons: ['确定']
  }, function() {
    $(that).button('reset');
    let ws = window.plus.webview.currentWebview();
    window.plus.webview.close(ws);
  });
});
// picker
let genderPicker = new $.PopPicker();
genderPicker.setData(JSON.parse('[{"value":"男","text":"男"},{"value":"女","text":"女"}]'));
$('#genderDiv').addEventListener('tap', function(e) {
  genderPicker.show(function(items) {
    setUser('gender', items[0].value, '性别');
  });
});
let cityPicker = new $.PopPicker();
area[0] = '-省份-';
cityPicker.setData(area);
$('#cityDiv').addEventListener('tap', function(e) {
  cityPicker.show(function(items) {
    if (items[0] === '-省份-') return false;
    setUser('city', items[0], '省份');
  });
});
// tap
let item = ['mobile', 'realname', 'address', 'email', 'qq', 'msn'],
  itemName = ['手机', '姓名', '地址', '邮箱', 'QQ', '微信'];
for (let k in item) {
  $('#' + item[k] + 'Div').addEventListener('tap', function(e) {
    e.detail.gesture.preventDefault();
    $.prompt('请输入' + itemName[k] + '：', '', '', ['取消', '确定'], function(ret) {
      if (ret.index === 1 && ret.message !== '') {
        setUser(item[k], ret.message, itemName[k]);
      }
    });
  });
}
// setUser
function setUser(key, val, title) {
  let uData = {
    key: key,
    val: val
  };
  $._toast.loading({title: title + '设置中...'});
  // ajax
  let userUrl = SITE_HOST.siteurl + 'index.php?moduleid=2&action=setuserinfo&acctoken=' + $.getStorage('accessToken');
  $.post(userUrl, uData, function(ret) {
    if (ret.status === 1) {
      $._toast.success({title: '提交成功', duration: 2000});
      if (key === 'avatar') {
        $.byId('avatar').style.backgroundImage = 'url(' + val + ')';
        if ($._from === 'my_index') $.noop();
      } else if (key === 'city') {
        $('#city').text(val);
        $.byId('address').dataset.city = val;
        userInfo['areaId'] = ret.areaId;
        $.setStorage('areaId', ret.areaId);
        $.setStorage('area', val);
      } else {
        $('#' + key).text(val);
      }
      userInfo[key] = val;
      $.setStorage('userInfo', userInfo);
      // fire
      if ($._from === 'sell_add') {
        if (!webViewFrom) webViewFrom = window.plus.webview.getWebviewById('sell_add');
        if ('realname,mobile,city,address'.indexOf(key) !== false) {
          $.fire(webViewFrom, 'showContact', {});
        }
      }
    } else {
      $._toast.hide();
      dialog.alert({
        title: '提示',
        msg: ret.msg,
        buttons: ['确定']
      });
    }
  }, 'json');
}