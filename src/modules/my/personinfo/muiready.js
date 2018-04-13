import {SITE_HOST} from 'common/js/config';
import AuiDialog from 'plugin/aui/dialog';

let $ = window.mui;
let dialog = new AuiDialog();

let userInfo = $.getStorage('userInfo');

$._from = null;

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

  $._toast.loading({title: '加载中...'});
  let userUrl = SITE_HOST.siteurl + 'index.php?moduleid=2&action=getuserinfo';
  $.get(userUrl, function(ret) {
    $._toast.hide();
    if (ret.status === 1) {
      let editItem = 'avatar;realname;gender;mobile;email;address;area;qq;msn',
        users = ret.users;
      for (let k in users) {
        if (editItem.indexOf(k) === -1) continue;
        if (k === 'avatar') {
          userInfo['avatar'] = users[k];
          let face = users[k];
          if (face !== '') {
            $.byId('avatar').style.backgroundImage = 'url(' + face + ')';
          } else {
            $.byId('avatar').style.backgroundImage = 'url(../../static/images/defaultAvatar.png)';
          }
        } else if (k === 'area') {
          userInfo['areaId'] = users['area'];
          userInfo['area'] = users['areaname'];
          $('#city').text(users['areaname']);
          $.byId('address').dataset.city = users['areaname'];
        } else {
          userInfo[k] = users[k];
          $('#' + k).text(users[k]);
        }
      }
      $.setStorage('userInfo', userInfo);
    } else {
      dialog.alert({
        title: '提示',
        msg: ret.msg,
        buttons: ['确定']
      });
    }
  }, 'json');
});