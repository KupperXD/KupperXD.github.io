'use strict';

(function () {
  var adverts = [];

  var successHandler = function (data) {
    adverts = data;
    window.pin.render(window.filter(adverts));
  };

  var errorHandler = function (message) {
    window.popup.addError(message);
  };

  var loadAdverts = function () {
    window.server.load(successHandler, errorHandler);
  };

  var updateAdverts = function () {
    window.pin.delete();
    window.card.delete();
    window.pin.render(window.filter(adverts));
  };

  window.data = {
    load: loadAdverts,
    update: updateAdverts
  };
})();
