import { $, viewEXT } from '../../../common/js/global.js';

import { barTagsStudent } from './config.js';

$.goPortal = function(type) {
  // student
  let subNViews = [{
    'id': 'tabBarStudent',
    'styles': {
      'bottom': '0px',
      'left': '0px',
      'height': '50px',
      'width': '100%',
      'backgroundColor': '#fff'
    },
    'tags': barTagsStudent
  }];
  $.openWindow({
    id: 'sbaobao_index',
    url: '../sbaobao/index' + viewEXT,
    styles: {
      backButtonAutoControl: 'quit',
      subNViews: subNViews
    }
  });
};

$.plusReady(function() {
  $.noop();
});