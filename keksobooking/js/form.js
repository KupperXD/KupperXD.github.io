'use strict';

(function () {
  var MAX_ROOM = 100;
  var MIN_GUEST = 0;
  var minPriceMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var filter = document.querySelector('.map__filters');
  var form = document.querySelector('.ad-form');
  var selectRoom = form.querySelector('#room_number');
  var selectGuests = form.querySelector('#capacity');
  var headingInput = form.querySelector('#title');
  var priceInput = form.querySelector('#price');
  var typeHousing = form.querySelector('#type');
  var timeInField = form.querySelector('#timein');
  var timeOutField = form.querySelector('#timeout');
  var buttonReset = form.querySelector('.ad-form__reset');
  var arrayFieldsets = [selectRoom, selectGuests, headingInput, priceInput, typeHousing, timeInField, timeOutField];

  var getBorder = function (item, color) {
    item.style.borderColor = color;
  };

  var getBorderInvalid = function () {
    arrayFieldsets.forEach(function (item) {
      item.addEventListener('invalid', function () {
        getBorder(item, 'red');
      });
    });
  };

  getBorderInvalid();

  var getValidQuantityRooms = function () {
    var roomsNumber = Number(selectRoom.value);
    var guestsNumber = Number(selectGuests.value);

    getBorder(selectRoom, 'red');

    if (roomsNumber === MAX_ROOM && guestsNumber !== MIN_GUEST) {
      selectRoom.setCustomValidity('100 комнат не для гостей!');
    } else if (roomsNumber !== MAX_ROOM && guestsNumber === MIN_GUEST) {
      selectRoom.setCustomValidity('Для 0 гостей подходит только 100 комнат');
    } else if (roomsNumber < guestsNumber) {
      selectRoom.setCustomValidity('Нужно больше комнат для ' + guestsNumber + ' гостей!');
    } else {
      selectRoom.setCustomValidity('');
      getBorder(selectRoom, 'green');
    }
  };

  var getValidHeading = function () {
    getBorder(headingInput, 'red');
    if (headingInput.validity.tooShort) {
      headingInput.setCustomValidity('Заголовок должен быть минимум из 30 символов');
    } else if (headingInput.validity.tooLong) {
      headingInput.setCustomValidity('Слишком длинный заголовок! Значение должно быть не более 100 символов!');
    } else if (headingInput.validity.valueMissing) {
      headingInput.setCustomValidity('Друг нужно бы заполнить заголовок!');
    } else {
      headingInput.setCustomValidity('');
      getBorder(headingInput, 'green');
    }
  };

  var getValidMinPrice = function () {
    var value = typeHousing.value;

    priceInput.min = minPriceMap[value].toString();
    priceInput.placeholder = minPriceMap[value].toString();
  };

  var inputPriceHandler = function () {
    var price = Number(priceInput.value);

    getBorder(priceInput, 'red');
    if (price < minPriceMap[typeHousing.value]) {
      priceInput.setCustomValidity('Цена должна быть не меньше чем ' + minPriceMap[typeHousing.value]);
    } else {
      priceInput.setCustomValidity('');
      getBorder(priceInput, 'green');
    }
  };

  var getTimeValid = function (evt) {
    var target = evt.target;
    var timeIn = timeInField.value;
    var timeOut = timeOutField.value;

    switch (target.id) {
      case 'timein':
        timeOutField.value = timeIn;
        break;
      default:
        timeInField.value = timeOut;
        break;
    }
  };

  priceInput.addEventListener('input', inputPriceHandler);

  headingInput.addEventListener('input', function (evt) {
    getValidHeading(evt);
  });

  timeInField.addEventListener('change', function (evt) {
    getTimeValid(evt);
  });

  timeOutField.addEventListener('change', function (evt) {
    getTimeValid(evt);
  });

  typeHousing.addEventListener('change', function (evt) {
    getValidMinPrice(evt);
  });

  selectRoom.addEventListener('change', function () {
    getValidQuantityRooms();
  });

  selectGuests.addEventListener('change', function () {
    getValidQuantityRooms();
  });

  var resetState = function () {
    form.reset();
    filter.reset();
    window.photo.reset();
    window.card.delete();

    arrayFieldsets.forEach(function (it) {
      getBorder(it, '');
    });

    getValidMinPrice();
  };

  var successHandler = function () {
    resetState();
    window.popup.addSuccess();
    window.map.blockPage();
  };

  var errorHandler = function (message) {
    resetState();
    window.popup.addError(message);
  };

  var clickButtonResetHandler = function (evt) {
    evt.preventDefault();
    resetState();
    window.map.blockPage();
  };

  form.addEventListener('submit', function (evt) {
    window.server.upload(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  });

  buttonReset.addEventListener('click', clickButtonResetHandler);
})();
