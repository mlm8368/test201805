import 'common/sass/mui.init.scss';
import './index/style.scss';

import 'common/js/mui.init';
import 'mui/js/mui.back.5+';
import './index/plusready';
import './index/muiready';

import AuiSlide from 'plugin/aui/slide';

let $ = window.mui;
let viewEXT = window.viewEXT;

if (window.viewEXT === '.htm') {
  let _auiSlide = new AuiSlide({
    container: document.getElementById('aui-slide'),
    'height': 180,
    'speed': 500,
    'autoPlay': 3000,
    'loop': true,
    'pageShow': true,
    'pageStyle': 'line',
    'dotPosition': 'center'
  });
  $.noop(_auiSlide);
}
// tap
$('.dogproduct').on('tap', '.aui-col-xs-3, .aui-card-list-header', function() {
  let dogtype = this.getAttribute('dogtype');
  let clickPopovers = function(event) {
    $.fire(dogmarket, 'clickPopovers', {});
  };
  let dogmarket = $.openWindow({
    id: 'sell_list',
    url: '../product/list' + viewEXT,
    styles: {
      backButtonAutoControl: 'hide',
      bounce: 'none',
      bounceBackground: '#1E90FF',
      titleNView: {
        titleText: '产品库',
        titleColor: '#EE2C2C',
        titleSize: '17px',
        backgroundColor: '#FFFFFF',
        homeButton: true,
        autoBackButton: true,
        progress: {
          color: '#00FF00',
          height: '2px'
        },
        splitLine: {
          color: '#CCCCCC',
          height: '1px'
        },
        buttons: [
          {
            text: '\ue6e3',
            fontSize: '20px',
            fontSrc: '_www/fonts/aui-iconfont.ttf',
            float: 'right',
            onclick: clickPopovers
          }
        ]
      }
    },
    extras: {
      dogtype: dogtype
    }
  });
});
/*
$('.dogmarket').on('tap', '.aui-col-xs-4, .aui-card-list-header', function() {
  let dogtype = this.getAttribute('dogtype');
  let clickPopovers = function(event) {
    $.fire(dogmarket, 'clickPopovers', {});
  };
  let dogmarket = $.openWindow({
    id: 'sell_list',
    url: '../sell/list' + viewEXT,
    styles: {
      backButtonAutoControl: 'hide',
      bounce: 'none',
      bounceBackground: '#1E90FF',
      titleNView: {
        titleText: '狗市场',
        titleColor: '#EE2C2C',
        titleSize: '17px',
        backgroundColor: '#FFFFFF',
        homeButton: true,
        autoBackButton: true,
        progress: {
          color: '#00FF00',
          height: '2px'
        },
        splitLine: {
          color: '#CCCCCC',
          height: '1px'
        },
        buttons: [
          {
            text: '\ue6e3',
            fontSize: '20px',
            fontSrc: '_www/fonts/aui-iconfont.ttf',
            float: 'right',
            onclick: clickPopovers
          }
        ]
      }
    },
    extras: {
      dogtype: dogtype
    }
  });
});
*/
$('#news').on('tap', '.aui-col-xs-6', function() {
  let webviewDetail = window.plus.webview.getWebviewById('news_detail');
  $.fire(webviewDetail, 'getDetail', {
    id: this.dataset.id,
    from: 'list'
  });
  window.plus.nativeUI.showWaiting('加载中...');
});
$('.dognews .aui-list-item-arrow').addEventListener('tap', function() {
  $.clickTabBar({clientX: window.innerWidth * 0.5});
});
$('#dogbreed').on('tap', '.aui-list-item-inner', function() {
  let webviewDetail = window.plus.webview.getWebviewById('news_detail');
  $.fire(webviewDetail, 'getDetail', {
    id: this.dataset.id,
    from: 'list'
  });
  window.plus.nativeUI.showWaiting('加载中...');
});
$('.dogbreed .aui-list-item-arrow').addEventListener('tap', function() {
  $.clickTabBar({clientX: window.innerWidth * 0.5});
});
$('.dogvideo .aui-list-item-arrow').addEventListener('tap', function() {
  $.clickTabBar({clientX: window.innerWidth * 0.3});
});
$('#dogvideo').addEventListener('tap', function() {
  $.clickTabBar({clientX: window.innerWidth * 0.3});
});