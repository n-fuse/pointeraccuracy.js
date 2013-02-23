/**
 * pointeraccuracy.js: Heuristically determine the pointer accuracy -- 'coarse' or 'fine' -- for a device/ user agent.
 * 
 * If rendering for a component, widget etc. should be depending on the accuracy of the pointing device,
 * the level 4 media query '@media (pointer:coarse)' is handy.
 * Browser support is low for this MQ but this classifier allows you to still get the desired information.
 * It resembles this media query heuristically based on the following properties:
 * - Pointer media query result (if available)
 * - Screen resolution
 * - Device pixel ratio
 * - Touch capability
 * 
 * @copyright n-fuse GmbH [All rights reserved]
 * @version 0.1.0
 * @license pointeraccuracy.js is (c) 2013 n-fuse GmbH [All rights reserved] and licensed under the MIT license.
 */

"use strict";

var Pointeraccuracy = {
		listener: null,
		resolution: null,
		pointerModeNative: null,
		pointerMode: null,
		init: function(cb) {
			var thiz = this;
			thiz.listener = cb;
			
			// Find out whether the browser supports the pointer mode media query and if so, get it
			if (window.matchMedia('(pointer:fine)').matches) {
				thiz.pointerModeNative = 'fine'; // mouse, stylus, ...
			} else if (window.matchMedia('(pointer:coarse)').matches) {
				thiz.pointerModeNative = 'coarse'; // touch screen
			}

			alert('NATIVE:' + thiz.pointerModeNative);

			// The viewport size may change in a desktop environment, therefore we need to listen to changes.
			window.onresize = function(e) {
				thiz.classifyScreenSize();
				thiz.classify();
			};
			// Initial classification		
			thiz.classifyScreenSize();
			thiz.classify();
		},
		
		// The classifier returns either 'fine' or 'coarse' 
		// thus canceling out 'none' and preventing 'undefined' which are useless in many cases.
		classify: function() {
			var thiz = this;
			var mode;
			if (thiz.pointerModeNative !== null) { // If pointer MQ is supported, just use its result
				mode = pointerModeNative;
			} else {
				if (thiz.hasDoubleDevicePixelRatio()) { // Screens with DPR = 2 can these days only be found on small-medium screen touch devices 
					mode = 'coarse';
				} else {
					if (thiz.resolution === 'small') { // Small screens 
						mode = 'coarse';
					} else if (thiz.resolution === 'medium') {
						if (thiz.hasTouchSupport()) {
							mode = 'coarse';
						} else {
							mode = 'fine';
						}
					} else { // Large resolutions
						mode = 'fine';
					}
				}
			}
			thiz.setPointerMode(mode);
		},
		
		classifyScreenSize: function() {
			var thiz = this;
			if (window.matchMedia('screen and (max-width: 1023px)').matches) {
				thiz.resolution = 'small';
			} else if (window.matchMedia('screen and (min-width: 1024px) and (max-width: 1280px)').matches) {
				thiz.resolution = 'medium';
			} else if (window.matchMedia('screen and (min-width: 1281px)').matches) {
				thiz.resolution = 'large';
			}			
		},
		
		setListener: function(cb) {
			var thiz = this;
			thiz.listener = cb;
		},
		
		setPointerMode: function(mode) {
			var thiz = this;
			if (thiz.pointerMode !== mode) {
				thiz.pointerMode = mode;
				if (typeof(thiz.listener) === 'function') {
					thiz.listener(mode);
				}
			}
			console.log('Using pointer mode: ' + mode);
		},
		
		getPointerMode: function() {
			return thiz.pointerMode;
		},
		
		hasTouchSupport: function() {
			return !!('ontouchstart' in window) // works on most browsers
				|| !!('onmsgesturechange' in window); // works on IE10
		},
		
		hasDoubleDevicePixelRatio: function() {
			var retVal = false;
			if (window.matchMedia('screen and (-webkit-min-device-pixel-ratio: 2)').matches ||
				window.matchMedia('screen and (min-device-pixel-ratio: 2)').matches ||
				window.matchMedia('screen and (min-resolution: 2dppx)').matches ||
				window.matchMedia('screen and (-o-min-device-pixel-ratio: 2/1)').matches) {
				retVal = true;
			}
			return retVal;
		},

		isPointerFine: function() {
			return this.pointerMode === 'fine';
		},

		isPointerCoarse: function() {
			return this.pointerMode === 'coarse';
		}
};
