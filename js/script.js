import { debounce, throttle } from "./frontend-utilities.js";
import ViewportDetailsBanner from "./ViewportDetailsBanner.js";
//ViewportDetailsBanner();

/* ===================================================
  Frontend Utilities      
=================================================== */
function ObserverScroll(options) {
  //utilities
  const callArrayOfFunction = (a, args) => {
    if (Array.isArray(a)) {
      a.forEach((f) => {
        f && f(...args);
      });
    } else {
      f && f(...args);
    }
  };

  // state
  let lastScrollPos = 0;
  let lastScrollDirection = null;

  // adding scroll event
  const handler = function () {
    // detects new state and compares it with the new one
    const scrollPos = document.body.getBoundingClientRect().top;
    const scrollDirection = scrollPos > lastScrollPos ? "UP" : "DOWN";
    const derivedState = {
      bodyBoundingClientRect: document.body.getBoundingClientRect(),
      scrollPos,
      scrollDirection,
      scrollDirectionChanged: scrollDirection !== lastScrollDirection,
    };

    // call all callbacks
    callArrayOfFunction(options.onAfter, [derivedState]);

    // saves the new position for iteration.
    lastScrollPos = scrollPos;
    lastScrollDirection = scrollDirection;
  };
  window.addEventListener("scroll", throttle(handler, 200));
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
  const openTimeline = (() => {
    const tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.3, ease: "ease" },
    });
    tl.from(".page-header__nav-bg", { top: "-100%" });
    tl.from(".page-header .header-navigation", { x: "-100%" }, "<");
    tl.from(
      ".page-header .header-navigation__item",
      {
        x: "-100%",
        stagger: 0.02,
      },
      "<"
    );
    return tl;
  })();

  window._UI.headerNavigation = {
    isOpen: false,
    open() {
      if (this.isOpen) return;
      this.isOpen = true;
      openTimeline.play();
    },
    close() {
      if (!this.isOpen) return;
      this.isOpen = false;
      openTimeline.reverse();
    },
    toggle() {
      if (this.isOpen) this.close();
      else this.open();
    },
  };
})();

// build UI ANIMATION -> Header Bar Show/Hide
(function () {
  const headerBarSelector = ".page-header__bar";
  window._UI.headerBar = {
    isVisible: true,
    show() {
      if (this.isVisible) return;
      this.isVisible = true;
      gsap.to(headerBarSelector, { top: 0, duration: 0.1 });
    },
    hide() {
      if (!this.isVisible) return;
      this.isVisible = false;
      gsap.to(headerBarSelector, { top: -this.getHeight(), duration: 0.1 });
    },
    getHeight() {
      return document.querySelector(headerBarSelector).getBoundingClientRect()
        .height;
    },
  };
})();

/* =================================================== 
  ADD EVENT LISTENER THAT TRIGGER UI ANIMATION
=================================================== */
document
  .querySelector("[data-js=header-navigation-mobile-trigger]")
  .addEventListener("click", function () {
    window._UI.headerNavigation.toggle();
  });

// header-navigation auto show/hide
new ObserverScroll({
  onAfter: [
    ({ scrollDirection, scrollPos, bodyBoundingClientRect }) => {
      // functions
      const getHeaderHeight = () => window._UI.headerBar.getHeight();
      const headerNavigationIsOpen = () => window._UI.headerNavigation.isOpen;
      const showHeader = () => window._UI.headerBar.show();
      const hideHeader = () => window._UI.headerBar.hide();

      // logic
      if (headerNavigationIsOpen()) {
        showHeader();
        return;
      }

      if (scrollDirection === "UP") {
        showHeader();
        return;
      }

      if (scrollPos <= -getHeaderHeight()) {
        hideHeader();
        return;
      }
    },
  ],
});

/* =================================================== 
      ADDITIONAL UI STUFF
=================================================== */
// disable window scroll when header-navigation is open
(function () {
  let scrollPos = 0;
  const saveScrollPosition = () => {
    scrollPos = document.body.getBoundingClientRect().top;
  };
  const restoreScrollPosition = () => {
    window.scrollTo({ x: 0, y: scrollPos });
  };

  document
    .querySelector("[data-js=header-navigation-mobile-trigger]")
    .addEventListener("click", function () {
      if (window._UI.headerNavigation.isOpen) {
        document.body.style.overflow = "hidden";
        saveScrollPosition();
      } else {
        document.body.style.overflow = null;
        restoreScrollPosition();
      }
    });
})();

/* =================================================== 
      SINGLE PRODUCT PAGE ONLY
=================================================== */
// switch between mobile visual and desktop visual if screen width is enough wide
(function () {
  let breakpoint = 768;
  breakpoint = 500;
  const className = "is-large-view";
  const getEl = () => document.querySelector(".page-content .product");
  if (!getEl()) return; // element not present in page

  const maybeConvert = () => {
    if (window.innerWidth >= breakpoint) {
      getEl().classList.add(className);
    } else {
      getEl().classList.remove(className);
    }
  };
  maybeConvert(); // run one at page load
  window.addEventListener("resize", throttle(maybeConvert, 200));
})();
