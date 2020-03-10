'use strict';

(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var remove = function (popup) {
    return function () {
      document.querySelector(popup).remove();
    };
  };

  var removeSuccess = remove('.success');
  var removeError = remove('.error');

  var escSuccessHandler = function (evt) {
    if (evt.key === window.constans.ESC_KEY) {
      removeSuccess();
      document.removeEventListener('keydown', escSuccessHandler);
    }
  };

  var escErrorHandler = function (evt) {
    if (evt.key === window.constans.ESC_KEY) {
      removeError();
      document.removeEventListener('keydown', escErrorHandler);
    }
  };


  var addSuccess = function () {
    var success = successTemplate.cloneNode(true);

    main.prepend(success);
    document.addEventListener('keydown', escSuccessHandler);

    success.addEventListener('click', function () {
      removeSuccess();
    });
  };

  var addError = function (message) {
    var error = errorTemplate.cloneNode(true);
    var errorMessage = error.querySelector('.error__message');

    errorMessage.textContent = message;
    main.prepend(error);
    document.addEventListener('keydown', escErrorHandler);

    error.addEventListener('click', function () {
      removeError();
    });
  };

  window.popup = {
    addSuccess: addSuccess,
    addError: addError
  };
})();
