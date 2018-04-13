import {createIframe} from './util';
import {SITE_HOST} from 'common/js/config';
import MeScroll from 'plugin/mescroll/mescroll.m';
import AuiLazyload from 'plugin/aui/lazyload';

import dotList from './list.dot';

let $ = window.mui;
let viewEXT = window.viewEXT;
let _mescroll = null;
let limit = 20,
  maxtime = 0;
let params = {
  searchkw: '',
  areaid: $.getStorage('areaId'),
  catid: 0, // small catid
  bigcatid: 0,
  sort: 'new',
  fields: 0, // search type
  title_shop_area: '全国',
  title_shop_categ: '所有分类',
  title_shop_sort: '最新信息'
};

let lazyload = new AuiLazyload({
  errorImage: '../../static/images/errorImg.png',
  container: $.byId('mescroll'),
  imageCache: true
});

let updateSubtabTitle = function() {
  let _params = $.getStorage('sellListParams');
  $.byId('shop_area').title = _params.title_shop_area;
  $.byId('shop_categ').title = _params.title_shop_categ;
  $.byId('shop_sort').title = _params.title_shop_sort;
};

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

// do it in subtab
$.resetMescrollPage = function() {
  if (window.viewEXT === '.htm') return;

  updateSubtabTitle();
  _mescroll.resetUpScroll(true);
};

$.ready(function() {
  createIframe('area', {id: 'filterArea', url: 'filterArea' + viewEXT});
  createIframe('categ_max', {id: 'filterCategMax', url: 'filterCategMax' + viewEXT});
  createIframe('categ_min', {id: 'filterCategMin', url: 'filterCategMin' + viewEXT});
  createIframe('sort', {id: 'filterSort', url: 'filterSort' + viewEXT});
  // htm
  if (window.viewEXT === '.htm') return;

  // $.rmStorage('sellListParams');
  if ($.getStorage('sellListParams')) $.extend(params, $.getStorage('sellListParams'));
  else $.setStorage('sellListParams', params);

  updateSubtabTitle();
  // mescroll
  let downCallback = function() {
    let _params = $.getStorage('sellListParams');
    delete _params.title_shop_area;
    delete _params.title_shop_categ;
    delete _params.title_shop_sort;

    let url = SITE_HOST.siteurl + 'index.php?moduleid=5&maxtime=' + maxtime + '&limit=' + limit + '&page=1';
    // $._toast.loading({title: '加载中...'});
    $.get(url, _params, function(ret) {
      // $._toast.hide();
      _mescroll.endSuccess();
      if (ret.status === 1) {
        if (ret.list.length === 0) {
          $._toast.fail({title: '没有最新了', duration: 2000});
          return false;
        }
        if (ret.page === 1) maxtime = ret.maxtime;
        $('#list').prepend(dotList(ret.list));
        lazyload.loadImages();
        _mescroll.scrollTo(0);
      }
    }, 'json');
  };
  let upCallback = function(page) {
    let _params = $.getStorage('sellListParams');
    delete _params.title_shop_area;
    delete _params.title_shop_categ;
    delete _params.title_shop_sort;

    let url = SITE_HOST.siteurl + 'index.php?moduleid=5&limit=' + limit + '&page=' + page.num;
    // $._toast.loading({title: '加载中...'});
    $.get(url, _params, function(ret) {
      // $._toast.hide();
      if (ret.status === 1) {
        if (ret.page === 1) maxtime = ret.maxtime;
        _mescroll.endSuccess(ret.list.length, Boolean(ret.hasnext));
        $('#list').append(dotList(ret.list));
        lazyload.loadImages();
      }
    }, 'json');
  };
  _mescroll = new MeScroll('mescroll', {
    down: {
      auto: false,
      callback: downCallback
    },
    up: {
      auto: true,
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