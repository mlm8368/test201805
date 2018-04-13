let $ = window.mui;
export function getFileExt(fileName) {
  return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
}

export function uuid(len, radix) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  let uuid = [],
    i;
  radix = radix || chars.length;
  if (radix > chars.length) radix = chars.length;

  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    let r;

    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}

export function doCompressImage(imgObj) {
  let url = imgObj.src;
  if (url.indexOf('file:') !== 0) return;
  let size = {
    width: imgObj.naturalWidth,
    height: imgObj.naturalHeight
  };
  if (size.width > 600) {
    size.width = '600px';
    size.height = 'auto';
  } else if (size.height > 600) {
    size.width = 'auto';
    size.height = '600px';
  } else {
    return;
  }

  window.plus.zip.compressImage({
    src: url,
    dst: '_documents/temp/' + Date.now() + '.' + getFileExt(url),
    overwrite: true,
    quality: 100,
    width: size.width,
    height: size.height
  }, function(event) {
    imgObj.src = event.target;
  }, function(err) {
    $._toast.fail({title: err.message, duration: 2000});
  });
}

export function doLogin(extras) {
  if (!extras) extras = {};
  $.openWindow({
    id: 'login_login',
    url: '_www/dist/login/login' + window.viewEXT,
    styles: {
      backButtonAutoControl: 'close',
      bounce: 'none',
      bounceBackground: '#1E90FF',
      titleNView: {
        titleText: '登录',
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
    extras: extras
  });
}