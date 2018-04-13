import 'common/sass/mui.init.scss';
import './detail/style.scss';

import 'common/js/mui.init';
import 'mui/js/mui.back.5+';
import './detail/plusready';
import './detail/muiready';

import {SITE_HOST} from 'common/js/config';

import dotList from './detail/list.dot';

let $ = window.mui;
let _id = 0;
let favStatus = 0,
  favLoad = 0,
  bitmapFavFill = null;
let detailInfo = {};

let getLastdata = function() {
  let url = SITE_HOST.siteurl + 'index.php?moduleid=21&action=getlastdata&itemid=' + _id;
  $.get(url, function(ret) {
    if (ret.status === 1) {
      $('#hot').text('人气:' + ret.hot);
      $('#praise').text(ret.praise);
      favStatus = ret.favorite;
      setFavorite();
    }
  }, 'json');
};
let setFavorite = function() {
  $.log(favStatus);
  let nviewTitle = $.currentWebview.getTitleNView();
  if (bitmapFavFill === null) bitmapFavFill = new window.plus.nativeObj.Bitmap('bitmapFavFill');
  if (favStatus) {
    bitmapFavFill.loadBase64Data('data:image/png;base64,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');
    nviewTitle.drawBitmap(bitmapFavFill, {top: '0px', left: '0px', width: '100%', height: '100%'}, {top: '10px', right: '46px', width: '24px', height: '24px'}, 'fav');
  } else {
    nviewTitle.drawBitmap(bitmapFavFill, {top: '0px', left: '0px', width: '0px', height: '0px'}, {top: '10px', right: '10px', width: '24px', height: '24px'}, 'fav');
  }
};
// vender detailInfo
$.showDetailData = function(data) {
  if (!data) {
    data = {
      title: '',
      hot: 0,
      source: '',
      times: '',
      content: '',
      praise: 0,
      list: []
    };
    _id = 0;
    favStatus = 0;
    favLoad = 0;
    $.byId('praise').className = '';
  }
  $.extend(detailInfo, data);
  // show
  $('#title').text(detailInfo.title);
  $('#hot').text('人气:' + detailInfo.hot);
  $('#source').text('来源:' + detailInfo.source);
  $('#times').text(detailInfo.times);
  $('#content').html(detailInfo.content);
  $('#praise').text(detailInfo.praise);
  if (detailInfo.list.length > 0) $('#list').html(dotList(detailInfo.list));
};

window.mui.back = function() {
  window.plus.webview.currentWebview().hide('auto', 300);
};
// fire customEvent
document.addEventListener('getDetail', function(event) {
  let _from = event.detail.from;
  _id = event.detail.id;
  if (!_id) {
    return;
  }
  let url = SITE_HOST.siteurl + 'index.php?moduleid=21&itemid=' + _id;
  $._toast.loading({title: '加载中...'});
  $.get(url, function(ret) {
    $._toast.hide();
    if (_from === 'list') {
      window.plus.nativeUI.closeWaiting();
      $.currentWebview.show('slide-in-right', 300);
    }
    if (ret.status === 1) {
      $.showDetailData(ret.re);
      getLastdata();
    }
  }, 'json');
});
document.addEventListener('doFavorite', function(event) {
  if (favLoad) return;
  favLoad = 1;
  let type = favStatus ? 0 : 1,
    op = type ? 'add' : 'del',
    tip = type ? '收藏' : '取消';
  let url = SITE_HOST.siteurl + 'index.php?moduleid=21&action=addfavorite&op=' + op + '&itemid=' + _id;
  $._toast.loading({title: '提交中...'});
  $.get(url, function(ret) {
    $._toast.hide();
    favLoad = 0;
    if (ret.status === 1) {
      favStatus = type;
      setFavorite();
      tip = tip + '成功';
      $._toast.success({title: tip, duration: 2000});
    } else {
      if (ret.msg) tip = ret.msg;
      else tip = tip + '失败了';
      $._toast.fail({title: tip, duration: 4000});
    }
  }, 'json');
});
document.addEventListener('doShare', function(event) {
  console.log('doShare...');
});
// tap
$('#list').on('tap', 'li', function() {
  $.trigger(document, 'getDetail', {
    id: this.dataset.id,
    from: 'detail'
  });
  window.scrollTo(0, 0);
});
$('#praise').addEventListener('tap', function(e) {
  let that = this;
  if (this.className === 'disabled') return;
  this.className = 'disabled';

  let url = SITE_HOST.siteurl + 'index.php?moduleid=21&action=reviewvote&types=praise&itemid=' + _id;
  $._toast.loading({title: '提交中...'});
  $.get(url, function(ret) {
    if (ret.status === 1) {
      $('#praise').text(ret.count);
      $._toast.success({title: '点赞成功', duration: 2000});
    } else {
      that.className = '';
      $._toast.fail({title: '提交失败', duration: 4000});
    }
  }, 'json');
});