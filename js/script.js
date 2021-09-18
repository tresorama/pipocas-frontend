import { throttle, ObserverScroll, mediaQueryWatcher, fakeUseRef, fakeUseState } from "./frontend-utilities.js";
import runDevoperTimeSaver from "./devTimeSaver.js";
// import ViewportDetailsBanner from "./ViewportDetailsBanner.js";
//ViewportDetailsBanner();
runDevoperTimeSaver();

/* =================================================== 
  Initialize Global Object That Contains all UI animation
=================================================== */
window._UI = {};

/* =================================================== 
  SHARED PAGE STUFF
=================================================== */
(function (iMustRun) {
  if (!iMustRun) return;

  // UI ANIMATION -> Header Navigation
  (function () {
    const openTimeline = gsap
      .timeline({ paused: true, defaults: { duration: 0.3, ease: "ease" } })
      .from(".page-header__nav-bg", { top: "-100%" })
      .from(".page-header .header-navigation", { x: "-100%" }, "<")
      .from(".page-header .header-navigation__item", { x: "-100%", stagger: 0.02 }, "<");

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

  // UI ANIMATION -> Header Bar Show/Hide
  (function () {
    const headerSelector = ".page-header";
    const headerBarSelector = ".page-header__bar";
    const taxonomyNavigationSelector = ".taxonomy-navigation";
    window._UI.headerBar = {
      isVisible: true,
      show() {
        if (this.isVisible) return;
        this.isVisible = true;
        gsap.to(headerSelector, { top: 0, duration: 0.1 });
      },
      hide() {
        if (!this.isVisible) return;
        this.isVisible = false;
        gsap.to(headerSelector, {
          top: -this.getHeight(),
          duration: 0.1,
        });
      },
      getHeight() {
        const headerBarHeight = document.querySelector(headerBarSelector).getBoundingClientRect().height || 0;
        const taxonomyNavigationHeight = document.querySelector(taxonomyNavigationSelector).getBoundingClientRect().height || 0;
        return headerBarHeight + taxonomyNavigationHeight;
      },
      setHeightCustomProperty() {
        const height = this.getHeight();
        document.documentElement.style.setProperty(cssCustomPropName, `${height}px`);
      },
    };
  })();

  // EVENT LISTENER -> hamburger
  document.querySelector("[data-js=header-navigation-mobile-trigger]").addEventListener("click", function () {
    window._UI.headerNavigation.toggle();
  });

  // EVENT LISTENER -> header-navigation auto show/hide
  new ObserverScroll({
    onAfter: [
      ({ scrollDirection, scrollPos, bodyBoundingClientRect }) => {
        // functions
        const getHeaderHeight = () => window._UI.headerBar.getHeight();
        const headerNavigationIsOpen = () => window._UI.headerNavigation.isOpen;
        const showHeader = () => window._UI.headerBar.show();
        const hideHeader = () => window._UI.headerBar.hide();
        const threshold = () => {
          return 10; // absolute thresould in px
          return getHeaderHeight();
        };
        // logic
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
      },
    ],
  });

  // ADDITIONAL UI STUFF -> disable window scroll when header-navigation is open
  (function () {
    let scrollPos = 0;
    const saveScrollPosition = () => {
      scrollPos = document.body.getBoundingClientRect().top;
    };
    const restoreScrollPosition = () => {
      window.scrollTo({ x: 0, y: scrollPos });
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
  })();

  // ADDITIONAL UI STUFF -> CSS Custom Prop Value Update -> Header Height
  (function () {
    const cssCustomPropName = "--live-all-header-stuffs-height";
    const getHeight = () => window._UI.headerBar.getHeight();
    const setHeightCustomProperty = () => {
      const height = getHeight();
      document.documentElement.style.setProperty(cssCustomPropName, `${height}px`);
    };
    setHeightCustomProperty();
    window.addEventListener("resize", throttle(setHeightCustomProperty, 200));
  })();
})(true);

/* =================================================== 
      SINGLE PRODUCT PAGE ONLY
=================================================== */
(function (iMustRun) {
  if (!iMustRun) return;

  // switch between mobile visual and desktop visual if screen width is enough wide
  (function () {
    const desktopMediaQuery = "(min-width: 768px)";
    const className = "is-large-view";
    const getEl = () => document.querySelector(".page-content .product");

    mediaQueryWatcher(desktopMediaQuery, (matches) => {
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
  if (!iMustRun) return;

  // filter bar panels open/close => TOGGLE CLASS VERSION
  // need also this file:
  // scss/_12_product-list-page__filter-bar-panel-with-css-transition.scss
  (function () {
    if (document.body.classList.contains("FILTER-BAR-PANEL__USE-GSAP")) return;

    const panels = document.querySelectorAll(".filter-bar [data-js-dropdown-target]");
    const triggers = document.querySelectorAll(".filter-bar [data-js-dropdown-trigger]");
    const closers = document.querySelectorAll(".filter-bar [data-js-dropdown-closer]");
    if (!panels.length) return;

    // build timeline for each panel
    const getKeyFrom = {
      panel: (el) => el.getAttribute("data-js-dropdown-target"),
      trigger: (el) => el.getAttribute("data-js-dropdown-trigger"),
      closer: (el) => el.getAttribute("data-js-dropdown-closer"),
    };
    const getPanelByKey = (key) => document.querySelector(`[data-js-dropdown-target*="${key}"]`);
    const isOpenClassName = "panel-is-opened";

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", function () {
        const key = getKeyFrom.trigger(this);
        const panel = getPanelByKey(key);
        panel.classList.toggle(isOpenClassName);
      });
    });
    closers.forEach((closers) => {
      closers.addEventListener("click", function () {
        const key = getKeyFrom.closer(this);
        const panel = getPanelByKey(key);
        panel.classList.remove(isOpenClassName);
      });
    });
  })();

  // filter bar panels open/close => GSAP ONLY VERSION
  (function () {
    if (!document.body.classList.contains("FILTER-BAR-PANEL__USE-GSAP")) return;

    const panels = document.querySelectorAll(".filter-bar [data-js-dropdown-target]");
    const triggers = document.querySelectorAll(".filter-bar [data-js-dropdown-trigger]");
    const closers = document.querySelectorAll(".filter-bar [data-js-dropdown-closer]");
    if (!panels.length) return;

    // function that build timeline for a filter-bar__panel
    const desktopMediaQuery = "(min-width: 768px)";
    const buildTimeline = (panelEl, isMobile) => {
      // add necessary static inline style
      panelEl.style.overflow = "hidden";
      panelEl.style.transformOrigin = "top";
      // reset inline css style animated by previous timeline
      gsap.to(panelEl, { duration: 0, yPercent: 0, scaleY: 1 });
      gsap.to(panelEl.children, { duration: 0, opacity: 1 });

      // build new timeline
      const options = { paused: true, defaults: { duration: 0.2 } };

      if (isMobile) {
        return gsap.timeline(options).from(panelEl, { yPercent: -100 }).from(panelEl.children, { opacity: 0 });
      } else {
        return gsap.timeline(options).from(panelEl, { scaleY: 0 }).from(panelEl.children, { opacity: 0 });
      }
    };

    // function that help to retrieve key from dom element, based on type
    const getKeyFrom = {
      panel: (el) => el.getAttribute("data-js-dropdown-target"),
      trigger: (el) => el.getAttribute("data-js-dropdown-trigger"),
      closer: (el) => el.getAttribute("data-js-dropdown-closer"),
    };

    // class that:
    // - keep timeline state
    // - rebuild timeline on screen size change
    // - expose methods for open/close panel
    function PanelOpener(panel) {
      const [getTimeline, setTimeline] = fakeUseRef();

      mediaQueryWatcher(desktopMediaQuery, (matches) => {
        const isMobile = !matches;
        setTimeline(buildTimeline(panel, isMobile));
      });

      return {
        isOpen: false,
        get openTimeline() {
          return getTimeline();
        },
        open() {
          if (this.isOpen) return;
          this.openTimeline.play();
          this.isOpen = true;
        },
        close() {
          if (!this.isOpen) return;
          this.openTimeline.reverse();
          this.isOpen = false;
        },
        toggle() {
          if (!this.isOpen) {
            this.open();
          } else {
            this.close();
          }
        },
      };
    }

    // for each panel ...
    const all = {};
    panels.forEach((panel) => {
      const key = getKeyFrom.panel(panel);
      all[key] = new PanelOpener(panel);
    });
    triggers.forEach((trigger) => {
      trigger.addEventListener("click", function () {
        const key = getKeyFrom.trigger(this);
        all[key].toggle();
      });
    });
    closers.forEach((closers) => {
      closers.addEventListener("click", function () {
        const key = getKeyFrom.closer(this);
        all[key].close();
      });
    });

    // save in global _UI object
    window._UI.filterBarPanels = all;
  })();

  // filter bar panels grid-visualization chooser
  (function () {
    const select = document.querySelector(".product-grid-visualization-chooser");
    if (!select) return;
    const options = [...select.querySelectorAll(".option")];
    const allOptionsClassSet = options.map((option) => option.getAttribute("data-js-option-classname"));
    const [getCurrent, setCurrent, onUpdateCurrent] = fakeUseState(0);

    const addOptionClassSet = (classesString) => {
      classesString.split(",").forEach((_class) => {
        document.body.classList.add(_class);
      });
    };
    const removeOptionClassSet = (classesString) => {
      classesString.split(",").forEach((_class) => {
        document.body.classList.remove(_class);
      });
    };

    const updateView = () => {
      //remove all options classes ...
      allOptionsClassSet.forEach(removeOptionClassSet);

      // add only current option classes ...
      addOptionClassSet(allOptionsClassSet[getCurrent()]);
    };

    options.forEach((option) => {
      option.addEventListener("click", function () {
        const thisOptionIndex = options.indexOf(this);
        setCurrent(thisOptionIndex);
      });
    });

    onUpdateCurrent.subscribe(updateView);
    updateView(); // on page load choose first one option
  })();
})(document.body.classList.contains("PRODUCT-LIST-PAGE"));
