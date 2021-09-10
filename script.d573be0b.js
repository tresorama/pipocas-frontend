// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/frontend-utilities.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttle = throttle;
exports.debounce = debounce;

function throttle(func, delay) {
  var throttleTimer;

  var throttleFunction = function throttleFunction() {
    // If setTimeout is already scheduled, no need to do anything
    if (throttleTimer) {
      return;
    } // Schedule a setTimeout after delay seconds


    throttleTimer = setTimeout(function () {
      func();
      throttleTimer = null;
    }, delay);
  };

  return throttleFunction;
}

function debounce(func, delay) {
  var timerId; // Debounce function: Input as function which needs to be debounced and delay is the debounced time in milliseconds

  var debounceFunction = function debounceFunction() {
    // Cancels the setTimeout method execution
    clearTimeout(timerId); // Executes the func after delay time.

    timerId = setTimeout(func, delay);
  };

  return debounceFunction;
}
},{}],"js/ViewportDetailsBanner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*

How to import inside a codepen ?

Create a new Pen.
Go to settings => js => Add External Scripts/Pens

Paste this codepen link:
  https://codepen.io/tresorama/pen/KKmrMNz
  
Then in JS panel you can call :

ViewportDetailsBanner();

*/
function ViewportDetailsBanner() {
  // HOOK FOR STATE MANAGEMENT
  var fakeUseState = function fakeUseState(initialState) {
    var state = initialState;

    var setState = function setState(newState) {
      return new Promise(function (resolve, reject) {
        // update state
        state = newState; // resolve so subscribed tasks can be exexcuted

        resolve(state);
      });
    };

    var getState = function getState() {
      return state;
    };

    return [getState, setState];
  }; // EXTENSION - REAL TIME DEVICE NAME AND BACKGROUND


  function ViewportDetailsBanner_showRealTimeDeviceName() {
    // 1) business logic
    //  - empty!!
    // 2) view logic
    var className = "ViewportDetailsBanner-ext-realTimeDevice";
    var selector = ".".concat(className);
    var isVisibleClassName = "isVisible";

    var _fakeUseState = fakeUseState(false),
        _fakeUseState2 = _slicedToArray(_fakeUseState, 2),
        isVisible = _fakeUseState2[0],
        setIsVisible = _fakeUseState2[1]; //  - 2a - inject dom node into dom


    function injectDomNode() {
      var genColorScheme = function genColorScheme(_ref) {
        var hue = _ref.hue,
            _ref$sat = _ref.sat,
            sat = _ref$sat === void 0 ? 100 : _ref$sat;
        var hs = "".concat(hue, "deg, ").concat(sat, "%");
        return {
          10: "hsl(".concat(hs, ", 90%)"),
          20: "hsl(".concat(hs, ", 80%)"),
          30: "hsl(".concat(hs, ", 70%)"),
          40: "hsl(".concat(hs, ", 60%)"),
          50: "hsl(".concat(hs, ", 50%)"),
          60: "hsl(".concat(hs, ", 40%)"),
          70: "hsl(".concat(hs, ", 30%)"),
          80: "hsl(".concat(hs, ", 20%)"),
          90: "hsl(".concat(hs, ", 10%)")
        };
      };

      var col = {
        grey: genColorScheme({
          hue: 0,
          sat: 0
        }),
        orange: genColorScheme({
          hue: 30
        }),
        blue: genColorScheme({
          hue: 200
        })
      };

      var atMedia = function atMedia(breakpoint, content) {
        return "\n    @media (min-width: ".concat(breakpoint, "px) {\n      ").concat(selector, " {\n       ").concat(content, "\n      }\n    }\n    ");
      };

      var domNode = "\n  <div class=\"".concat(className, "\">\n    <div class=\"bg-layer\"></div>\n    <div class=\"details\">\n      <p><label></label></p>\n    </div>\n  </div>\n  <style>\n    ").concat(selector, " {\n      z-index: 2000;\n      position: fixed;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      pointer-events: none !important;\n    }\n    ").concat(selector, ":not(.").concat(isVisibleClassName, ") {\n        display: none;\n    }\n    ").concat(selector, " .bg-layer {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background-color: var(--bg, white);\n      opacity: 0.5;\n      background-blend-mode: overlay;\n    }\n    ").concat(selector, " .details label:after {\n      position: absolute;\n      top: 0;\n      right: 0;\n\n      background-color: black;\n      color: white;\n      padding: .5em 1em;\n      content: var(--label, \"Not Working\");\n    }\n\n    ").concat(atMedia(0, "--bg: white;--label:\"start\""), "\n    ").concat(atMedia(320, "--bg: ".concat(col.orange["10"], ";--label:\" 5/5s/SE\"")), "\n    ").concat(atMedia(360, "--bg: ".concat(col.orange["20"], ";--label:\"12Mini\"")), "\n    ").concat(atMedia(375, "--bg: ".concat(col.orange["30"], ";--label:\"6/7/8/X/11Pro/SE2020\"")), "\n    ").concat(atMedia(390, "--bg: ".concat(col.orange["40"], ";--label:\"12/12Pro\"")), "\n    ").concat(atMedia(414, "--bg: ".concat(col.orange["50"], ";--label:\"Plus/XR/11/11ProMax/XSMax\"")), "\n    ").concat(atMedia(428, "--bg: ".concat(col.orange["60"], ";--label:\"12ProMax\"")), "\n    ").concat(atMedia(768, "--bg: ".concat(col.blue["20"], ";--label:\"iPad-Mini\"")), "\n    ").concat(atMedia(810, "--bg: ".concat(col.blue["30"], ";--label:\"iPad-10.2\"")), "\n    ").concat(atMedia(820, "--bg: ".concat(col.blue["40"], ";--label:\"iPad-Air2020\"")), "\n    ").concat(atMedia(834, "--bg: ".concat(col.blue["50"], ";--label:\"iPad-Air-Pro11\"")), "\n    ").concat(atMedia(1024, "--bg: ".concat(col.blue["60"], ";--label:\"iPad-Pro12.9\"")), "\n    ").concat(atMedia(1280, "--bg: ".concat(col.grey["20"], ";--label:\"MacBook13\"")), "\n    ").concat(atMedia(1440, "--bg: ".concat(col.grey["40"], ";--label:\"MacBook15\"")), "\n    ").concat(atMedia(1536, "--bg: ".concat(col.blue["60"], ";--label:\"MacBook16\"")), "\n  \n  </style>\n  ");
      document.body.insertAdjacentHTML("beforeend", domNode);
    }

    injectDomNode();
    injectDomNode = null; // never recall
    //  - 2b - save el referernces

    var el = document.querySelector(selector); //  - 2c -visibility state

    function onVisibilityChange() {
      if (isVisible()) {
        el.classList.add(isVisibleClassName);
      } else {
        el.classList.remove(isVisibleClassName);
      }
    }

    function toggleVisibility() {
      setIsVisible(!isVisible()).then(onVisibilityChange);
    } // 3) first time only initialization


    onVisibilityChange(); // ensure view match initial state
    // 4) RETURN STUFF

    return {
      isVisible: isVisible,
      toggleVisibility: toggleVisibility
    };
  }

  var ext_realTimeDevice = ViewportDetailsBanner_showRealTimeDeviceName(); // MAIN COMPONENT

  function showViewportDetailsBanner() {
    var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    // 1) business logic
    function updateBannerData() {
      var width = window.innerWidth;
      var height = window.innerHeight;
      var ratio = width / height;
      var aspect_ratio = {
        base_2: ratio * 2,
        base_3: ratio * 3,
        base_4: ratio * 4,
        base_5: ratio * 5,
        base_6: ratio * 6,
        base_7: ratio * 7,
        base_8: ratio * 8,
        base_9: ratio * 9,
        base_10: ratio * 10,
        base_11: ratio * 11
      };
      updateView({
        width: width,
        height: height,
        ratio: ratio,
        aspect_ratio: aspect_ratio
      });
    } // 2) view logic
    //   - 2a - Inject dom node into dom


    function injectDomNode() {
      document.body.insertAdjacentHTML("beforeend", "\n    <div class=\"ViewportDetailsBanner value-to-left\">\n      <div class=\"left-side\">\n        <div class=\"details\">\n          <p><label>Width</label><span data-vdb-width></span></p>\n          <p><label>Height</label><span data-vdb-height></span></p>\n          <p><label>Ratio - w/h</label><span data-vdb-ratio></span></p>\n          <p><label>Aspect Ratio</label><span data-vdb-asp-ratio-2></spa></p>\n          <p><label></label><span data-vdb-asp-ratio-3></span></p>\n          <p><label></label><span data-vdb-asp-ratio-4></span></p>\n          <p><label></label><span data-vdb-asp-ratio-5></span></p>\n          <p><label></label><span data-vdb-asp-ratio-6></span></p>\n          <p><label></label><span data-vdb-asp-ratio-7></span></p>\n          <p><label></label><span data-vdb-asp-ratio-8></span></p>\n          <p><label></label><span data-vdb-asp-ratio-9></span></p>\n          <p><label></label><span data-vdb-asp-ratio-10></span></p>\n          <p><label></label><span data-vdb-asp-ratio-11></span></p>\n          <p><label>Ratio Raw</label><span data-vdb-ratio-raw></span></p>\n        </div>\n        <div class=\"credit\">\n          <p>Created by Jacopo Marrone </p>\n          <p>\n            <a href=\"https://codepen.io/tresorama/pen/KKmrMNz\">CodePen</a>\n            <a href=\"https://github.com/tresorama\">GitHub</a>\n          </p>\n        </div>\n      </div>\n      <div class=\"right-side\">\n        <div class=\"extensions\"></div>\n        <span data-vdb-toggler>OPEN</span>\n      </div>\n    </div>\n\n    <style>\n      [class*=ViewportDetailsBanner],\n      [class*=ViewportDetailsBanner] *\n      [class*=ViewportDetailsBanner-ext],\n      [class*=ViewportDetailsBanner-ext] *{\n        font-family: monospace;\n        border-radius: 1px;\n        box-sizing: border-box;\n      }\n      \n      .ViewportDetailsBanner {\n        z-index: 2000;\n        --bg-color: hsl(0,0%,5%);\n        --bg-color-soft: hsl(0,0%,10%);\n        --text-color: hsl(0,0%,95%);\n        position: fixed;\n        max-width: 95%;\n        right: 0;\n        top: 50%;\n        transform: translateY(-50%);\n        z-index: 1000;\n        background-color: var(--bg-color);\n        color: var(--text-color);\n        display: flex;\n        align-items: stretch;\n      }\n      .ViewportDetailsBanner:not(.isOpen) .left-side {\n        display: none;\n      }\n\n      .ViewportDetailsBanner .left-side,\n      .ViewportDetailsBanner .right-side {\n        min-width: 0;\n        max-height: 85vh;\n        overflow: scroll;\n      }\n\n      .ViewportDetailsBanner .right-side {\n        flex-shrink: 0;\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        padding: 1.3vmax;\n      }\n      \n      .ViewportDetailsBanner .details {\n        margin: 2.3vw 1.3vw;\n        background: var(--bg-color-soft);\n        overflow: scroll;\n      }\n\n      .ViewportDetailsBanner .details > p {\n        padding-inline-start: 1.5vmin;\n        padding-inline-end: 3vmin;\n        margin-block-start: 1vmin;\n        margin-block-end: 0vmin;\n        width: 20em;\n        display: flex;\n        flex-direction: row;\n        justify-content: space-between;\n      }\n      .ViewportDetailsBanner .details label:not(:empty):after {\n        content: \" :\";\n      }\n      \n      .ViewportDetailsBanner.value-to-left .details > p {\n        flex-direction: row-reverse;\n      }\n      .ViewportDetailsBanner.value-to-left .details label:not(:empty):after {\n        content: none;\n      }\n      \n      .ViewportDetailsBanner .extensions {\n      }\n      .ViewportDetailsBanner .extensions p {\n        margin-block-start: 1.5vmin;\n        margin-block-end: 3vmin;\n      }\n      \n      .ViewportDetailsBanner .extensions input {\n        vertical-align: middle;\n        margin: 0;\n      }\n\n      .ViewportDetailsBanner [data-vdb-toggler] {\n        background-color: var(--text-color);\n        color: var(--bg-color);\n        display: inline-block;\n        text-align: center;\n        padding: 0.35em 0.7em;\n      }\n      \n      .ViewportDetailsBanner .credit  {\n        margin: 1.3vw 1.3vw;\n        color: inherit;\n        \n      }\n      .ViewportDetailsBanner a  {\n        color: inherit;\n      }\n\n      </style>\n    ");
    }

    injectDomNode();
    injectDomNode = null; // never recall
    //   - 2b - save el refernces

    var bannerNode = document.querySelector(".ViewportDetailsBanner");
    var bannerTogglerNode = bannerNode.querySelector("[data-vdb-toggler]");
    var bannerExtensionsNode = bannerNode.querySelector(".extensions"); //   - 2c - visibility state

    var _fakeUseState3 = fakeUseState(false),
        _fakeUseState4 = _slicedToArray(_fakeUseState3, 2),
        isOpen = _fakeUseState4[0],
        setIsOpen = _fakeUseState4[1];

    function onVisibilityChange() {
      if (isOpen()) {
        bannerNode.classList.add("isOpen");
        bannerTogglerNode.innerHTML = "CLOSE";
      } else {
        bannerNode.classList.remove("isOpen");
        bannerTogglerNode.innerHTML = "OPEN";
      }
    }

    function toggleBannerVisibility() {
      setIsOpen(!isOpen()).then(onVisibilityChange);
    } //   - 2d - update view from business logic data


    function updateView(_ref2) {
      var width = _ref2.width,
          height = _ref2.height,
          ratio = _ref2.ratio,
          aspect_ratio = _ref2.aspect_ratio;

      var cleanNumber = function cleanNumber(num) {
        return Number(num).toFixed(2);
      };

      bannerNode.querySelector("[data-vdb-width]").innerHTML = "".concat(width, " px");
      bannerNode.querySelector("[data-vdb-height]").innerHTML = "".concat(height, " px");
      bannerNode.querySelector("[data-vdb-ratio-raw]").innerHTML = "".concat(ratio);
      bannerNode.querySelector("[data-vdb-ratio]").innerHTML = "".concat(cleanNumber(ratio));
      bannerNode.querySelector("[data-vdb-asp-ratio-2]").innerHTML = "".concat(cleanNumber(aspect_ratio.base_2), " / 2");
      bannerNode.querySelector("[data-vdb-asp-ratio-3]").innerHTML = "".concat(cleanNumber(aspect_ratio.base_3), " / 3");
      bannerNode.querySelector("[data-vdb-asp-ratio-4]").innerHTML = "".concat(cleanNumber(aspect_ratio.base_4), " / 4");
      bannerNode.querySelector("[data-vdb-asp-ratio-5]").innerHTML = "".concat(cleanNumber(aspect_ratio.base_5), " / 5");
      bannerNode.querySelector("[data-vdb-asp-ratio-6]").innerHTML = "".concat(cleanNumber(aspect_ratio.base_6), " / 6");
      bannerNode.querySelector("[data-vdb-asp-ratio-7]").innerHTML = "".concat(cleanNumber(aspect_ratio.base_7), " / 7");
      bannerNode.querySelector("[data-vdb-asp-ratio-8]").innerHTML = "".concat(cleanNumber(aspect_ratio.base_8), " / 8");
      bannerNode.querySelector("[data-vdb-asp-ratio-9]").innerHTML = "".concat(cleanNumber(aspect_ratio.base_9), " / 9");
      bannerNode.querySelector("[data-vdb-asp-ratio-10]").innerHTML = "".concat(cleanNumber(aspect_ratio.base_10), " / 10");
      bannerNode.querySelector("[data-vdb-asp-ratio-11]").innerHTML = "".concat(cleanNumber(aspect_ratio.base_11), " / 12");
    } //   - 2e - dom event listener


    bannerTogglerNode.addEventListener("click", function () {
      return toggleBannerVisibility();
    });
    window.addEventListener("resize", function () {
      return updateBannerData();
    }); // 3) init extensions

    extensions.forEach(function (extension, index) {
      var key = extension.key,
          displayedText = extension.displayedText,
          initialState = extension.initialState,
          onClick = extension.onClick;
      var htmlFor = "extension-".concat(index, "-").concat(key);
      bannerExtensionsNode.insertAdjacentHTML("beforeend", "\n    <p>\n      <input name=\"".concat(htmlFor, "\" type=\"checkbox\"/>\n      <label for=\"").concat(htmlFor, "\">").concat(displayedText, "</label>\n    </p>\n    "));
      var domNode = bannerExtensionsNode.querySelector("input[name=\"".concat(htmlFor, "\"]"));
      domNode.checked = initialState;
      domNode.addEventListener("click", onClick);
    }); // 4) first time only initialization

    updateBannerData(); //run to populate initial data
  }

  showViewportDetailsBanner([{
    key: "realTimeDevice",
    displayedText: "Device",
    initialState: ext_realTimeDevice.isVisible(),
    onClick: ext_realTimeDevice.toggleVisibility
  }]);
}

