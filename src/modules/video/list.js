import 'common/sass/mui.init.scss';
import './list/style.scss';

import 'common/js/mui.init';
import './list/plusready';
import './list/muiready';

import {SITE_HOST} from 'common/js/config';

import AuiPopup from 'plugin/aui/popup';

let $ = window.mui;
let popup = new AuiPopup();

$('#list').on('tap', 'div.playvideo', function() {
  let that = this;
  let offset = $(this).offset();
  let id = this.dataset.id;
  let videoUrl = this.dataset.video;
  let imageUrl = this.querySelector('img').src;
  let player = window.player(id, videoUrl, imageUrl, offset.w, offset.h, '50c26363e0da4c84be42265e8f8632e5');
  player.onReady(function() {
    that.classList.add('hide');
  });
  player.play();
});
$('#list').on('tap', 'span.praise', function() {
  if (this.classList.contains('done')) return;
  this.classList.add('done');

  let that = this;
  let _id = this.dataset.id;
  let num = this.querySelector('i.num').dataset.praise;

  let url = SITE_HOST.siteurl + 'index.php?moduleid=21&action=reviewvote&types=praise&itemid=' + _id;
  $._toast.loading({title: '提交中...'});
  $.get(url, function(ret) {
    if (ret.status === 1) {
      that.querySelector('i.num').dataset.praise = parseInt(num) + 1;
      $._toast.success({title: '点赞成功', duration: 2000});
    } else {
      that.classList.remove('done');
      $._toast.fail({title: '提交失败', duration: 4000});
    }
  }, 'json');
});
// Popovers
let doClickPopovers = function(ret) {
  if (ret.buttonIndex === 0) return;
  $.resetMescrollPage(ret.buttonValue);
};
// fire customEvent
document.addEventListener('clickPopovers', function(event) {
  popup.init({
    frameBounces: true,
    location: 'top-right',
    buttons: [{
      image: '../../static/images/tmp/qq-weibo.png',
      text: '最新视频',
      value: 'new'
    }, {
      image: '../../static/images/tmp/qq-weibo.png',
      text: '周排行',
      value: 'hotweek'
    }, {
      image: '../../static/images/tmp/qq-weibo.png',
      text: '月排行',
      value: 'hotmonth'
    }, {
      image: '../../static/images/tmp/qq-weibo.png',
      text: '总排行',
      value: 'hotall'
    }]
  }, function(ret) {
    // console.log(JSON.stringify(ret));
    if (ret) doClickPopovers(ret);
  });
});