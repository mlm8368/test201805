import 'common/sass/mui.init.scss';
import './list/style.scss';

import 'common/js/mui.init';
import 'mui/js/mui.dialog.prompt';
import './list/plusready';
import './list/muiready';

import {SITE_HOST} from 'common/js/config';
import {doLogin} from 'common/js/global';

import AuiPopup from 'plugin/aui/popup';

import AuiDialog from 'plugin/aui/dialog';

import dotReply from './list/reply.dot';

let $ = window.mui;
let viewEXT = window.viewEXT;
let dialog = new AuiDialog();
let popup = new AuiPopup();
// tap
$('#list').on('tap', '.c-icon', function() {
  event.stopPropagation();
  let tid = this.dataset.tid;
  let cwClasslist = $.byId('c_w_' + tid).classList;
  if (!cwClasslist.contains('hide')) {
    cwClasslist.add('hide');
    return;
  }
  cwClasslist.remove('hide');
});
$('#list').on('tap', '.del', function() {
  event.stopPropagation();
  let id = this.dataset.tid;
  let url = SITE_HOST.siteurl + 'index.php?moduleid=18&action=delete&itemid=' + id;
  $._toast.loading({title: '提交中...'});
  $.get(url, function(ret) {
    if (ret.status === 1) {
      $('#t' + id).remove();
      $._toast.success({title: ret.msg, duration: 2000});
    } else {
      $._toast.hide();
      dialog.alert({
        title: '提示',
        msg: '删除失败了',
        buttons: ['确定']
      });
    }
  }, 'json');
});
$('#list').on('tap', '.dianzan', function() {
  event.stopPropagation();
  let that = this;
  let tid = this.dataset.tid;
  let pid = this.dataset.pid;
  let _op = (pid > 0) ? 'del' : 'add';
  let url = SITE_HOST.siteurl + 'index.php?moduleid=18&action=praise&op=' + _op + '&itemid=' + tid + '&pid=' + pid;
  $._toast.loading({title: '提交中...'});
  $.get(url, function(ret) {
    if (ret.status === 1) {
      that.querySelector('i').dataset.op = ret.op;
      that.dataset.pid = ret.pid;
      $('#c_c_l_' + tid + ' .cmt-wrap').html(dotReply({tid: tid, dianzan: '我', pid: ret.pid}));
      $._toast.success({title: '成功', duration: 2000});
    } else {
      $._toast.hide();
      dialog.alert({
        title: '提示',
        msg: '失败了',
        buttons: ['确定']
      });
    }
  }, 'json');
});
$('#list').on('tap', '.pinglun', function(e) {
  event.stopPropagation();
  e.detail.gesture.preventDefault();
  let tid = this.dataset.tid;
  $.prompt('回复此帖：', '', '', ['取消', '确定'], function(ret) {
    if (ret.index === 1 && ret.message !== '') {
      let datas = {};
      datas['submit'] = '1';
      datas['content'] = ret.message;
      let url = SITE_HOST.siteurl + 'index.php?moduleid=18&job=reply&action=add&tid=' + tid;
      $._toast.loading({title: '提交中...'});
      $.post(url, datas, function(ret) {
        if (ret.status === 1) {
          $('#c_c_l_' + tid + ' .cmt-wrap').html(dotReply({tid: tid, pinglun: '<p><span>我：</span>' + datas.content + '</p>'}));
          $._toast.success({title: '回复成功', duration: 2000});
        } else {
          $._toast.hide();
          dialog.alert({
            title: '提示',
            msg: '失败了',
            buttons: ['确定']
          });
        }
      }, 'json');
    }
  });
});
$('#list').on('tap', '.photos img', function(e) {
  let photosDiv = $(this).closest('.photos');
  if (!photosDiv) return;
  let images = [].slice.call(photosDiv.querySelectorAll('img'));
  let urls = [];
  images.forEach(function(item) {
    urls.push(item.src);
  });
  let index = images.indexOf(this);
  window.plus.nativeUI.previewImage(urls, {
    current: index,
    loop: false,
    indicator: 'number'
  });
});
// Popovers
let doClickPopovers = function(ret) {
  if (ret.buttonIndex === 0) return;
  let _id = '',
    _url = '',
    _title = '';
  if (!$.isLogin()) {
    doLogin();
    return;
  } else if (ret.buttonIndex === 1) {
    _id = 'club_add';
    _url = 'add' + viewEXT;
    _title = '发布帖子';
  } else if (ret.buttonIndex === 2) {
    $.resetMescrollPage('my');
    return;
  } else if (ret.buttonIndex === 3) {
    $.resetMescrollPage('all');
    return;
  } else {
    return;
  }
  // openwindow
  $.openWindow({
    id: _id,
    url: _url,
    styles: {
      backButtonAutoControl: 'hide',
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
// fire customEvent
document.addEventListener('clickPopovers', function(event) {
  popup.init({
    frameBounces: true,
    location: 'top-right',
    buttons: [{
      image: '../../static/images/tmp/qq-weibo.png',
      text: '发布帖子',
      value: 'add'
    }, {
      image: '../../static/images/tmp/qq-weibo.png',
      text: '查看我的',
      value: 'manage'
    }, {
      image: '../../static/images/tmp/qq-weibo.png',
      text: '查看最新',
      value: 'favorite'
    }]
  }, function(ret) {
    // console.log(JSON.stringify(ret));
    if (ret) doClickPopovers(ret);
  });
});
document.addEventListener('refreshByadd', function(event) {
  $.resetMescrollPage('my');
});