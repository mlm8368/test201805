import 'common/sass/mui.init.scss';
import 'common/sass/mui.button.loading.scss';
import './add/style.scss';

import 'common/js/mui.init';
import 'mui/js/mui.back.5+';
import './add/plusready';
import './add/muiready';

import 'mui/js/mui.button';

import {SITE_HOST} from 'common/js/config';
import {doCompressImage} from 'common/js/global';

import AuiDialog from 'plugin/aui/dialog';

import dotList from './add/list.dot';

let $ = window.mui;
let viewEXT = window.viewEXT;
let dialog = new AuiDialog();
let addButton = null;
let photos = [];
let maxpic = 9;

window.compressImage = function(imgObj) {
  imgObj.removeAttribute('onload');
  doCompressImage(imgObj);
};

let getMaxpic = function() {
  return maxpic - $.byId('photos').querySelectorAll('img').length;
};

$.back2 = function() {
  $(addButton).button('reset');

  let _webview = window.plus.webview.getWebviewById('../club/list' + viewEXT);
  $.fire(_webview, 'refreshByadd', {});

  dialog.alert({
    title: '提示',
    msg: '发布成功',
    buttons: ['确定']
  }, function() {
    $.back();
  });
};

// tap
$('.add-photos').addEventListener('tap', function() {
  let leftPicnum = getMaxpic();
  if (leftPicnum <= 0) {
    dialog.alert({
      title: '提示',
      msg: '最多选' + maxpic + '张照片',
      buttons: ['确定']
    });
    return;
  }
  window.plus.nativeUI.actionSheet({
    title: '选择照片',
    cancel: '取消',
    buttons: [{title: '拍照'}, {title: '打开相册'}]
  }, function(e) {
    switch (e.index) {
      case 0:
        $.noop();
        break;
      case 1:
        let cmr = window.plus.camera.getCamera();
        cmr.captureImage(function(path) {
          window.plus.gallery.save(path, function(ret) {
            $('.add-photos').before(dotList([ret.file]));
          }, function(err) {
            $._toast.fail({title: err.message, duration: 2000});
          });
        }, function(err) {
          $._toast.fail({title: err.message, duration: 2000});
        }, {filename: '_doc/gallery/'});
        break;
      case 2:
        window.plus.gallery.pick(function(ret) {
          if (ret.files.length > 0) {
            for (let i = 0; i < ret.files.length; i++) {
              let file = ret.files[i];
              $('.add-photos').before(dotList([file]));
            }
          }
        }, function(err) {
          $._toast.fail({title: err.message, duration: 2000});
        }, {filter: 'image', multiple: true, maximum: leftPicnum, system: false});
        break;
    }
  });
});
$('#photos').on('tap', '.delete-btn', function(e) {
  event.stopPropagation();
  $.byId('photos').removeChild(this.parentNode);
});
$('#photos').on('tap', 'img', function() {
  event.stopPropagation();
  window.plus.nativeUI.previewImage([this.src], {
    current: 0,
    loop: false,
    indicator: 'number'
  });
});
$('footer').on('tap', '.mui-btn', function(e) {
  addButton = this;

  let msg = $('#msg').val();
  photos = $.byId('photos').querySelectorAll('img');

  if (msg === '' && photos.length < 1) {
    dialog.alert({
      title: '提示',
      msg: '请写点什么吧...',
      buttons: ['确定']
    });
    return;
  }

  let datas = {};
  datas['submit'] = '1';
  datas['msg'] = msg.trim();

  let url = SITE_HOST.siteurl + 'index.php?moduleid=18&action=add&gid=86';
  $._toast.loading({title: '提交中...'});
  $(this).button('loading');
  $.post(url, datas, function(ret) {
    if (ret.status === 1) {
      if (photos.length > 0) {
        $.setClubid(ret.id);
        $._toast.updateTitle('开始上传图片...');
        for (let i = 0; i < photos.length; i++) {
          $.doUpload(photos[i].src);
        }
      } else {
        $._toast.hide();
        $.back2();
      }
    } else {
      $._toast.hide();
      $(addButton).button('reset');
      dialog.alert({
        title: '提示',
        msg: ret.msg,
        buttons: ['确定']
      });
    }
  });
});
