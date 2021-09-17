export function throttle(func, delay) {
  let throttleTimer;

  const throttleFunction = function () {
    // If setTimeout is already scheduled, no need to do anything
    if (throttleTimer) {
      return;
    }

    // Schedule a setTimeout after delay seconds
    throttleTimer = setTimeout(function () {
      func();
      throttleTimer = null;
    }, delay);
  };

  return throttleFunction;
}

export function debounce(func, delay) {
  var timerId;

  // Debounce function: Input as function which needs to be debounced and delay is the debounced time in milliseconds
  var debounceFunction = function () {
    // Cancels the setTimeout method execution
    clearTimeout(timerId);

    // Executes the func after delay time.
    timerId = setTimeout(func, delay);
  };

  return debounceFunction;
}

export function ObserverScroll(options) {
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

export function duplicateElement({ selector, times = 1, elementModifierCallback }) {
  if (!selector) return; //abort
  const template = document.querySelector(selector);
  if (!template) {
    throw new Error(`
    Frontend Utilites - duplicateElement - Error :
      No el matches selector.
      selector => ${selector}
    `);
  }
  new Array(times).fill("not-null-value").map((unused, index) => {
    const clone = template.cloneNode(true);
    elementModifierCallback && elementModifierCallback(clone, index);
    template.parentElement.appendChild(clone);
  });
}

export function mediaQueryWatcher(mediaQueryString, onMatchChange) {
  // get a MediaQueryObject
  const mql = window.matchMedia(mediaQueryString);

  // when media query match status change run callback
  mql.addEventListener("change", function (e) {
    onMatchChange(e.matches);
  });

  // run once at page load
  onMatchChange(mql.matches);
}

export function fakeUseState(initialState) {
  let state = initialState;
  const setState = (newState) => {
    return new Promise((resolve, reject) => {
      // update state
      state = newState;
      // resolve so subscribed tasks can be exexcuted
      resolve(state);
    });
  };
  const getState = () => state;
  return [getState, setState];
}

export function fakeUseRef(intialValue) {
  let ref = {
    current: intialValue || null,
  };
  const getRef = () => ref.current;
  const updateRef = (newValue) => {
    ref.current = newValue;
  };

  return [getRef, updateRef];
}

export function removeCSSInlineStyle(el) {
  el.removeAttribute("style");
}
