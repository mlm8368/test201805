import 'common/sass/mui.init.scss';
import 'common/sass/mui.button.loading.scss';
import './favorite/style.scss';

import 'common/js/mui.init';
import './favorite/plusready';
import './favorite/muiready';

import 'mui/js/mui.button';

import {SITE_HOST} from 'common/js/config';

import AuiDialog from 'plugin/aui/dialog';

let $ = window.mui;
let dialog = new AuiDialog();

$('#list').on('tap', '.aui-list-item-inner', function() {
  let webviewDetail = window.plus.webview.getWebviewById('news_detail');
  $.fire(webviewDetail, 'getDetail', {
    id: this.dataset.newsid,
    from: 'list'
  });
  window.plus.nativeUI.showWaiting('加载中...');
});
$('#list').on('tap', '.aui-checkbox', function() {
  event.stopPropagation();

  this.classList.toggle('aui-checked');
  let refreshSpans = $.byId('list').querySelectorAll('.aui-checkbox.aui-checked');
  let warningSpan = $('footer .aui-label-warning');
  if (refreshSpans.length === 0) {
    warningSpan.text('0');
    warningSpan[0].classList.add('aui-hide');
  } else {
    warningSpan.text(refreshSpans.length);
    warningSpan[0].classList.remove('aui-hide');
  }
});
$('footer').on('tap', '.mui-btn', function() {
  let that = this;
  let refreshSpans = $.byId('list').querySelectorAll('.aui-checkbox.aui-checked');
  if (refreshSpans.length === 0) {
    dialog.alert({
      title: '提示',
      msg: '请先选择要删除的信息...',
      buttons: ['确定']
    });
    return;
  }

  dialog.alert({
    title: '提示',
    msg: '确认要删除吗？',
    buttons: ['取消', '确定']
  }, function(ret) {
    if (ret.buttonIndex === 2) {
      refreshSpans = [].slice.call(refreshSpans);
      let ids = [];
      refreshSpans.forEach(function(item) {
        ids.push(item.dataset.id);
      });

      let url = SITE_HOST.siteurl + 'index.php?moduleid=2&action=favorite&op=del&ids=' + ids.join();
      $._toast.loading({title: '提交中...'});
      $(that).button('loading');
      $.get(url, function(ret) {
        $(that).button('reset');
        if (ret.status === 1) {
          ids.forEach(function(id) {
            $('#f' + id).remove();
          });
          $._toast.success({title: '删除成功', duration: 2000});
          let warningSpan = $('footer .aui-label-warning');
          warningSpan.text('0');
          warningSpan[0].classList.add('aui-hide');
        } else {
          $._toast.hide();
          dialog.alert({
            title: '提示',
            msg: '删除失败了',
            buttons: ['确定']
          });
        }
      }, 'json');
    }
  });
});