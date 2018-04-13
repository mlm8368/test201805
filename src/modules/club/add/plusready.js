import {SITE_HOST} from 'common/js/config';
import {getFileExt, uuid} from 'common/js/global';

let $ = window.mui;
let _id = 0;
let allUploads = {},
  total = 0,
  baidubosUploaderAsccess = {};

$.setClubid = function(id) {
  _id = id;
};

$.doUpload = function(file) {
  if ($.isEmptyObject(baidubosUploaderAsccess)) return;

  let tmp = {img: '', status: 0};
  let uploader = window.plus.uploader.createUpload(SITE_HOST.baidubosUploaderUrl, {}, function(upload, status) {
    total--;
    allUploads[upload.__UUID__].status = status;
    if (status === 200) {
      let url = SITE_HOST.siteurl + 'index.php?moduleid=18&action=add&op=updatePhotos&gid=86&id=' + _id;
      $.post(url, {photos: allUploads[upload.__UUID__].img}, function(ret) {
        if (total === 0) {
          $._toast.hide();
          $.back2();
        }
      });
    } else if (total === 0) {
      $._toast.hide();
      $.back2();
    }
  });

  let ext = getFileExt(file);
  let _uuid = uuid(8);

  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) month = '0' + month;
  let key = year + '/' + month + '/' + _uuid + '.' + ext;
  tmp['img'] = SITE_HOST.baidubosUploaderImgUrl + key;
  allUploads[uploader.__UUID__] = tmp;

  uploader.addData('accessKey', baidubosUploaderAsccess.accessKey);
  uploader.addData('policy', baidubosUploaderAsccess.policy);
  uploader.addData('signature', baidubosUploaderAsccess.signature);
  uploader.addData('key', key);
  uploader.addFile(file, {key: 'file'});
  total++;
  uploader.start();
};

$.plusReady(function() {
  $.get(SITE_HOST.siteurl + 'ack.php?policy=dogquan', function(ret) {
    baidubosUploaderAsccess = ret;
  }, 'json');
});