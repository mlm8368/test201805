import {titleNView} from '../js/global';

let $ = window.mui;
let viewEXT = window.viewEXT;

$.plusReady(function() {
  // 渲染top,buttom view
  let screenHeight = window.plus.screen.resolutionHeight - $.byId('subtab').offsetHeight - 115;
  $.byId('mescroll').style.height = screenHeight + 'px';
  // titleNView
  window.titleNView = titleNView;
  window.subNViews = [{
    id: 'slider-native',
    type: 'ImageSlider',
    styles: {
      left: 0,
      right: 0,
      top: 0,
      height: '200px',
      position: 'static',
      loop: true,
      images: []
    }
  }];
  window.webviewDetail = $.preload({
    id: 'sell_detail',
    url: 'detail' + viewEXT,
    styles: {
      'backButtonAutoControl': 'hide',
      'render': 'always',
      'popGesture': 'hide',
      'bounce': 'none',
      'bounceBackground': '#efeff4',
      'titleNView': window.titleNView,
      'subNViews': window.subNViews
    }
  });
});