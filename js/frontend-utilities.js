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
