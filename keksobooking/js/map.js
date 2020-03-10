'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var LEFT_MOUSE_CLICK = 0;
  var INDENTATION_PIN = 52;
  var HALF_SIZE_PIN = 32;
  var INDENTATION_DEFAULT = 0;
  var DEBOUNCE_INTERVAL = 500;
  var NUMBER_DECIMAL_SYSTEM = 10;
  var Coords = {
    MIN_Y: 46,
    MAX_Y: 546,
    MIN_X: -32,
    MAX_X: 1167
  };
  var defaultCoords = {
    x: 570,
    y: 375
  };
  var mainMapPin = document.querySelector('.map__pin--main');
  var fieldSetsForm = document.querySelectorAll('fieldset');
  var filterMap = document.querySelectorAll('.map__filter');
  var adressInput = document.querySelector('#address');
  var filterForm = document.querySelector('.map__filters');
  var active = false;

  var setDefaultCoords = function () {
    mainMapPin.style.left = defaultCoords.x + 'px';
    mainMapPin.style.top = defaultCoords.y + 'px';
  };

  var setDisabled = function (fieldset, value) {
    fieldset.forEach(function (item) {
      item.disabled = value;
    });
  };

  var getCoordinate = function () {
    var x = parseInt(mainMapPin.style.left, NUMBER_DECIMAL_SYSTEM);
    var y = parseInt(mainMapPin.style.top, NUMBER_DECIMAL_SYSTEM);

    return {
      x: x,
      y: y
    };
  };

  var writeInputAdress = function (indentation) {
    var coordinate = getCoordinate();
    var coordinateX = coordinate.x + HALF_SIZE_PIN;
    var coordinateY = coordinate.y + HALF_SIZE_PIN + indentation;

    adressInput.value = coordinateX + ', ' + coordinateY;
  };

  setDisabled(fieldSetsForm, true);
  setDisabled(filterMap, true);
  writeInputAdress(INDENTATION_DEFAULT);

  var blockPage = function () {
    window.utils.addClass('.map', 'map--faded');
    window.utils.addClass('.ad-form', 'ad-form--disabled');
    window.pin.delete();
    setDisabled(fieldSetsForm, true);
    setDisabled(filterMap, true);
    writeInputAdress(INDENTATION_DEFAULT);
    mainMapPin.addEventListener('keydown', pinKeyDownHandler);
    setDefaultCoords();
    active = false;
  };

  var activatePage = function () {
    window.utils.removeClass('.map', 'map--faded');
    window.utils.removeClass('.ad-form', 'ad-form--disabled');
    setDisabled(fieldSetsForm, false);
    setDisabled(filterMap, false);
    window.data.load();
    writeInputAdress(INDENTATION_PIN);
    mainMapPin.removeEventListener('keydown', pinKeyDownHandler);
    active = true;
  };

  var pinKeyDownHandler = function (evt) {
    if (evt.key === ENTER_KEY) {
      activatePage();
    }
  };

  mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (evt.button === LEFT_MOUSE_CLICK) {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var pinMoveMouseHandler = function (moveEvt) {
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        var currentCoords = {
          x: mainMapPin.offsetLeft - shift.x,
          y: mainMapPin.offsetTop - shift.y
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY,
        };

        mainMapPin.style.left = currentCoords.x + 'px';
        mainMapPin.style.top = currentCoords.y + 'px';

        if (Coords.MIN_Y > currentCoords.y) {
          mainMapPin.style.top = Coords.MIN_Y + 'px';
        }

        if (Coords.MAX_Y < currentCoords.y) {
          mainMapPin.style.top = Coords.MAX_Y + 'px';
        }

        if (Coords.MIN_X > currentCoords.x) {
          mainMapPin.style.left = Coords.MIN_X + 'px';
        }

        if (Coords.MAX_X < currentCoords.x) {
          mainMapPin.style.left = Coords.MAX_X + 'px';
        }
        writeInputAdress(INDENTATION_PIN);
      };

      var pinUpMouseHandler = function (upEvt) {
        upEvt.preventDefault();

        if (!active) {
          activatePage();
        }

        document.removeEventListener('mousemove', pinMoveMouseHandler);
        document.removeEventListener('mouseup', pinUpMouseHandler);
      };

      document.addEventListener('mousemove', pinMoveMouseHandler);
      document.addEventListener('mouseup', pinUpMouseHandler);
    }
  });


  var changeFilterHandler = function () {
    window.utils.debounce(window.data.update, DEBOUNCE_INTERVAL)();
  };

  mainMapPin.addEventListener('keydown', pinKeyDownHandler);
  filterForm.addEventListener('change', changeFilterHandler);

  window.map = {
    blockPage: blockPage
  };
})();
