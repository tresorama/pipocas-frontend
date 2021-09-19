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
exports.ObserverScroll = ObserverScroll;
exports.duplicateElement = duplicateElement;
exports.mediaQueryWatcher = mediaQueryWatcher;
exports.fakeUseRef = fakeUseRef;
exports.GenericEmitter = GenericEmitter;
exports.fakeUseState = fakeUseState;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

  window.addEventListener("scroll", throttle(handler, 200));
}

function duplicateElement(_ref) {
  var selector = _ref.selector,
      _ref$times = _ref.times,
      times = _ref$times === void 0 ? 1 : _ref$times,
      elementModifierCallback = _ref.elementModifierCallback;
  if (!selector) return; //abort

  var template = document.querySelector(selector);

  if (!template) {
    throw new Error("\n    Frontend Utilites - duplicateElement - Error :\n      No el matches selector.\n      selector => ".concat(selector, "\n    "));
  }

  new Array(times).fill("not-null-value").map(function (unused, index) {
    var clone = template.cloneNode(true);
    elementModifierCallback && elementModifierCallback(clone, index);
    template.parentElement.appendChild(clone);
  });
}

function mediaQueryWatcher(mediaQueryString, onMatchChange) {
  // get a MediaQueryObject
  var mql = window.matchMedia(mediaQueryString); // when media query match status change run callback

  var handler = function handler(e) {
    onMatchChange(e.matches);
  };

  if (mql.addEventListener !== undefined) {
    mql.addEventListener("change", handler);
  } else if (mql.addListener !== undefined) {
    console.log("mediaQueryList.addEventListener() not supported.\n      Fallbacking to addListener()! ");
    mql.addListener(handler);
  } else {
    console.log("Neither mediaQueryList.addEventListener() & mediaQueryList.addListener() are supported by this browser! ");
  } // run once at page load


  onMatchChange(mql.matches);
}

function fakeUseRef(intialValue) {
  var ref = {
    current: intialValue || null
  };

  var getRef = function getRef() {
    return ref.current;
  };

  var updateRef = function updateRef(newValue) {
    ref.current = newValue;
  };

  return [getRef, updateRef];
}
/* =================================================== 
      IN PROGRESS
=================================================== */


function GenericEmitter() {
  return {
    actions: [],
    fire: function fire() {
      this.actions.forEach(function (action) {
        return action();
      });
    },
    subscribe: function subscribe(action) {
      this.actions.push(action);
    },
    unsubscribe: function unsubscribe(action) {
      var index = this.actions.indexOf(action);
      if (index === -1) return; // not found

      this.actions = this.actions.splice(index, 1);
    }
  };
}

function fakeUseState(initialState) {
  var state = initialState;

  var getState = function getState() {
    return state;
  };

  var setState = function setState(newState) {
    state = newState;
    onUpdateState.fire();
  };

  var onUpdateState = new GenericEmitter();
  return [getState, setState, onUpdateState];
}
},{}],"js/devTimeSaver.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _frontendUtilities = require("./frontend-utilities");

function _default() {
  // hide taxonomy-navigation
  (function () {
    var styleSheet = document.createElement("style");
    styleSheet.innerHTML = "\n    .taxonomy-navigation {\n      display: none;\n    }\n  ";
    document.head.appendChild(styleSheet);
  })(); // product-list page only


  (function (iMustRun) {
    if (!iMustRun) return; // duplicate product list item some times for development ...

    (function () {
      (0, _frontendUtilities.duplicateElement)({
        selector: ".product-grid__item",
        times: 16,
        elementModifierCallback: function elementModifierCallback(el, index) {
          var clampedIndex = (index + 2) % 6;
          clampedIndex++;
          el.querySelectorAll("img").forEach(function (img, i) {
            var newSrc = "assets/images/products/".concat(clampedIndex, "/").concat(i + 1, ".jpg");
            img.src = newSrc;
          });
        }
      });
    })();
  })(document.body.classList.contains("PRODUCT-LIST-PAGE"));
}
},{"./frontend-utilities":"js/frontend-utilities.js"}],"js/script.js":[function(require,module,exports) {
"use strict";

var _frontendUtilities = require("./frontend-utilities.js");

var _devTimeSaver = _interopRequireDefault(require("./devTimeSaver.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// import ViewportDetailsBanner from "./ViewportDetailsBanner.js";
//ViewportDetailsBanner();
(0, _devTimeSaver.default)();
/* =================================================== 
  Initialize Global Object That Contains all UI animation
=================================================== */

window._UI = {};
/* =================================================== 
  SHARED PAGE STUFF
=================================================== */

(function (iMustRun) {
  if (!iMustRun) return; // UI ANIMATION -> Header Navigation

  (function () {
    var openTimeline = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.3,
        ease: "ease"
      }
    }).from(".page-header__nav-bg", {
      top: "-100%"
    }).from(".page-header .header-navigation", {
      x: "-100%"
    }, "<").from(".page-header .header-navigation__item", {
      x: "-100%",
      stagger: 0.02
    }, "<");
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
  })(); // UI ANIMATION -> Header Bar Show/Hide


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
  })(); // EVENT LISTENER -> hamburger


  document.querySelector("[data-js=header-navigation-mobile-trigger]").addEventListener("click", function () {
    window._UI.headerNavigation.toggle();
  }); // EVENT LISTENER -> header-navigation auto show/hide

  new _frontendUtilities.ObserverScroll({
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
  }); // ADDITIONAL UI STUFF -> disable window scroll when header-navigation is open

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
  })(); // ADDITIONAL UI STUFF -> CSS Custom Prop Value Update -> Header Height


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
})(true);
/* =================================================== 
      SINGLE PRODUCT PAGE ONLY
=================================================== */


