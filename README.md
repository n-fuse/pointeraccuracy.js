pointeraccuracy.js v0.9.2
==============

Heuristically determine the pointer accuracy &mdash; 'coarse' or 'fine' &mdash; for a device/ user agent.

# Motivation
The 'pointer' media query as defined in level 4 (http://dev.w3.org/csswg/mediaqueries4/#pointer) can provide a valuable indication 
for responsive decision making for rendering of input widgets but also content in general. 
For example a date picker widget might be rendered in a touch _or_ mouse/ stylus optimized way.
Because the W3C recommendation is currently in draft status, and browser
support is naturally low we've created this library.

# Heuristic
The classifier uses the following four properties of the current device to make a decision:

* Pointer media query result 
* Touch input capability

Some of these properties cannot reliably determined &mdash; "best effort" is the right way to deal with this.

The algorithm then is:

1.	If the pointer media query is supported, and the result is not 'none', use it
2.	If the device supports touch input, use 'coarse'
3. 	Otherwise, use 'fine'

# Usage
See demo (http://n-fuse.github.com/pointeraccuracy.js/demo.html)

## Dependencies
* ES5 `Object.create()` polyfill must exist for older browsers.
* `window.matchMedia` polyfill must exist for older browsers.

## License
[MIT License] (LICENSE.txt)
