export let $ = window.mui;
export let viewEXT = process.env.viewEXT; // .htm .html
export let appName = process.env.appName; // student teacher
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

/**
 *  Immersed
 * @export
 */
export function setImmersedHeight (obj) {
  obj.style.paddingTop = $.immersed + 'px';
}
/**
 * 年龄计算,精确到岁\月\小时
 * getAge("1980-03-22 10:1:2", "1982-03-22 10:1:2")
 *
 * @export
 * @param {*} beginStr
 * @param {*} endStr
 * @returns
 */
export function getAge(beginStr, endStr) {
  var reg = new RegExp(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})(\s)(\d{1,2})(:)(\d{1,2})(:{0,1})(\d{0,2})$/);
  var beginArr = beginStr.match(reg);
  var endArr = endStr.match(reg);

  var days = 0;
  var month = 0;
  var year = 0;

  days = endArr[4] - beginArr[4];
  if (days < 0) {
    month = -1;
    days = 30 + days;
  }

  month = month + (endArr[3] - beginArr[3]);
  if (month < 0) {
    year = -1;
    month = 12 + month;
  }

  year = year + (endArr[1] - beginArr[1]);

  var yearString = year > 0 ? year + '岁' : '';
  var mnthString = month > 0 ? month + '月' : '';
  var dayString = days > 0 ? days + '天' : '';

  return yearString + mnthString + dayString;

  /*
  // 1 如果岁 大于等于1 那么年龄取 几岁 2 如果 岁等于0 但是月大于1 那么如果天等于0天小于3天 取小时
  // 例如出生2天 就取 48小时
  var result = '';
  if (year >= 1) {
    result = yearString + mnthString;
    if(days > 0) result += dayString;
  } else {
    if (month >= 1) {
      result = days > 0 ? mnthString + dayString : mnthString;
    } else {
      var begDate = new Date(beginArr[1], beginArr[3] - 1,
        beginArr[4], beginArr[6], beginArr[8], beginArr[10]);
      var endDate = new Date(endArr[1], endArr[3] - 1, endArr[4],
        endArr[6], endArr[8], endArr[10]);

      var between = (endDate.getTime() - begDate.getTime()) / 1000;
      days = Math.floor(between / (24 * 3600));
      var hours = Math.floor(between / 3600 - (days * 24));
      dayString = days > 0 ? days + '天' : '';
      result = days >= 3 ? dayString : days * 24 + hours + '小时';
    }
  }

  return result;
  */
}