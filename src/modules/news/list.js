import 'common/sass/mui.init.scss';
import './list/style.scss';

import 'common/js/mui.init';
import './list/plusready';
import './list/muiready';

let $ = window.mui;

$('#list').on('tap', 'li', function() {
  let webviewDetail = window.plus.webview.getWebviewById('news_detail');
  $.fire(webviewDetail, 'getDetail', {
    id: this.dataset.id,
    from: 'list'
  });
  window.plus.nativeUI.showWaiting('加载中...');
});