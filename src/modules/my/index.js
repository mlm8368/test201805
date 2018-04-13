import 'common/sass/mui.init.scss';
import './index/style.scss';

import 'common/js/mui.init';
// import './index/plusready';
import './index/muiready';

import {updatePersonInfo} from './js/global';

let $ = window.mui;
let viewEXT = window.viewEXT;

// customEvent
document.addEventListener('updatePersonInfo', function(event) {
  updatePersonInfo();
});

// tap
$('#personinfo').on('tap', '.aui-list.aui-media-list', function() {
  let _id = 'my_personinfo';
  let _url = './personinfo' + viewEXT;
  let _titleText = '个人信息';
  let _extras = {from: 'my_index'};
  if (!$.isLogin()) {
    _id = 'login_login';
    _url = '../login/login' + viewEXT;
    _titleText = '登录';
  }
  $.openWindow({
    id: _id,
    url: _url,
    styles: {
      backButtonAutoControl: 'close',
      bounce: 'none',
      bounceBackground: '#1E90FF',
      titleNView: {
        titleText: _titleText,
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
    },
    extras: _extras
  });
});