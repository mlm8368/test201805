import {SITE_HOST} from 'common/js/config';
import {getFileExt, uuid} from 'common/js/global';
import dotPhotos from './photos.dot';

let $ = window.mui;
let allUploads = {},
  total = 0,
  baidubosUploaderAsccess = {};

$.doUpload = function(imgObj) {
  if ($.isEmptyObject(baidubosUploaderAsccess)) return;
  let tmp = {img: '', status: 0, i: 0};
  let file = imgObj.src;
  let uploader = window.plus.uploader.createUpload(SITE_HOST.baidubosUploaderUrl, {}, function(upload, status) {
    total--;
    allUploads[upload.__UUID__].status = status;
    if (status === 200) {
      let url = SITE_HOST.siteurl + 'index.php?moduleid=2&action=my&mid=5&op=edit&act=thumb&itemid=' + $.itemid;
      let postData = {thumb: allUploads[upload.__UUID__].img};
      if (allUploads[upload.__UUID__].i === 1) postData = {thumb1: allUploads[upload.__UUID__].img};
      if (allUploads[upload.__UUID__].i === 2) postData = {thumb2: allUploads[upload.__UUID__].img};
      $.post(url, postData, function(ret) {
        if (total === 0) {
          $.doAfterSubmit();
          $._toast.success({title: '提交成功', duration: 2000});
        }
      });
    } else if (total === 0) {
      $.doAfterSubmit();
      $._toast.success({title: '提交成功', duration: 2000});
    }
  });

  let ext = getFileExt(file);
  let _uuid = uuid(8);

  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) month = '0' + month;
  let key = year + '/' + month + '/' + _uuid + '.' + ext;

  uploader.addData('accessKey', baidubosUploaderAsccess.accessKey);
  uploader.addData('policy', baidubosUploaderAsccess.policy);
  uploader.addData('signature', baidubosUploaderAsccess.signature);
  uploader.addData('key', key);
  uploader.addFile(file, {key: 'file'});

  tmp['img'] = SITE_HOST.baidubosUploaderImgUrl + key;
  tmp['i'] = total;
  allUploads[uploader.__UUID__] = tmp;
  total++;
  uploader.start();
};

$.plusReady(function() {
  if (window.viewEXT === '.htm') return;
  if ($.currentWebview._id) {
    $.itemid = $.currentWebview._id;

    let url = SITE_HOST.siteurl + 'index.php?moduleid=5&itemid=' + $.itemid;
    $.get(url, function(ret) {
      if (ret.status === 1) {
        $.byId('title').value = ret.re.title;
        $.byId('categ').value = ret.re.catname;
        $.byId('categ').dataset.catid = ret.re.catid;
        $.byId('gender').value = ret.re.dogsex;
        $.byId('gender').dataset.dogsexid = ret.re.dogsexid;
        $.byId('age').value = ret.re.dogage;
        $.byId('age').dataset.dogageid = ret.re.dogageid;
        if (ret.re.price2) $.byId('price').value = ret.re.price2;
        $.byId('totime').value = ret.re.totime;
        $.byId('totime').dataset.totime = ret.re.totime;
        $.byId('content').value = ret.re.content;
        if (ret.re.photos[0].src) {
          let that = $('.aui-col-xs-4');
          let thumb = ret.re.photos[0].src;
          if (thumb.indexOf('http') === 0) {
            that[0].innerHTML = dotPhotos({type: 'addpic', url: thumb});
            that[0].classList.remove('add-photos');
            that[0].classList.add('image-item');
          }
          if (ret.re.photos[1]) {
            that[1].innerHTML = dotPhotos({type: 'addpic', url: ret.re.photos[1].src});
            that[1].classList.remove('add-photos');
            that[1].classList.add('image-item');
          }
          if (ret.re.photos[2]) {
            that[2].innerHTML = dotPhotos({type: 'addpic', url: ret.re.photos[2].src});
            that[2].classList.remove('add-photos');
            that[2].classList.add('image-item');
          }
        }
      }
    });
  }
  // baidubosUploaderAsccess
  $.get(SITE_HOST.siteurl + 'ack.php?policy=dogquan', function(ret) {
    baidubosUploaderAsccess = ret;
  }, 'json');
});