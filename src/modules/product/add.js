import 'common/sass/mui.init.scss';
import 'common/sass/mui.button.loading.scss';
import './add/style.scss';

import 'common/js/mui.init';
import 'mui/js/mui.back.5+';
import './add/muiready';
import './add/plusready';

import 'mui/js/mui.button';

import 'mui/js/mui.class';
import 'plugin/muipicker/mui.picker';
import 'plugin/muipicker/mui.poppicker';

import {SITE_HOST} from 'common/js/config';
import {doCompressImage} from 'common/js/global';
import categ from 'common/json/categs.json';

import AuiDialog from 'plugin/aui/dialog';

import dotPhotos from './add/photos.dot';

let $ = window.mui;
let viewEXT = window.viewEXT;
let addButton = null;
let delPics = [];
let dialog = new AuiDialog();

window.compressImage = function(imgObj) {
  imgObj.removeAttribute('onload');
  doCompressImage(imgObj);
};

$.doAfterSubmit = function() {
  if (delPics.length > 0) {
    let url = SITE_HOST.siteurl + 'index.php?action=bcebosFile';
    $.post(url, {urls: delPics.join('|')}, function(ret) {
      delPics = [];
    });
  }
};

// tap
$('.photos').on('tap', '.add-btn', function() {
  event.stopPropagation();
  let that = $(this).closest('.aui-col-xs-4');
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
        $._toast.loading({title: '提交中...'});
        let cmr = window.plus.camera.getCamera();
        cmr.captureImage(function(path) {
          window.plus.gallery.save(path, function(ret) {
            that.innerHTML = dotPhotos({type: 'addpic', url: ret.file});
            that.classList.remove('add-photos');
            that.classList.add('image-item');
            $._toast.hide();
          }, function(err) {
            $._toast.fail({title: err.message, duration: 2000});
          });
        }, function(err) {
          $._toast.fail({title: err.message, duration: 2000});
        }, {filename: '_doc/gallery/'});
        break;
      case 2:
        $._toast.loading({title: '提交中...'});
        window.plus.gallery.pick(function(file) {
          that.innerHTML = dotPhotos({type: 'addpic', url: file});
          that.classList.remove('add-photos');
          that.classList.add('image-item');
          $._toast.hide();
        }, function(err) {
          $._toast.fail({title: err.message, duration: 2000});
        }, {filter: 'image'});
        break;
    }
  });
});
$('.photos').on('tap', '.delete-btn', function() {
  event.stopPropagation();
  let that = this;
  dialog.alert({
    title: '提示',
    msg: '确认要删除吗？',
    buttons: ['取消', '确定']
  }, function(ret) {
    if (ret.buttonIndex === 2) {
      let imageitemDiv = $(that).closest('.image-item');
      let imgSrc = imageitemDiv.querySelector('img').src;
      if (imgSrc.indexOf('http') === 0) delPics.push(imgSrc);
      imageitemDiv.innerHTML = dotPhotos({type: 'delpic'});
      imageitemDiv.classList.remove('image-item');
      imageitemDiv.classList.add('add-photos');
    }
  });
});
$('.photos').on('tap', 'img', function() {
  event.stopPropagation();
  window.plus.nativeUI.previewImage([this.src], {
    current: 0,
    loop: false,
    indicator: 'number'
  });
});

// picker
let categPicker = new $.PopPicker({layer: 2});
let categData = [];
for (let k1 in categ) {
  if (k1 === '1' || k1 === '4' || k1 === '5') {
    let one = categ[k1];
    one['value'] = k1;
    one['text'] = one.title;
    one['children'] = [];
    one.nodes.forEach(function(item) {
      one.children.push({value: item.id, text: item.title});
    });
    categData.push(one);
  }
}
categPicker.setData(categData);
$('#categDiv').addEventListener('tap', function(e) {
  categPicker.show(function(items) {
    $.byId('categ').value = items[1].text;
    $.byId('categ').dataset.catid = items[1].value;
    $.byId('categ').dataset.bigcatid = items[0].value;
  });
});
let genderPicker = new $.PopPicker();
genderPicker.setData(JSON.parse('[{"value":"1","text":"公狗"},{"value":"2","text":"母狗"},{"value":"3","text":"公母全有"}]'));
$('#genderDiv').addEventListener('tap', function(e) {
  genderPicker.show(function(items) {
    $.byId('gender').value = items[0].text;
    $.byId('gender').dataset.dogsexid = items[0].value;
  });
});
let agePicker = new $.PopPicker();
let ageData = '[{"value":"1","text":"一个月"},{"value":"2","text":"二个月"},{"value":"3","text":"三个月"},' +
  '{"value":"4","text":"四个月"},{"value":"5","text":"五个月"},{"value":"6","text":"六个月"},' +
  '{"value":"7","text":"七个月"},{"value":"8","text":"八个月"},{"value":"9","text":"九个月"},' +
  '{"value":"10","text":"十个月"},{"value":"11","text":"十一个月"},' +
  '{"value":"12","text":"一年多"},{"value":"13","text":"二年多"},{"value":"14","text":"三年以上"}]';
