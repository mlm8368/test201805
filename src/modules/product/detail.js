import 'common/sass/mui.init.scss';
import './detail/style.scss';

import 'common/js/mui.init';
import 'mui/js/mui.back.5+';
import './detail/plusready';
import './detail/muiready';

import {SITE_HOST} from 'common/js/config';

let $ = window.mui;
let _id = 0;
let favStatus = 0,
  favLoad = 0;
let detailInfo = {};
let nviewSlider = null;

$.plusReady(function() {
  nviewSlider = window.plus.nativeObj.View.getViewById('slider-native');
});

let getLastdata = function() {
  let url = SITE_HOST.siteurl + 'index.php?moduleid=5&action=getlastdata&itemid=' + _id;
  $.get(url, function(ret) {
    if (ret.status === 1) {
      $.byId('catname').dataset.hot = ret.hot;
      favStatus = ret.fav;
      setFavorite();
    }
  }, 'json');
};
let setFavorite = function() {
  // $.log(favStatus);
  let favoriteDiv = $('footer i.mystar')[0];
  if (favStatus) favoriteDiv.classList.add('fill');
  else favoriteDiv.classList.remove('fill');
};
// vender detailInfo
$.showDetailData = function(data) {
  if (!data) {
    data = {
      title: '',
      price: '',
      todate: '',
      catname: '',
      hot: 0,
      truename: '',
      tel: '',
      address: '',
      dogsex: '',
      dogage: '',
      edittime: '',
      msn: '',
      qq: '',
      content: '',
      photos: [{src: '../../static/images/nopic.png', width: '100%'}]
    };
    _id = 0;
    favStatus = 0;
    favLoad = 0;
  }
  $.extend(detailInfo, data);
  // show
  $.byId('title').dataset.title = detailInfo.title;
  $('#price').text(detailInfo.price);
  $.byId('price').dataset.todate = detailInfo.todate;
  $.byId('catname').dataset.catname = detailInfo.catname;
  $.byId('catname').dataset.hot = detailInfo.hot;
  $('#truename').text(detailInfo.truename);
  $('#tel').text(detailInfo.tel);
  $('#address').text(detailInfo.address);
  $('#dogsex').text(detailInfo.dogsex);
  $('#dogage').text(detailInfo.dogage);
  $('#edittime').text(detailInfo.edittime);
  $('#msn').text(detailInfo.msn);
  $('#qq').text(detailInfo.qq);
  $('#content').html(detailInfo.content);

  if (nviewSlider) nviewSlider.setImages(detailInfo.photos);
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
  let url = SITE_HOST.siteurl;
  if (_from === 'manage') url = SITE_HOST.siteurl;
  url += 'index.php?moduleid=5&itemid=' + _id;
  $._toast.loading({title: '加载中...'});
  $.get(url, function(ret) {
    $.log(ret);
    $._toast.hide();
    window.plus.nativeUI.closeWaiting();
    $.currentWebview.show('slide-in-right', 300);
    if (ret.status === 1) {
      $.showDetailData(ret.re);
      getLastdata();
    }
  }, 'json');
});
// tap
$('#favorite').addEventListener('tap', function(e) {
  if (favLoad) return;
  favLoad = 1;
  let type = favStatus ? 0 : 1,
    op = type ? 'add' : 'del',
    tip = type ? '收藏' : '取消';
  let url = SITE_HOST.siteurl + 'index.php?moduleid=5&action=addfavorite&op=' + op + '&itemid=' + _id;
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