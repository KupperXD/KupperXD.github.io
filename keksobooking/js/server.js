'use strict';

(function () {
  var OK_STATUS = 200;
  var URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var errorMessageMap = {
    400: 'Неверный запрос',
    401: 'Пользователь не авторизован',
    403: 'Доступ запрещен',
    404: 'Ничего не найдено',
    500: 'Внутренняя ошибка сервера'
  };

  var createRequest = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        successHandler(xhr.response);
      } else {
        errorHandler('Код ошибки: ' + xhr.status + ' ' + errorMessageMap[xhr.status]);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Ошибка соединения! Проверь интернет друг!');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Прошло' + xhr.timeout + 'мс. Попробуй позже');
    });

    return xhr;
  };

  var load = function (successHandler, errorHandler) {
    var xhr = createRequest(successHandler, errorHandler);

    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var upload = function (data, successHandler, errorHandler) {
    var xhr = createRequest(successHandler, errorHandler);

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.server = {
    load: load,
    upload: upload
  };
})();
