import WebviewGroup from 'plugin/aui/webviewGroup';

let $ = window.mui;
let viewEXT = window.viewEXT;

$.plusReady(function() {
  // 渲染top,buttom view
  let tabHeight = $.byId('aui-tab').offsetHeight;
  let _style = {
    top: tabHeight + 'px',
    bottom: '0px',
    render: 'always',
    backButtonAutoControl: 'hide',
    bounce: 'none',
    bounceBackground: '#1E90FF'
  };
  let _self = window.plus.webview.currentWebview();
  let group = new WebviewGroup(_self.id, {
    top: tabHeight + 5,
    items: [{
      id: 'news_list_quanzhong',
      url: 'list' + viewEXT,
      styles: _style,
      extras: {type: 'quanzhong', catid: 67, tabHeight: tabHeight}
    }, {
      id: 'news_list_xuangou',
      url: 'list' + viewEXT,
      styles: _style,
      extras: {type: 'xuangou', catid: 66, tabHeight: tabHeight}
    }, {
      id: 'news_list_yanggou',
      url: 'list' + viewEXT,
      styles: _style,
      extras: {type: 'yanggou', catid: 68, tabHeight: tabHeight}
    }, {
      id: 'news_list_zixun',
      url: 'list' + viewEXT,
      styles: _style,
      extras: {type: 'zixun', catid: 65, tabHeight: tabHeight}
    }, {
      id: 'news_favorite',
      url: 'favorite' + viewEXT,
      styles: _style,
      extras: {type: 'favorite', tabHeight: tabHeight}
    }],
    onChange: function(obj) {
      var c = document.querySelector('.mui-control-item.mui-active');
      if (c) {
        c.classList.remove('mui-active');
      }
      var target = document.querySelector('.mui-scroll .mui-control-item:nth-child(' + (parseInt(obj.index) + 1) + ')');
      target.classList.add('mui-active');
      if (target.scrollIntoView) {
        target.scrollIntoView();
      }
    }
  });
  // tap
  $('.mui-scroll').on('tap', '.mui-control-item', function(e) {
    var wid = this.getAttribute('data-wid');
    group.switchTab(wid);
  });
  // preload
  $.preload({
    id: 'news_detail',
    url: 'detail' + viewEXT,
    styles: {
      'backButtonAutoControl': 'hide',
      'render': 'always',
      'popGesture': 'hide',
      'bounce': 'none',
      'bounceBackground': '#efeff4',
      'titleNView': {
        backgroundColor: '#f7f7f7',
        titleText: '查看资讯',
        titleColor: '#000000',
        autoBackButton: true,
        splitLine: {
          color: '#cccccc'
        },
        buttons: [
          {
            text: '\ue700',
            fontSize: '20px',
            fontSrc: '_www/fonts/aui-iconfont.ttf',
            float: 'right',
            onclick: function(event) {
              let webviewDetail = window.plus.webview.getWebviewById('news_detail');
              $.fire(webviewDetail, 'doShare', {});
            }
          },
          {
            text: '\ue639',
            fontSize: '20px',
            fontSrc: '_www/fonts/star.ttf',
            float: 'right',
            onclick: function(event) {
              let webviewDetail = window.plus.webview.getWebviewById('news_detail');
              $.fire(webviewDetail, 'doFavorite', {});
            }
          }
        ]
      }
    }
  });
});