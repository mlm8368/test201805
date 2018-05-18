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
import 'mui/js/mui.init';
import 'mui/js/mui.init.5+';
import 'mui/js/mui.ajax';
import 'mui/js/mui.ajax.5+';
import 'mui/js/mui.dialog.toast';

(function($) {
  $.init({
    swipeBack: false,
    keyEventBind: { backbutton: true, menubutton: false },
    gestureConfig: { tap: true, doubletap: false, longtap: false, hold: false, flick: false, swipe: false, drag: false, pinch: false }
  });
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
  // 返回函数
  $.addBack = function(back) {
    return $.addAction('backs', back);
  };
  $.back = function() {
    if (typeof $.options.beforeback === 'function') {
      if ($.options.beforeback() === false) {
        return;
      }
    }
    $.doAction('backs');
  };
  // 返回bug
  $.targets = {};
  $.targets._popover = null;
  $.closePopup = $.noop;
  $.createMask = function(callback) {
		var element = document.createElement('div');
		element.classList.add(CLASS_BACKDROP);
		element.addEventListener($.EVENT_MOVE, $.preventDefault);
		element.addEventListener('tap', function() {
			mask.close();
		});
		var mask = [element];
		mask._show = false;
		mask.show = function() {
			mask._show = true;
			element.setAttribute('style', 'opacity:1');
			document.body.appendChild(element);
			return mask;
		};
		mask._remove = function() {
			if (mask._show) {
				mask._show = false;
				element.setAttribute('style', 'opacity:0');
				$.later(function() {
					var body = document.body;
					element.parentNode === body && body.removeChild(element);
				}, 350);
			}
			return mask;
		};
		mask.close = function() {
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
  $.log = function(str) {
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
  $.jsonToStr = function(json) {
    if (typeof json === 'object') {
      return JSON && JSON.stringify(json);
    }
  };
  $.strToJson = function(str) {
    if (typeof str === 'string') {
      return JSON && JSON.parse(str);
    }
  };
  $.setStorage = function(key, value) {
    if (typeof value === 'object') {
      if (value === null) {
        value = 'objnull-null';
      } else {
        value = JSON.stringify(value);
        value = 'obj-' + value;
      }
    } else if (typeof value === 'number') {
      value = 'num-' + value;
    } else if (typeof value === 'boolean') {
      if (value === false) value = 0;
      else value = 1;
      value = 'bool-' + value;
    } else {
      value = 'str-' + value;
    }
    localStorage[key] = value;
  };
  $.getStorage = function(key) {
    let v = localStorage[key];
    // $.log(key + '+++----------' + v);
    if (!v) return null;
    if (v.indexOf('obj-') === 0) {
      v = v.slice(4);
      return JSON.parse(v);
    } else if (v.indexOf('str-') === 0) {
      return v.slice(4);
    } else if (v.indexOf('num-') === 0) {
      return Number(v.slice(4));
    } else if (v.indexOf('bool-') === 0) {
      return Boolean(v.slice(5));
    } else if (v.indexOf('objnull-') === 0) {
      return null;
    }
  };
  $.rmStorage = function(key) {
    delete localStorage[key];
  };
  // ajax
  $.ajaxSettings.timeout = 120000;
  /*
  $.ajaxSettings.crossDomain = true;
  */
  $.ajaxSettings.headers = {
    'APPACCTOKEN': ''
  };
  $.ajaxSettings.error = function(xhr, type, errorThrown) {
    $.log('ajax err...');
  };
  // 扩展
  $.trim = function(str) {
    if (String.prototype.trim) {
      return str === null ? '' : String.prototype.trim.call(str);
    } else {
      return str.replace(/(^\s*)|(\s*$)/g, '');
    }
  };
  $.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };
  $.byId = function(id) {
    return document.getElementById(id);
  };
  $.fn.addEventListener = function(name, fn, useCapture) {
    useCapture = useCapture || false;
    this.each(function(i, el) {
      if (el.addEventListener) {
        el.addEventListener(name, fn, useCapture);
      }
    });
  };
  $.fn.removeEventListener = function(name, fn, useCapture) {
    useCapture = useCapture || false;
    this.each(function(i, el) {
      if (el.removeEventListener) {
        el.removeEventListener(name, fn, useCapture);
      }
    });
  };
  $.fn.remove = function() {
    if (window.viewEXT === '.htm') return;
    let el = this[0];
    if (!$.isElement(el)) {
      return false;
    }
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  };
  $.fn.attr = function(name, value) {
    if (window.viewEXT === '.htm' && arguments.length === 2) return;
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
  $.fn.removeAttr = function(name) {
    if (window.viewEXT === '.htm') return;
    let el = this[0];
    if (!$.isElement(el)) {
      return false;
    }
    if (el.removeAttribute) {
      el.removeAttribute(name);
    }
  };
  $.fn.val = function(val) {
    if (window.viewEXT === '.htm' && arguments.length === 0) return;
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
  $.fn.prepend = function(html) {
    if (window.viewEXT === '.htm') return;
    let el = this[0];
    if (!$.isElement(el)) {
      return false;
    }
    el.insertAdjacentHTML('afterbegin', html);
  };
  $.fn.append = function(html) {
    if (window.viewEXT === '.htm') return;
    let el = this[0];
    if (!$.isElement(el)) {
      return false;
    }
    el.insertAdjacentHTML('beforeend', html);
  };
  $.fn.before = function(html) {
    if (window.viewEXT === '.htm') return;
    let el = this[0];
    if (!$.isElement(el)) {
      return false;
    }
    el.insertAdjacentHTML('beforebegin', html);
  };
  $.fn.after = function(html) {
    if (window.viewEXT === '.htm') return;
    let el = this[0];
    if (!$.isElement(el)) {
      return false;
    }
    el.insertAdjacentHTML('afterend', html);
  };
  $.fn.html = function(html) {
    if (window.viewEXT === '.htm') return;
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
  $.fn.text = function(txt) {
    if (window.viewEXT === '.htm') return;
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
  $.fn.offset = function() {
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
  $.fn.closest = function(selector) {
    let el = this[0];
    let doms, targetDom;
    let isSame = function(doms, el) {
      let i = 0, len = doms.length;
      for (i; i < len; i++) {
        if (doms[i].isEqualNode(el)) {
          return doms[i];
        }
      }
      return false;
    };
    let traversal = function(el, selector) {
      doms = el.parentNode.querySelectorAll(selector);
      targetDom = isSame(doms, el);
      if (!targetDom) {
        el = el.parentNode;
        if (el != null && el.nodeType === el.DOCUMENT_NODE) {
          return false;
        }
        traversal(el, selector);
      }
      return targetDom;
    };
    return traversal(el, selector);
  };
  $.isLogin = function() {
    if ($.getStorage('userId') === null) return false;
    return true;
  };
})(window.mui);
