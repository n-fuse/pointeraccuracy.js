/**
 * pointeraccuracy.js: Heuristically determine the pointer accuracy 
 * -- 'coarse' or 'fine' -- for a device/ user agent.
 * 
 * If rendering for a component, widget etc. should be depending on the accuracy
 * of the pointing device, the level 4 media query '@media (pointer:coarse)' is
 * handy. Browser support is low for this MQ but this classifier allows you to
 * still get the desired information. It resembles this media query
 * heuristically based on the following properties: 
 * - Pointer media query result (if available)
 * - Touch capability
 * 
 * @copyright n-fuse GmbH [All rights reserved]
 * @version 0.9.2
 * @license pointeraccuracy.js is (c) 2013 n-fuse GmbH [All rights reserved] and
 *          licensed under the MIT license.
 */
var Pointeraccuracy = {
  listener: null,
  pointerModeNative: null,
  pointerMode: null,

  init: function() {
    var thiz = this;

    // Find out whether the browser supports the pointer mode media query 
    // and if so, execute it
    if (window.matchMedia('(pointer:fine)').matches) {
      thiz.pointerModeNative = 'fine'; // mouse, stylus, ...
    } else if (window.matchMedia('(pointer:coarse)').matches) {
      thiz.pointerModeNative = 'coarse'; // touch screen
    }

    // Initial classification
    thiz.classify();
  },

  // The classifier returns either 'fine' or 'coarse'
  // thus cancelling out 'none' and preventing 'undefined' which are useless in
  // most cases.
  classify: function() {
    var thiz = this;
    var mode;
    if (thiz.pointerModeNative !== null) { // If pointer MQ is supported, just
                                           // use its result
      mode = thiz.pointerModeNative;
    } else {
      if (thiz.hasTouchSupport()) {
        mode = 'coarse';
      } else {
        mode = 'fine';
      }
    }
    thiz.setPointerMode(mode);
  },

  setModeListener: function(cb) {
    var thiz = this;
    thiz.listener = cb;
  },

  setPointerMode: function(mode) {
    var thiz = this;
    if (thiz.pointerMode !== mode) {
      thiz.pointerMode = mode;
      if (typeof (thiz.listener) === 'function') {
        thiz.listener(mode);
      }
    }
  },

  getPointerMode: function() {
    return this.pointerMode;
  },

  hasTouchSupport: function() {
    return !!('ontouchstart' in window) // works on most browsers
        || !!('onmsgesturechange' in window); // works on IE10
  },

  isPointerFine: function() {
    return this.pointerMode === 'fine';
  },

  isPointerCoarse: function() {
    return this.pointerMode === 'coarse';
  }
};
