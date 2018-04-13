import 'common/sass/mui.init.scss';
import 'common/sass/mui.button.loading.scss';
import './manage/style.scss';

import 'common/js/mui.init';
import 'mui/js/mui.back.5+';
import './manage/plusready';
import './manage/muiready';

import 'mui/js/mui.button';

import {SITE_HOST} from 'common/js/config';
import {titleNView} from './js/global';

import AuiDialog from 'plugin/aui/dialog';

let $ = window.mui;
let viewEXT = window.viewEXT;
let dialog = new AuiDialog();

// tap
$('#list').on('tap', '.aui-card-list-header', function() {
  let webviewDetail = window.plus.webview.getWebviewById('sell_detail');
  $.fire(webviewDetail, 'getDetail', {
    id: this.dataset.id,
    from: 'manage'
  });
  window.plus.nativeUI.showWaiting('加载中...');
  titleNView.titleText = this.innerText;
  webviewDetail.setStyle({
    'titleNView': titleNView
  });
});
$('#list').on('tap', 'label.refresh', function() {
  event.stopPropagation();
  if (this.querySelector('span.aui-checkbox').classList.contains('aui-disabled')) return;

  this.querySelector('span.aui-checkbox').classList.toggle('aui-checked');
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
$('#list').on('tap', 'label.edit', function() {
  event.stopPropagation();
  let _id = this.dataset.id;
  $.openWindow({
    id: 'sell_add',
    url: 'add' + viewEXT,
    styles: {
      backButtonAutoControl: 'close',
      bounce: 'none',
      bounceBackground: '#1E90FF',
      titleNView: {
        titleText: '编辑信息',
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
    extras: {
      _id: _id
    }
  });
});
$('#list').on('tap', 'label.del', function() {
  event.stopPropagation();
  let _id = this.dataset.id;
  dialog.alert({
    title: '提示',
    msg: '确认要删除吗？',
    buttons: ['取消', '确定']
  }, function(ret) {
    if (ret.buttonIndex === 2) {
      let url = SITE_HOST.siteurl + 'index.php?moduleid=2&action=my&mid=5&op=delete&itemid=' + _id;
      $._toast.loading({title: '提交中...'});
      $.get(url, function(ret) {
        if (ret.status === 1) {
          $('#t' + _id).remove();
          $._toast.success({title: '删除成功', duration: 2000});
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
$('footer').on('tap', '.mui-btn', function() {
  let refreshSpans = $.byId('list').querySelectorAll('.aui-checkbox.aui-checked');
  if (refreshSpans.length === 0) {
    dialog.alert({
      title: '提示',
      msg: '请先选择要刷新的信息...',
      buttons: ['确定']
    });
    return;
  }

  refreshSpans = [].slice.call(refreshSpans);
  let ids = [];
  refreshSpans.forEach(function(item) {
    ids.push(item.dataset.id);
  });
  let url = SITE_HOST.siteurl + 'index.php?moduleid=2&action=my&mid=5&op=refresh&ids=' + ids.join();
  $._toast.loading({title: '提交中...'});
  $(this).button('loading');
  let that = this;
  $.get(url, function(ret) {
    $(that).button('reset');
    if (ret.status === 1) {
      refreshSpans.forEach(function(item) {
        item.classList.remove('aui-checked');
        item.classList.add('aui-disabled');
        item.parentNode.querySelector('span:last-child').innerText = '(last:' + ret.lastdate + ')';
      });
      $._toast.success({title: '刷新成功', duration: 2000});
      let warningSpan = $('footer .aui-label-warning');
      warningSpan.text('0');
      warningSpan[0].classList.add('aui-hide');
    } else {
      $._toast.hide();
      dialog.alert({
        title: '提示',
        msg: '刷新失败了',
        buttons: ['确定']
      });
    }
  }, 'json');
});