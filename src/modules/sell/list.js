import 'common/sass/mui.init.scss';
import './list/style.scss';

import 'common/js/mui.init';
import 'mui/js/mui.back.5+';
import './list/plusready';
import './list/muiready';

import {doLogin} from 'common/js/global';
import {closeFilter} from './list/util';

import AuiPopup from 'plugin/aui/popup';

let $ = window.mui;
let viewEXT = window.viewEXT;
let popup = new AuiPopup();

window.mui.back = function() {
  window.plus.webview.currentWebview().hide('auto', 300);
};

window.resetMescrollPage = function(type) {
  $.trigger($.byId(type), 'tap');
  $.resetMescrollPage();
};

let doClickPopovers = function(ret) {
  let _id = '',
    _url = '',
    _title = '';
  if (!$.isLogin()) {
    doLogin();
    return;
  } else if (ret.buttonIndex === 1) {
    _id = 'sell_add';
    _url = 'add' + viewEXT;
    _title = '发布信息';
  } else if (ret.buttonIndex === 2) {
    _id = 'sell_manage';
    _url = 'manage' + viewEXT;
    _title = '我的信息';
  } else if (ret.buttonIndex === 3) {
    _id = 'sell_favorite';
    _url = 'favorite' + viewEXT;
    _title = '我的收藏';
  } else {
    return;
  }
  // openwindow
  $.openWindow({
    id: _id,
    url: _url,
    styles: {
      backButtonAutoControl: 'close',
      bounce: 'none',
      bounceBackground: '#1E90FF',
      titleNView: {
        titleText: _title,
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
};
window.addEventListener('clickPopovers', function(event) {
  popup.init({
    frameBounces: true,
    location: 'top-right',
    buttons: [{
      image: '../../static/images/tmp/qq-weibo.png',
      text: '发布信息',
      value: 'add'
    }, {
      image: '../../static/images/tmp/qq-weibo.png',
      text: '我的信息',
      value: 'manage'
    }, {
      image: '../../static/images/tmp/qq-weibo.png',
      text: '我的收藏',
      value: 'favorite'
    }]
  }, function(ret) {
    // console.log(JSON.stringify(ret));
    if (ret) doClickPopovers(ret);
  });
});

// area
$('.subfilter').on('tap', '#shop_area', function() {
  closeFilter('area');
  if (this.dataset.isshow === 'off') {
    $.byId('areas').style.left = '0';
    // document.body.style.overflowY = 'hidden';
    document.body.style.position = 'fixed';
    this.dataset.isshow = 'on';
  } else {
    $.byId('areas').style.left = '';
    // document.body.style.overflowY = '';
    document.body.style.position = '';
    this.dataset.isshow = 'off';
  }
});
$.byId('areas').addEventListener('tap', function() {
  this.style.left = '';
  // document.body.style.overflowY = '';
  document.body.style.position = '';
  $.byId('shop_area').dataset.isshow = 'off';
});
// categ
$('.subfilter').on('tap', '#shop_categ', function() {
  closeFilter('categ');
  if (this.dataset.isshow === 'off') {
    $.byId('categs').style.left = '0';
    // document.body.style.overflowY = 'hidden';
    document.body.style.position = 'fixed';
    this.dataset.isshow = 'on';
  } else {
    $.byId('categs').style.left = '';
    // document.body.style.overflowY = '';
    document.body.style.position = '';
    this.dataset.isshow = 'off';
  }
});
$.byId('categs').addEventListener('tap', function() {
  this.style.left = '';
  // document.body.style.overflowY = '';
  document.body.style.position = '';
  $.byId('shop_categ').dataset.isshow = 'off';
});
// sort
$('.subfilter').on('tap', '#shop_sort', function() {
  closeFilter('sort');
  if (this.dataset.isshow === 'off') {
    $.byId('sorts').style.left = '0';
    // document.body.style.overflowY = 'hidden';
    document.body.style.position = 'fixed';
    this.dataset.isshow = 'on';
  } else {
    $.byId('sorts').style.left = '';
    // document.body.style.overflowY = '';
    document.body.style.position = '';
    this.dataset.isshow = 'off';
  }
});
$.byId('sorts').addEventListener('tap', function() {
  this.style.left = '';
  // document.body.style.overflowY = '';
  document.body.style.position = '';
  $.byId('shop_sort').dataset.isshow = 'off';
});

// list tap
$('#list').on('tap', 'li', function() {
  let webviewDetail = window.webviewDetail;
  $.fire(webviewDetail, 'getDetail', {
    id: this.dataset.id,
    from: 'list'
  });
  window.plus.nativeUI.showWaiting('加载中...');
  let titleNView = window.titleNView;
  titleNView.titleText = this.querySelector('.aui-list-item-title').innerText;
  webviewDetail.setStyle({
    'titleNView': titleNView
  });
});