agePicker.setData(JSON.parse(ageData));
$('#ageDiv').addEventListener('tap', function(e) {
  agePicker.show(function(items) {
    $.byId('age').value = items[0].text;
    $.byId('age').dataset.dogageid = items[0].value;
  });
});
let url = SITE_HOST.siteurl + 'index.php?moduleid=2&action=submitprompt&op=totime';
$.get(url, function(ret) {
  if (ret.status === 1) {
    if ($.getStorage('groupId') > 5) {
      let totimePicker = new $.PopPicker();
      totimePicker.setData(ret.totimeData);
      $('#totimeDiv').addEventListener('tap', function(e) {
        totimePicker.show(function(items) {
          $.byId('totime').value = items[0].text + '[至' + items[0].value + ']';
          $.byId('totime').dataset.totime = items[0].value;
        });
      });
    } else {
      $('#totimeDiv').addEventListener('tap', function(e) {
        dialog.alert({title: '提示', msg: '个人会员暂不支持更改过期时间', buttons: ['确定']});
      });
    }
    // init data
    $.byId('totime').value = ret.initData.text + '[至' + ret.initData.value + ']';
    $.byId('totime').dataset.totime = ret.initData.value;
  }
});
$('footer').on('tap', '.mui-btn', function(e) {
  addButton = this;
  let op = 'edit';

  let sellData = {};
  sellData['title'] = $.byId('title').value.trim();
  sellData['content'] = $.byId('content').value.trim();
  sellData['catid'] = $.byId('categ').dataset.catid;
  sellData['post_fields[dogsexid]'] = $.byId('gender').dataset.dogsexid;
  sellData['post_fields[dogageid]'] = $.byId('age').dataset.dogageid;
  sellData['post_fields[bigcatid]'] = $.byId('categ').dataset.bigcatid;
  sellData['price'] = $.byId('price').value;
  sellData['totime'] = $.byId('totime').dataset.totime;
  if ($.itemid === 0) {
    op = 'add';
    sellData['typeid'] = 0;
    sellData['ismember'] = 1;
    sellData['unit'] = '只';
    sellData['username'] = $.getStorage('userInfo').username;
  }

  if (sellData['title'] === '') {
    dialog.alert({
      title: '提示',
      msg: '请填写标题...',
      buttons: ['确定']
    });
    return;
  }

  if (sellData['catid'] === '0') {
    dialog.alert({
      title: '提示',
      msg: '请选择犬种...',
      buttons: ['确定']
    });
    return;
  }

  if (sellData['price'] < 1) {
    dialog.alert({
      title: '提示',
      msg: '请填写价格...',
      buttons: ['确定']
    });
    return;
  }

  let url = SITE_HOST.siteurl + 'index.php?moduleid=2&action=my&mid=5&op=' + op + '&itemid=' + $.itemid;
  $._toast.loading({title: '提交中...'});
  $(this).button('loading');
  $.post(url, sellData, function(ret) {
    if (ret.status === 1) {
      if (ret.itemid) $.itemid = ret.itemid;

      let photos = $.byId('photos').querySelectorAll('img[src^="file"]');
      if (photos.length > 0) {
        $(addButton).button('reset');
        $._toast.updateTitle('开始上传图片...');
        for (let i = 0; i < photos.length; i++) {
          $.doUpload(photos[i]);
        }
      } else {
        $.doAfterSubmit();
        $._toast.success({title: '提交成功', duration: 2000});
        $(addButton).button('reset');
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
$('#contact > li.aui-list-header').on('tap', 'b', function() {
  $.openWindow({
    id: 'my_personinfo',
    url: '../my/personinfo' + viewEXT,
    styles: {
      backButtonAutoControl: 'close',
      bounce: 'none',
      bounceBackground: '#1E90FF',
      titleNView: {
        titleText: '个人信息',
        titleColor: '#EE2C2C',
        titleSize: '17px',
        backgroundColor: '#FFFFFF',
        autoBackButton: true,
        progress: {
          color: '#00FF00',
          height: '2px'
        },
        splitLine: {
          color: '#CCCCCC',
          height: '1px'
        }
      }
    },
    extras: {
      from: 'sell_add'
    }
  });
});
// fire customEvent
document.addEventListener('showContact', function(event) {
  $.showContact();
});