var _default = ViewportDetailsBanner;
exports.default = _default;
},{}],"js/script.js":[function(require,module,exports) {
"use strict";

var _frontendUtilities = require("./frontend-utilities.js");

var _ViewportDetailsBanner = _interopRequireDefault(require("./ViewportDetailsBanner.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//ViewportDetailsBanner();

/* ===================================================
  Frontend Utilities      
=================================================== */
function ObserverScroll(options) {
  //utilities
  var callArrayOfFunction = function callArrayOfFunction(a, args) {
    if (Array.isArray(a)) {
      a.forEach(function (f) {
        f && f.apply(void 0, _toConsumableArray(args));
      });
    } else {
      f && f.apply(void 0, _toConsumableArray(args));
    }
  }; // state


  var lastScrollPos = 0;
  var lastScrollDirection = null; // adding scroll event

  var handler = function handler() {
    // detects new state and compares it with the new one
    var scrollPos = document.body.getBoundingClientRect().top;
    var scrollDirection = scrollPos > lastScrollPos ? "UP" : "DOWN";
    var derivedState = {
      bodyBoundingClientRect: document.body.getBoundingClientRect(),
      scrollPos: scrollPos,
      scrollDirection: scrollDirection,
      scrollDirectionChanged: scrollDirection !== lastScrollDirection
    }; // call all callbacks

    callArrayOfFunction(options.onAfter, [derivedState]); // saves the new position for iteration.

    lastScrollPos = scrollPos;
    lastScrollDirection = scrollDirection;
  };

  window.addEventListener("scroll", (0, _frontendUtilities.throttle)(handler, 200));
}
/* =================================================== 
  Initialize Global Object That Contains all UI animation
=================================================== */


window._UI = {};
/* =================================================== 
  Build UI Animation
=================================================== */
// build UI ANIMATION -> Header Navigation

(function () {
  var openTimeline = function () {
    var tl = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.3,
        ease: "ease"
      }
    });
    tl.from(".page-header__nav-bg", {
      top: "-100%"
    });
    tl.from(".page-header .header-navigation", {
      x: "-100%"
    }, "<");
    tl.from(".page-header .header-navigation__item", {
      x: "-100%",
      stagger: 0.02
    }, "<");
    return tl;
  }();

  window._UI.headerNavigation = {
    isOpen: false,
    open: function open() {
      if (this.isOpen) return;
      this.isOpen = true;
      openTimeline.play();
    },
    close: function close() {
      if (!this.isOpen) return;
      this.isOpen = false;
      openTimeline.reverse();
    },
    toggle: function toggle() {
      if (this.isOpen) this.close();else this.open();
    }
  };
})(); // build UI ANIMATION -> Header Bar Show/Hide


(function () {
  var headerSelector = ".page-header";
  var headerBarSelector = ".page-header__bar";
  var taxonomyNavigationSelector = ".taxonomy-navigation";
  window._UI.headerBar = {
    isVisible: true,
    show: function show() {
      if (this.isVisible) return;
      this.isVisible = true;
      gsap.to(headerSelector, {
        top: 0,
        duration: 0.1
      });
    },
    hide: function hide() {
      if (!this.isVisible) return;
      this.isVisible = false;
      gsap.to(headerSelector, {
        top: -this.getHeight(),
        duration: 0.1
      });
    },
    getHeight: function getHeight() {
      var headerBarHeight = document.querySelector(headerBarSelector).getBoundingClientRect().height || 0;
      var taxonomyNavigationHeight = document.querySelector(taxonomyNavigationSelector).getBoundingClientRect().height || 0;
      return headerBarHeight + taxonomyNavigationHeight;
    },
    setHeightCustomProperty: function setHeightCustomProperty() {
      var height = this.getHeight();
      document.documentElement.style.setProperty(cssCustomPropName, "".concat(height, "px"));
    }
  };
})();
/* =================================================== 
  ADD EVENT LISTENER THAT TRIGGER UI ANIMATION
=================================================== */


document.querySelector("[data-js=header-navigation-mobile-trigger]").addEventListener("click", function () {
  window._UI.headerNavigation.toggle();
}); // header-navigation auto show/hide

new ObserverScroll({
  onAfter: [function (_ref) {
    var scrollDirection = _ref.scrollDirection,
        scrollPos = _ref.scrollPos,
        bodyBoundingClientRect = _ref.bodyBoundingClientRect;

    // functions
    var getHeaderHeight = function getHeaderHeight() {
      return window._UI.headerBar.getHeight();
    };

    var headerNavigationIsOpen = function headerNavigationIsOpen() {
      return window._UI.headerNavigation.isOpen;
    };

    var showHeader = function showHeader() {
      return window._UI.headerBar.show();
    };

    var hideHeader = function hideHeader() {
      return window._UI.headerBar.hide();
    };

    var threshold = function threshold() {
      return 10; // absolute thresould in px

      return getHeaderHeight();
    }; // logic


    if (headerNavigationIsOpen()) {
      showHeader();
      return;
    }

    if (scrollDirection === "UP") {
      showHeader();
      return;
    }

    if (scrollPos <= -threshold()) {
      hideHeader();
      return;
    }
  }]
});
/* =================================================== 
      ADDITIONAL UI STUFF
=================================================== */
// disable window scroll when header-navigation is open

(function () {
  var scrollPos = 0;

  var saveScrollPosition = function saveScrollPosition() {
    scrollPos = document.body.getBoundingClientRect().top;
  };

  var restoreScrollPosition = function restoreScrollPosition() {
    window.scrollTo({
      x: 0,
      y: scrollPos
    });
  };

  document.querySelector("[data-js=header-navigation-mobile-trigger]").addEventListener("click", function () {
    if (window._UI.headerNavigation.isOpen) {
      document.body.style.overflow = "hidden";
      saveScrollPosition();
    } else {
      document.body.style.overflow = null;
      restoreScrollPosition();
    }
  });
})(); // CSS Custom Prop Value Update -> Header Height


(function () {
  var cssCustomPropName = "--live-all-header-stuffs-height";

  var getHeight = function getHeight() {
    return window._UI.headerBar.getHeight();
  };

  var setHeightCustomProperty = function setHeightCustomProperty() {
    var height = getHeight();
    document.documentElement.style.setProperty(cssCustomPropName, "".concat(height, "px"));
  };

  setHeightCustomProperty();
  window.addEventListener("resize", (0, _frontendUtilities.throttle)(setHeightCustomProperty, 200));
})();
/* =================================================== 
      SINGLE PRODUCT PAGE ONLY
=================================================== */
// switch between mobile visual and desktop visual if screen width is enough wide


(function () {
  var breakpoint = 768; //breakpoint = 500;

  var className = "is-large-view";

  var getEl = function getEl() {
    return document.querySelector(".page-content .product");
  };

  if (!getEl()) return; // element not present in page

  var maybeConvert = function maybeConvert() {
    if (window.innerWidth >= breakpoint) {
      getEl().classList.add(className);
    } else {
      getEl().classList.remove(className);
    }
  };

  maybeConvert(); // run one at page load

  window.addEventListener("resize", (0, _frontendUtilities.throttle)(maybeConvert, 200));
})();
},{"./frontend-utilities.js":"js/frontend-utilities.js","./ViewportDetailsBanner.js":"js/ViewportDetailsBanner.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64669" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/script.js"], null)
//# sourceMappingURL=/script.d573be0b.js.map