import {SITE_HOST} from 'common/js/config';
import AuiLazyload from 'plugin/aui/lazyload';

import AuiSlide from 'plugin/aui/slide';

import dotSlide from './slide.dot';
import dotNews from './news.dot';
import dotDogbreed from './dogbreed.dot';
import dotDogvideo from './dogvideo.dot';

let $ = window.mui;

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

$.ready(function() {
  if (window.viewEXT === '.htm') return;

  let url = SITE_HOST.siteurl + 'index.php?action=home';
  $._toast.loading({title: '加载中...'});
  $.get(url, function(ret) {
    $._toast.hide();
    if (ret.slide.length > 0) {
      $('#slide').html(dotSlide(ret.slide));
      let _auiSlide = new AuiSlide({
        container: document.getElementById('aui-slide'),
        'height': 180,
        'speed': 500,
        'autoPlay': 3000,
        'loop': true,
        'pageShow': true,
        'pageStyle': 'line',
        'dotPosition': 'center'
      });
      $.noop(_auiSlide);
    }
    if (ret.sellpic) {
      $.byId('sellSimg').dataset.src = ret.sellpic.s;
      $.byId('sellMimg').dataset.src = ret.sellpic.m;
      $.byId('sellBimg').dataset.src = ret.sellpic.b;
    }
    if (ret.news.length > 0) {
      $('#news').html(dotNews(ret.news));
    }
    if (ret.dogbreed) {
      $('#dogbreed').html(dotDogbreed(ret.dogbreed));
    }
    if (ret.dogvideo) {
      $('#dogvideo').html(dotDogvideo(ret.dogvideo));
    }

    lazyload.loadImages();
  }, 'json');
});