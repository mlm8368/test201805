import { $, viewEXT, setImmersedHeight } from '../../../common/js/global.js';

import util from './util';

$.plusReady(function() {
  util.options.subpages = ['../video/list' + viewEXT, '../news/main' + viewEXT, '../club/list' + viewEXT, '../my/index' + viewEXT];
  util.initSubpage({});

  let nview = window.plus.nativeObj.View.getViewById('tabBar'),
    activePage = window.plus.webview.currentWebview(),
    targetPage,
    subpages = util.options.subpages;
});