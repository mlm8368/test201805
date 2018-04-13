import {SITE_HOST} from 'common/js/config';

import dotContact from './contact.dot';

let $ = window.mui;
$.itemid = 0;
$.canadd = 1;
$.sellData = {};

let getInfo = function() {
  let url = SITE_HOST.siteurl + 'index.php?moduleid=2&action=submitprompt';
  $.get(url, function(ret) {
    if (ret.status === 1) {
      $('#info').html(ret.info);
      $.canadd = ret.canadd;
    }
  });
};

$.showContact = function() {
  let lis = $.byId('contact').querySelectorAll('li.aui-list-item');
  lis = [].slice.call(lis);
  lis.forEach(function(el) {
    el.parentNode.removeChild(el);
  });
  $('#contact > li.aui-list-header').after(dotContact($.getStorage('userInfo')));
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

$.ready(function() {
  if (window.viewEXT === '.htm') return;
  $.showContact();
  getInfo();
});