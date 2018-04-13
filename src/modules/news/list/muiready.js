import {SITE_HOST} from 'common/js/config';
import MeScroll from 'plugin/mescroll/mescroll.m';
import AuiLazyload from 'plugin/aui/lazyload';

import dotList from './list.dot';

let $ = window.mui;
let _mescroll = null;
let type = null,
  catid = 0;
let maxid = 0,
  limit = 20;

let lazyload = new AuiLazyload({
  errorImage: '../../static/images/errorImg.png',
  container: $.byId('mescroll'),
  imageCache: true
});

$.init({
  gestureConfig: {
    tap: true,
    doubletap: false,
    longtap: false,
    hold: false,
    flick: false,
    swipe: false,
    drag: false,
    pinch: false
  }
});

// do it in plusready
$.resetMescrollPage = function() {
  if (window.viewEXT === '.htm') return;
  if (type) return; // only do on first
  type = $.currentWebview.type;
  catid = $.currentWebview.catid;
  _mescroll.resetUpScroll(true);
  if (type === 'quanzhong') _mescroll.lockDownScroll(true);
};

$.ready(function() {
  if (window.viewEXT === '.htm') return;
  // mescroll
  let downCallback = function() {
    if (!catid) {
      _mescroll.endSuccess();
      return;
    }
    let url = SITE_HOST.siteurl + 'index.php?moduleid=21&catid=' + catid + '&maxid=' + maxid + '&limit=' + limit + '&page=1';
    // $._toast.loading({title: '加载中...'});
    $.get(url, function(ret) {
      // $._toast.hide();
      _mescroll.endSuccess();
      if (ret.status === 1) {
        if (ret.list.length === 0) {
          $._toast.fail({title: '没有最新了', duration: 2000});
          return false;
        }
        if (ret.page === 1) maxid = ret.maxid;
        $('#list').prepend(dotList({type: type, list: ret.list}));
        if (type === 'quanzhong') lazyload.loadImages();
        _mescroll.scrollTo(0);
      }
    }, 'json');
  };
  let upCallback = function(page) {
    if (!catid) {
      _mescroll.endSuccess(limit, true);
      return;
    }
    let url = SITE_HOST.siteurl + 'index.php?moduleid=21&catid=' + catid + '&limit=' + limit + '&page=' + page.num;
    // $._toast.loading({title: '加载中...'});
    $.get(url, function(ret) {
      // $._toast.hide();
      if (ret.status === 1) {
        if (ret.page === 1) maxid = ret.maxid;
        _mescroll.endSuccess(ret.list.length, Boolean(ret.hasnext));
        $('#list').append(dotList({type: type, list: ret.list}));
        if (type === 'quanzhong') lazyload.loadImages();
      }
    }, 'json');
  };
  _mescroll = new MeScroll('mescroll', {
    down: {
      auto: false,
      callback: downCallback
    },
    up: {
      auto: false,
      isBounce: false,
      page: {
        num: 0,
        size: limit,
        time: null
      },
      toTop: {
        src: '../../static/images/totop.png',
        offset: 1000,
        supportTap: true
      },
      clearEmptyId: 'list',
      callback: upCallback
    }
  });
  $.ajaxSettings.error = function(xhr, type, errorThrown) {
    $.log('_mescroll ajax err...');
    _mescroll.endErr();
  };
});