'use strict';

(function () {
  var removeClass = function (block, nameClass) {
    document.querySelector(block).classList.remove(nameClass);
  };

  var addClass = function (block, nameClass) {
    document.querySelector(block).classList.add(nameClass);
  };

  var debounce = function (fn, interval) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fn.apply(null, parameters);
      }, interval);
    };
  };

  window.utils = {
    removeClass: removeClass,
    addClass: addClass,
    debounce: debounce,
  };
})();