(function (iMustRun) {
  if (!iMustRun) return; // switch between mobile visual and desktop visual if screen width is enough wide

  (function () {
    var desktopMediaQuery = "(min-width: 768px)";
    var className = "is-large-view";

    var getEl = function getEl() {
      return document.querySelector(".product");
    };

    (0, _frontendUtilities.mediaQueryWatcher)(desktopMediaQuery, function (matches) {
      if (matches) {
        //desktop
        getEl().classList.add(className);
      } else {
        //mobile
        getEl().classList.remove(className);
      }
    });
  })();
})(document.body.classList.contains("SINGLE-PRODUCT-PAGE"));
/* =================================================== 
      PRODUCT-LIST PAGE ONLY
=================================================== */


(function (iMustRun) {
  if (!iMustRun) return; // filter bar panels open/close => TOGGLE CLASS VERSION
  // need also this file:
  // scss/_12_product-list-page__filter-bar-panel-with-css-transition.scss

  (function () {
    if (document.body.classList.contains("FILTER-BAR-PANEL__USE-GSAP")) return;
    var panels = document.querySelectorAll(".filter-bar [data-js-dropdown-target]");
    var triggers = document.querySelectorAll(".filter-bar [data-js-dropdown-trigger]");
    var closers = document.querySelectorAll(".filter-bar [data-js-dropdown-closer]");
    if (!panels.length) return; // build timeline for each panel

    var getKeyFrom = {
      panel: function panel(el) {
        return el.getAttribute("data-js-dropdown-target");
      },
      trigger: function trigger(el) {
        return el.getAttribute("data-js-dropdown-trigger");
      },
      closer: function closer(el) {
        return el.getAttribute("data-js-dropdown-closer");
      }
    };

    var getPanelByKey = function getPanelByKey(key) {
      return document.querySelector("[data-js-dropdown-target*=\"".concat(key, "\"]"));
    };

    var isOpenClassName = "panel-is-opened";
    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var key = getKeyFrom.trigger(this);
        var panel = getPanelByKey(key);
        panel.classList.toggle(isOpenClassName);
      });
    });
    closers.forEach(function (closers) {
      closers.addEventListener("click", function () {
        var key = getKeyFrom.closer(this);
        var panel = getPanelByKey(key);
        panel.classList.remove(isOpenClassName);
      });
    });
  })(); // filter bar panels open/close => GSAP ONLY VERSION


  (function () {
    if (!document.body.classList.contains("FILTER-BAR-PANEL__USE-GSAP")) return;
    var panels = document.querySelectorAll(".filter-bar [data-js-dropdown-target]");
    var triggers = document.querySelectorAll(".filter-bar [data-js-dropdown-trigger]");
    var closers = document.querySelectorAll(".filter-bar [data-js-dropdown-closer]");
    if (!panels.length) return; // function that build timeline for a filter-bar__panel

    var desktopMediaQuery = "(min-width: 768px)";

    var buildTimeline = function buildTimeline(panelEl, isMobile) {
      // add necessary static inline style
      panelEl.style.overflow = "hidden";
      panelEl.style.transformOrigin = "top"; // reset inline css style animated by previous timeline

      gsap.to(panelEl, {
        duration: 0,
        yPercent: 0,
        scaleY: 1
      });
      gsap.to(panelEl.children, {
        duration: 0,
        opacity: 1
      }); // build new timeline

      var options = {
        paused: true,
        defaults: {
          duration: 0.2
        }
      };

      if (isMobile) {
        return gsap.timeline(options).from(panelEl, {
          yPercent: -100
        }).from(panelEl.children, {
          opacity: 0
        });
      } else {
        return gsap.timeline(options).from(panelEl, {
          scaleY: 0
        }).from(panelEl.children, {
          opacity: 0
        });
      }
    }; // function that help to retrieve key from dom element, based on type


    var getKeyFrom = {
      panel: function panel(el) {
        return el.getAttribute("data-js-dropdown-target");
      },
      trigger: function trigger(el) {
        return el.getAttribute("data-js-dropdown-trigger");
      },
      closer: function closer(el) {
        return el.getAttribute("data-js-dropdown-closer");
      }
    }; // class that:
    // - keep timeline state
    // - rebuild timeline on screen size change
    // - expose methods for open/close panel

    function PanelOpener(panel) {
      var _fakeUseRef = (0, _frontendUtilities.fakeUseRef)(),
          _fakeUseRef2 = _slicedToArray(_fakeUseRef, 2),
          getTimeline = _fakeUseRef2[0],
          setTimeline = _fakeUseRef2[1];

      (0, _frontendUtilities.mediaQueryWatcher)(desktopMediaQuery, function (matches) {
        var isMobile = !matches;
        setTimeline(buildTimeline(panel, isMobile));
      });
      return {
        isOpen: false,

        get openTimeline() {
          return getTimeline();
        },

        open: function open() {
          if (this.isOpen) return;
          this.openTimeline.play();
          this.isOpen = true;
        },
        close: function close() {
          if (!this.isOpen) return;
          this.openTimeline.reverse();
          this.isOpen = false;
        },
        toggle: function toggle() {
          if (!this.isOpen) {
            this.open();
          } else {
            this.close();
          }
        }
      };
    } // for each panel ...


    var all = {};
    panels.forEach(function (panel) {
      var key = getKeyFrom.panel(panel);
      all[key] = new PanelOpener(panel);
    });
    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var key = getKeyFrom.trigger(this);
        all[key].toggle();
      });
    });
    closers.forEach(function (closers) {
      closers.addEventListener("click", function () {
        var key = getKeyFrom.closer(this);
        all[key].close();
      });
    }); // save in global _UI object

    window._UI.filterBarPanels = all;
  })(); // filter bar panels grid-visualization chooser


  (function () {
    var select = document.querySelector(".product-grid-visualization-chooser");
    if (!select) return;

    var options = _toConsumableArray(select.querySelectorAll(".option"));

    var allOptionsClassSet = options.map(function (option) {
      return option.getAttribute("data-js-option-classname");
    });

    var _fakeUseState = (0, _frontendUtilities.fakeUseState)(0),
        _fakeUseState2 = _slicedToArray(_fakeUseState, 3),
        getCurrent = _fakeUseState2[0],
        setCurrent = _fakeUseState2[1],
        onUpdateCurrent = _fakeUseState2[2];

    var addOptionClassSet = function addOptionClassSet(classesString) {
      classesString.split(",").forEach(function (_class) {
        document.body.classList.add(_class);
      });
    };

    var removeOptionClassSet = function removeOptionClassSet(classesString) {
      classesString.split(",").forEach(function (_class) {
        document.body.classList.remove(_class);
      });
    };

    var updateView = function updateView() {
      //remove all options classes ...
      allOptionsClassSet.forEach(removeOptionClassSet); // add only current option classes ...

      addOptionClassSet(allOptionsClassSet[getCurrent()]);
    };

    options.forEach(function (option) {
      option.addEventListener("click", function () {
        var thisOptionIndex = options.indexOf(this);
        setCurrent(thisOptionIndex);
      });
    });
    onUpdateCurrent.subscribe(updateView);
    updateView(); // on page load choose first one option
  })();
})(document.body.classList.contains("PRODUCT-LIST-PAGE"));
},{"./frontend-utilities.js":"js/frontend-utilities.js","./devTimeSaver.js":"js/devTimeSaver.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60438" + '/');

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