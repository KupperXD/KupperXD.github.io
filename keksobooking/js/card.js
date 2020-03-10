'use strict';

(function () {
  var typeHouseMap = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };
  var map = document.querySelector('.map');
  var mapFiltres = document.querySelector('.map__filters-container');
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var templatePhoto = document.querySelector('#card').content.querySelector('.popup__photo');

  var getFeaturesPopup = function (block, array) {
    var fragment = document.createDocumentFragment();

    block.innerHTML = '';
    if (array.length) {
      array.forEach(function (item) {
        var featuresItem = document.createElement('li');

        featuresItem.className = 'popup__feature popup__feature--' + item;
        fragment.appendChild(featuresItem);
      });
      block.appendChild(fragment);
    } else {
      block.classList.add('hidden');
    }
  };

  var getPhotoPopup = function (block, array) {
    var fragment = document.createDocumentFragment();

    block.innerHTML = '';
    if (array.length) {
      array.forEach(function (item) {
        var photoItem = templatePhoto.cloneNode();

        photoItem.src = item;
        fragment.appendChild(photoItem);
      });
      block.appendChild(fragment);
    } else {
      block.classList.add('hidden');
    }
  };

  var checkValue = function (value, block) {
    if (value) {
      return value;
    } else {
      block.classList.add('hidden');
    }
  };

  var removeCard = function () {
    var cardMap = map.querySelector('.map__card');

    if (cardMap) {
      cardMap.remove();
    }
  };

  var getStringCapacity = function (guests, rooms) {
    var string = (guests === 1) ? guests + ' гостя' : guests + ' гостей';

    switch (rooms) {
      case 1:
        string = rooms + ' комната для ' + string;
        break;
      case 2:
      case 3:
      case 4:
        string = rooms + ' комнаты для ' + string;
        break;
      default:
        string = rooms + ' комнат для ' + string;
    }

    return string;
  };

  var getPopup = function (obj) {
    var popupCard = templateCard.cloneNode(true);
    var popupTitle = popupCard.querySelector('.popup__title');
    var popupAdress = popupCard.querySelector('.popup__text--address');
    var popupPrice = popupCard.querySelector('.popup__text--price');
    var popupType = popupCard.querySelector('.popup__type');
    var popupCapacity = popupCard.querySelector('.popup__text--capacity');
    var popupCheck = popupCard.querySelector('.popup__text--time');
    var popupFeatures = popupCard.querySelector('.popup__features');
    var popupDescription = popupCard.querySelector('.popup__description');
    var popupPhotos = popupCard.querySelector('.popup__photos');
    var popupAvatar = popupCard.querySelector('.popup__avatar');
    var closeButton = popupCard.querySelector('.popup__close');

    popupTitle.textContent = checkValue(obj.offer.title, popupTitle);
    popupAdress.textContent = checkValue(obj.offer.adress, popupAdress);
    popupPrice.textContent = checkValue(obj.offer.price + '₽/ночь', popupPrice);
    popupType.textContent = checkValue(typeHouseMap[obj.offer.type], popupType);
    popupCapacity.textContent = checkValue(getStringCapacity(obj.offer.guests, obj.offer.rooms), popupCapacity);
    popupCheck.textContent = checkValue('Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout, popupCheck);
    getFeaturesPopup(popupFeatures, obj.offer.features);
    popupDescription.textContent = checkValue(obj.offer.description, popupDescription);
    getPhotoPopup(popupPhotos, obj.offer.photos);
    popupAvatar.src = checkValue(obj.author.avatar, popupAvatar);

    closeButton.addEventListener('click', function () {
      removeCard();
    });

    return popupCard;
  };

  var escCardHandler = function (evt) {
    if (evt.key === window.constans.ESC_KEY) {
      removeCard();
      document.removeEventListener('keydown', escCardHandler);
    }
  };

  var renderCard = function (obj) {
    var pinCard = getPopup(obj);

    removeCard();
    map.insertBefore(pinCard, mapFiltres);
    document.addEventListener('keydown', escCardHandler);
  };

  window.card = {
    render: renderCard,
    delete: removeCard
  };
})();
