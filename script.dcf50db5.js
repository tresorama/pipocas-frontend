parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"wTEN":[function(require,module,exports) {
"use strict";function e(e){return o(e)||r(e)||n(e)||t()}function t(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function n(e,t){if(e){if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}function r(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function o(e){if(Array.isArray(e))return i(e)}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function c(e,t){var n;return function(){n||(n=setTimeout(function(){e(),n=null},t))}}function a(e,t){var n;return function(){clearTimeout(n),n=setTimeout(e,t)}}function u(t){var n=0,r=null;window.addEventListener("scroll",c(function(){var o,i,c=document.body.getBoundingClientRect().top,a=c>n?"UP":"DOWN",u={bodyBoundingClientRect:document.body.getBoundingClientRect(),scrollPos:c,scrollDirection:a,scrollDirectionChanged:a!==r};o=t.onAfter,i=[u],Array.isArray(o)?o.forEach(function(t){t&&t.apply(void 0,e(i))}):f&&f.apply(void 0,e(i)),n=c,r=a},200))}function s(e){var t=e.selector,n=e.times,r=void 0===n?1:n,o=e.elementModifierCallback;if(t){var i=document.querySelector(t);if(!i)throw new Error("\n    Frontend Utilites - duplicateElement - Error :\n      No el matches selector.\n      selector => ".concat(t,"\n    "));new Array(r).fill("not-null-value").map(function(e,t){var n=i.cloneNode(!0);o&&o(n,t),i.parentElement.appendChild(n)})}}function l(e,t){var n=window.matchMedia(e),r=function(e){t(e.matches)};void 0!==n.addEventListener?n.addEventListener("change",r):void 0!==n.addListner?(console.log("mediaQueryList.addEventListener() not supported.\n      Fallbacking to addListener()! "),n.addListener("change",r)):console.log("mediaQueryList.addEventListener() & mediaQueryList.addListener() not supported! "),t(n.matches)}function d(e){var t={current:e||null};return[function(){return t.current},function(e){t.current=e}]}function p(){return{actions:[],fire:function(){this.actions.forEach(function(e){return e()})},subscribe:function(e){this.actions.push(e)},unsubscribe:function(e){var t=this.actions.indexOf(e);-1!==t&&(this.actions=this.actions.splice(t,1))}}}function m(e){var t=e,n=new p;return[function(){return t},function(e){t=e,n.fire()},n]}Object.defineProperty(exports,"__esModule",{value:!0}),exports.throttle=c,exports.debounce=a,exports.ObserverScroll=u,exports.duplicateElement=s,exports.mediaQueryWatcher=l,exports.fakeUseRef=d,exports.GenericObserver=p,exports.fakeUseState=m;
},{}],"eMTJ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=t;var e=require("./frontend-utilities");function t(){var t;(t=document.createElement("style")).innerHTML="\n    .taxonomy-navigation {\n      display: none;\n    }\n  ",document.head.appendChild(t),document.body.classList.contains("PRODUCT-LIST-PAGE")&&(0,e.duplicateElement)({selector:".product-grid__item",times:16,elementModifierCallback:function(e,t){var n=(t+2)%6;n++,e.querySelectorAll("img").forEach(function(e,t){var o="assets/images/products/".concat(n,"/").concat(t+1,".jpg");e.src=o})}})}
},{"./frontend-utilities":"wTEN"}],"L4bL":[function(require,module,exports) {
"use strict";var e=require("./frontend-utilities.js"),t=n(require("./devTimeSaver.js"));function n(e){return e&&e.__esModule?e:{default:e}}function r(e){return a(e)||o(e)||d(e)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function a(e){if(Array.isArray(e))return u(e)}function s(e,t){return f(e)||l(e,t)||d(e,t)||c()}function c(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function d(e,t){if(e){if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(e,t):void 0}}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function l(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,o=[],a=!0,s=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);a=!0);}catch(c){s=!0,i=c}finally{try{a||null==n.return||n.return()}finally{if(s)throw i}}return o}}function f(e){if(Array.isArray(e))return e}(0,t.default)(),window._UI={},function(t){var n,r,i;n=gsap.timeline({paused:!0,defaults:{duration:.3,ease:"ease"}}).from(".page-header__nav-bg",{top:"-100%"}).from(".page-header .header-navigation",{x:"-100%"},"<").from(".page-header .header-navigation__item",{x:"-100%",stagger:.02},"<"),window._UI.headerNavigation={isOpen:!1,open:function(){this.isOpen||(this.isOpen=!0,n.play())},close:function(){this.isOpen&&(this.isOpen=!1,n.reverse())},toggle:function(){this.isOpen?this.close():this.open()}},window._UI.headerBar={isVisible:!0,show:function(){this.isVisible||(this.isVisible=!0,gsap.to(".page-header",{top:0,duration:.1}))},hide:function(){this.isVisible&&(this.isVisible=!1,gsap.to(".page-header",{top:-this.getHeight(),duration:.1}))},getHeight:function(){return(document.querySelector(".page-header__bar").getBoundingClientRect().height||0)+(document.querySelector(".taxonomy-navigation").getBoundingClientRect().height||0)},setHeightCustomProperty:function(){var e=this.getHeight();document.documentElement.style.setProperty(cssCustomPropName,"".concat(e,"px"))}},document.querySelector("[data-js=header-navigation-mobile-trigger]").addEventListener("click",function(){window._UI.headerNavigation.toggle()}),new e.ObserverScroll({onAfter:[function(e){var t=e.scrollDirection,n=e.scrollPos,r=(e.bodyBoundingClientRect,function(){return window._UI.headerBar.show()});window._UI.headerNavigation.isOpen?r():"UP"!==t?n<=-10&&window._UI.headerBar.hide():r()}]}),r=0,document.querySelector("[data-js=header-navigation-mobile-trigger]").addEventListener("click",function(){window._UI.headerNavigation.isOpen?(document.body.style.overflow="hidden",r=document.body.getBoundingClientRect().top):(document.body.style.overflow=null,window.scrollTo({x:0,y:r}))}),(i=function(){var e=window._UI.headerBar.getHeight();document.documentElement.style.setProperty("--live-all-header-stuffs-height","".concat(e,"px"))})(),window.addEventListener("resize",(0,e.throttle)(i,200))}(),function(t){var n;document.body.classList.contains("SINGLE-PRODUCT-PAGE")&&(n=function(){return document.querySelector(".page-content .product")},(0,e.mediaQueryWatcher)("(min-width: 768px)",function(e){e?n().classList.add("is-large-view"):n().classList.remove("is-large-view")}))}(),document.body.classList.contains("PRODUCT-LIST-PAGE")&&(function(){if(!document.body.classList.contains("FILTER-BAR-PANEL__USE-GSAP")){var e=document.querySelectorAll(".filter-bar [data-js-dropdown-target]"),t=document.querySelectorAll(".filter-bar [data-js-dropdown-trigger]"),n=document.querySelectorAll(".filter-bar [data-js-dropdown-closer]");if(e.length){var r=function(e){return e.getAttribute("data-js-dropdown-trigger")},i=function(e){return e.getAttribute("data-js-dropdown-closer")},o=function(e){return document.querySelector('[data-js-dropdown-target*="'.concat(e,'"]'))};t.forEach(function(e){e.addEventListener("click",function(){var e=r(this);o(e).classList.toggle("panel-is-opened")})}),n.forEach(function(e){e.addEventListener("click",function(){var e=i(this);o(e).classList.remove("panel-is-opened")})})}}}(),function(){if(document.body.classList.contains("FILTER-BAR-PANEL__USE-GSAP")){var t=document.querySelectorAll(".filter-bar [data-js-dropdown-target]"),n=document.querySelectorAll(".filter-bar [data-js-dropdown-trigger]"),r=document.querySelectorAll(".filter-bar [data-js-dropdown-closer]");if(t.length){var i="(min-width: 768px)",o=function(e,t){e.style.overflow="hidden",e.style.transformOrigin="top",gsap.to(e,{duration:0,yPercent:0,scaleY:1}),gsap.to(e.children,{duration:0,opacity:1});var n={paused:!0,defaults:{duration:.2}};return t?gsap.timeline(n).from(e,{yPercent:-100}).from(e.children,{opacity:0}):gsap.timeline(n).from(e,{scaleY:0}).from(e.children,{opacity:0})},a=function(e){return e.getAttribute("data-js-dropdown-target")},c=function(e){return e.getAttribute("data-js-dropdown-trigger")},d=function(e){return e.getAttribute("data-js-dropdown-closer")},u={};t.forEach(function(e){var t=a(e);u[t]=new l(e)}),n.forEach(function(e){e.addEventListener("click",function(){var e=c(this);u[e].toggle()})}),r.forEach(function(e){e.addEventListener("click",function(){var e=d(this);u[e].close()})}),window._UI.filterBarPanels=u}}function l(t){var n=s((0,e.fakeUseRef)(),2),r=n[0],a=n[1];return(0,e.mediaQueryWatcher)(i,function(e){a(o(t,!e))}),{isOpen:!1,get openTimeline(){return r()},open:function(){this.isOpen||(this.openTimeline.play(),this.isOpen=!0)},close:function(){this.isOpen&&(this.openTimeline.reverse(),this.isOpen=!1)},toggle:function(){this.isOpen?this.close():this.open()}}}}(),function(){var t=document.querySelector(".product-grid-visualization-chooser");if(t){var n=r(t.querySelectorAll(".option")),i=n.map(function(e){return e.getAttribute("data-js-option-classname")}),o=s((0,e.fakeUseState)(0),3),a=o[0],c=o[1],d=o[2],u=function(){var e=a();i.forEach(function(e){return document.body.classList.remove(e)}),document.body.classList.add(i[e])};n.forEach(function(e){e.addEventListener("click",function(){var e=n.indexOf(this);c(e)})}),d.subscribe(u),u()}}());
},{"./frontend-utilities.js":"wTEN","./devTimeSaver.js":"eMTJ"}]},{},["L4bL"], null)
//# sourceMappingURL=https://tresorama.github.io/pipocas-frontend/script.dcf50db5.js.map