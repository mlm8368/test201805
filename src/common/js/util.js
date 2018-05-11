var mui = window.mui;
var viewEXT = window.viewEXT;
var bitmapRight = null;
var util = {
  options: {
    tabBarId: 'tabBar',
    ACTIVE_COLOR: '#007aff',
    NORMAL_COLOR: '#000',
    subpages: ['../video/list' + viewEXT, '../news/main' + viewEXT, '../club/list' + viewEXT, '../my/index' + viewEXT]
  },
  /**
   * 初始化首个tab窗口 和 创建子webview窗口
   */
  initSubpage: function(aniShow) {
    var subpageStyle = {
        top: 0,
        bottom: 50,
        bounce: 'none',
        bounceBackground: '#1E90FF'
      },
      subpages = util.options.subpages,
      self = window.plus.webview.currentWebview(),
      temp = {};

    // 兼容安卓上添加titleNView 和 设置沉浸式模式会遮盖子webview内容
    if (mui.os.android) {
      if (window.plus.navigator.isImmersedStatusbar()) {
        subpageStyle.top += window.plus.navigator.getStatusbarHeight();
      }
      if (self.getTitleNView()) {
        subpageStyle.top += 40;
      }
    }

    // 初始化第一个tab项为首次显示
    temp[self.id] = 'true';
    mui.extend(aniShow, temp);
    // 初始化绘制首个tab按钮
    util.toggleNview(0);
    for (var i = 0, len = subpages.length; i < len; i++) {
      if (!window.plus.webview.getWebviewById(subpages[i])) {
        var sub = window.plus.webview.create(subpages[i], subpages[i], subpageStyle);
        // 初始化隐藏
        sub.hide();
        // append到当前父webview
        self.append(sub);
      }
    }
  },
  /**
   * 点击切换tab窗口
   */
  changeSubpage: function(targetPage, activePage, aniShow) {
    // 若为iOS平台或非首次显示，则直接显示
    if (mui.os.ios || aniShow[targetPage]) {
      window.plus.webview.show(targetPage);
    } else {
      // 否则，使用fade-in动画，且保存变量
      var temp = {};
      temp[targetPage] = 'true';
      mui.extend(aniShow, temp);
      window.plus.webview.show(targetPage, 'fade-in', 300);
    }
    // 隐藏当前 除了第一个父窗口
    if (activePage !== window.plus.webview.getLaunchWebview()) {
      window.plus.webview.hide(activePage);
    }
  },
  /**
   * 点击重绘底部tab （view控件）
   */
  toggleNview: function(currIndex) {
    currIndex = currIndex * 2;
    // 重绘当前tag 包括icon和text，所以执行两个重绘操作
    util.updateSubNView(currIndex, util.options.ACTIVE_COLOR);
    util.updateSubNView(currIndex + 1, util.options.ACTIVE_COLOR);
    // 重绘兄弟tag 反之排除当前点击的icon和text
    for (var i = 0; i < 10; i++) {
      if (i !== currIndex && i !== currIndex + 1) {
        util.updateSubNView(i, util.options.NORMAL_COLOR);
      }
    }
  },
  /*
   * 改变颜色
   */
  changeColor: function(obj, color) {
    obj.color = color;
    return obj;
  },
  /*
   * 利用 window.plus.nativeObj.View 提供的 drawText 方法更新 view 控件
   */
  updateSubNView: function(currIndex, color) {
    var self = window.plus.webview.currentWebview(),
      nviewEvent = window.plus.nativeObj.View.getViewById(util.options.tabBarId), // 获取nview控件对象
      nviewObj = self.getStyle().subNViews[0], // 获取nview对象的属性
      currTag = nviewObj.tags[currIndex]; // 获取当前需重绘的tag

    nviewEvent.drawText(currTag.text, currTag.position, util.changeColor(currTag.textStyles, color), currTag.id);
  },
  /**
   * 更新 titleView 控件
   */
  updateTitleNView: function(nviewTitle, currIndex) {
    if (bitmapRight === null) bitmapRight = new window.plus.nativeObj.Bitmap('bitmapRight');
    if (currIndex === 1) {
      bitmapRight.loadBase64Data('data:image/png;base64,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');
      nviewTitle.drawBitmap(bitmapRight, {top: '0px', left: '0px', width: '100%', height: '100%'}, {top: '10px', right: '10px', width: '24px', height: '24px'}, 'club');
    } else if (currIndex === 3) {
      bitmapRight.loadBase64Data('data:image/png;base64,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');
      nviewTitle.drawBitmap(bitmapRight, {top: '0px', left: '0px', width: '100%', height: '100%'}, {top: '10px', right: '10px', width: '24px', height: '24px'}, 'club');
    } else {
      nviewTitle.drawBitmap(bitmapRight, {top: '0px', left: '0px', width: '0px', height: '0px'}, {top: '10px', right: '10px', width: '24px', height: '24px'}, 'club');
    }
  },
  /**
   * 获取当前点击的tab
   */
  getCurrIndex: function(pageW, clientX) {
    let currIndex = 0;
    if (clientX > 0 && clientX <= parseInt(pageW * 0.20)) {
      currIndex = 0;
    } else if (clientX > parseInt(pageW * 0.20) && clientX <= parseInt(pageW * 0.40)) {
      currIndex = 1;
    } else if (clientX > parseInt(pageW * 0.40) && clientX <= parseInt(pageW * 0.60)) {
      currIndex = 2;
    } else if (clientX > parseInt(pageW * 0.60) && clientX <= parseInt(pageW * 0.80)) {
      currIndex = 3;
    } else {
      currIndex = 4;
    }
    return currIndex;
  }
};
export default util;