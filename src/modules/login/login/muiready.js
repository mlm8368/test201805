// import {SITE_HOST} from 'common/js/config';

import { $, viewEXT, setImmersedHeight } from '../../../common/js/global.js';

$.init({
  gestureConfig: {
    tap: true,
    doubletap: false,
    longtap: false,
    hold: false,
    flick: false,
    swipe: false,
    drag: false,
    pinch: false
  }
});

$.ready(function() {
  $.immersed = setImmersedHeight($.byId('header'));
  if (viewEXT === '.htm') return;
  $.noop();
});