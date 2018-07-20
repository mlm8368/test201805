import 'mui/js/mui.detect';
import 'mui/js/mui.detect.5+';
import 'mui/js/mui.event';
import 'mui/js/mui.fixed';
import 'mui/js/mui.fixed.bind';
import 'mui/js/mui.fixed.classlist';
import 'mui/js/mui.fixed.animation';
import 'mui/js/mui.namespace';
import 'mui/js/mui.gestures';
import 'mui/js/mui.gestures.tap';
import 'mui/js/mui.gestures.swipe';
import 'mui/js/mui.init';
import 'mui/js/mui.init.5+';
import 'mui/js/mui.ajax';
import 'mui/js/mui.ajax.5+';
import 'mui/js/mui.dialog.toast';
import 'mui/js/mui.back';
import 'mui/js/mui.back.5+';

(function ($) {
  $.nowtime = new Date().getTime();
  $.immersed = 0;
  $.plus = null;
  $.ready(function () {
    let ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
    if (ms && ms.length >= 3) { // 当前环境为沉浸式状态栏模式
      $.immersed = parseFloat(ms[2]); // 获取状态栏的高度
    }
  });
  $.plusReady(function () {
    $.plus = window.plus;
  });
  // 返回bug
  $.targets = {};
  $.targets._popover = null;
  $.closePopup = $.noop;
  // ajax
  $.accessToken = function () {
    let accessToken = localStorage['accessToken'];
    if (accessToken) accessToken = accessToken.slice(4);
    return accessToken;
  };
  $.ajaxSettings.timeout = 120000;
  // $.ajaxSettings.crossDomain = true;
  $.ajaxSettings.headers = { 'APPACCTOKEN': '' };
  $.ajaxSettings.error = function (xhr, type, errorThrown) {
    $.log('ajax err...');
  };
  // function
  $.isLogin = function () {
    let userId = localStorage['userId'];
    if (userId) return userId;
    return 0;
  };
  $.createMask = function (callback) {
    let element = document.createElement('div');
    element.classList.add($.className('backdrop'));
    element.addEventListener($.EVENT_MOVE, $.preventDefault);
    element.addEventListener('tap', function () {
      mask.close();
    });
    let mask = [element];
    mask._show = false;
    mask.show = function () {
      mask._show = true;
      element.setAttribute('style', 'opacity:1');
      document.body.appendChild(element);
      return mask;
    };
    mask._remove = function () {
      if (mask._show) {
        mask._show = false;
        element.setAttribute('style', 'opacity:0');
        $.later(function () {
          let body = document.body;
          element.parentNode === body && body.removeChild(element);
        }, 350);
      }
      return mask;
    };
    mask.close = function () {
      if (callback) {
        if (callback() !== false) {
          mask._remove();
        }
      } else {
        mask._remove();
      }
    };
    return mask;
  };
  // 扩展
  $.log = function (str) {
    let myarraylist = str;
    if (typeof str === 'object') {
      if ($.isArray(str)) {
        let index;
        let json = {};
        for (index in myarraylist) {
          json[index] = myarraylist[index];
        }
        str = JSON.stringify(json);
      } else {
        str = JSON.stringify(str);
      }
    }
    console.log(str);
  };
  // 扩展
  $.isElement = function (obj) {
    return !!(obj && obj.nodeType === 1);
  };
  $.byId = function (id) {
    return document.getElementById(id);
  };
  $.fn.addEventListener = function (name, fn, useCapture) {
    useCapture = useCapture || false;
    this.each(function (i, el) {
      if (el.addEventListener) {
        el.addEventListener(name, fn, useCapture);
      }
    });
  };
  $.fn.removeEventListener = function (name, fn, useCapture) {
    useCapture = useCapture || false;
    this.each(function (i, el) {
      if (el.removeEventListener) {
        el.removeEventListener(name, fn, useCapture);
      }
    });
  };
  $.fn.remove = function () {
    let el = this[0];
    if (!$.isElement(el)) {
      return false;
    }
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  };
  $.fn.attr = function (name, value) {
    if (arguments.length === 2) return;
    let el = this[0];
    if (!$.isElement(el)) {
      return false;
    }
    if (arguments.length === 1) {
      return el.getAttribute(name);
    } else {
      el.setAttribute(name, value);
    }
  };
  $.fn.removeAttr = function (name) {
    let el = this[0];
    if (!$.isElement(el)) {
      return false;
    }
    if (el.removeAttribute) {
      el.removeAttribute(name);
    }
  };
  $.fn.val = function (val) {
    if (arguments.length === 0) return;
    let el = this[0];
    if (!$.isElement(el)) {
      return false;
    }
    if (arguments.length === 0) {
      switch (el.tagName) {
        case 'SELECT':
          let value = el.options[el.selectedIndex].value;
          return value;
        case 'INPUT':
          return el.value;
        case 'TEXTAREA':
          return el.value;
      }
    } else if (arguments.length === 1) {
      switch (el.tagName) {
        case 'SELECT':
          el.options[el.selectedIndex].value = val;
          break;
        case 'INPUT':
          el.value = val;
          break;
        case 'TEXTAREA':
          el.value = val;
          break;
      }
    }
  };
  $.fn.prepend = function (html) {
    let el = this[0];
    if (!$.isElement(el)) {
      return false;
    }
    el.insertAdjacentHTML('afterbegin', html);
  };
  $.fn.append = function (html) {
    let el = this[0];
    if (!$.isElement(el)) {
      return false;
    }
    el.insertAdjacentHTML('beforeend', html);
  };
  $.fn.before = function (html) {
    let el = this[0];
    if (!$.isElement(el)) {
      return false;
    }
    el.insertAdjacentHTML('beforebegin', html);
  };
  $.fn.after = function (html) {
    let el = this[0];
    if (!$.isElement(el)) {
      return false;
    }
    el.insertAdjacentHTML('afterend', html);
  };
  $.fn.html = function (html) {
    let el = this[0];
    if (!$.isElement(el)) {
      return false;
    }
    if (arguments.length === 0) {
      return el.innerHTML;
    } else if (arguments.length === 1) {
      el.innerHTML = html;
    }
  };
  $.fn.text = function (txt) {
    let el = this[0];
    if (!$.isElement(el)) {
      return false;
    }
    if (arguments.length === 0) {
      return el.textContent;
    } else if (arguments.length === 1) {
      el.textContent = txt;
    }
  };
  $.fn.offset = function () {
    let el = this[0];
    if (!$.isElement(el)) {
      return false;
    }
    let sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
    let st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let rect = el.getBoundingClientRect();
    return {
      l: rect.left + sl,
      t: rect.top + st,
      w: el.offsetWidth,
      h: el.offsetHeight
    };
  };
})(window.mui);
