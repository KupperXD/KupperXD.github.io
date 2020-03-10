'use strict';

(function () {
  var PRICE = {
    min: 10000,
    max: 50000
  };
  var filtersMap = document.querySelector('.map__filters');

  var priceRunAway = {
    low: function (price) {
      return price < PRICE.min;
    },
    middle: function (price) {
      return price >= PRICE.min && price < PRICE.max;
    },
    high: function (price) {
      return price >= PRICE.max;
    }
  };

  var filterByPrice = function (itemList, priceValue) {
    return itemList.filter(function (item) {
      return priceRunAway[priceValue](item.offer.price);
    });
  };

  var filterByFeatures = function (itemList, value) {
    return itemList.filter(function (item) {
      return item.offer.features.includes(value);
    });
  };

  var filterValue = function (itemList, value, filterType) {
    return itemList.filter(function (item) {
      return item.offer[value].toString() === filterType;
    });
  };

  var getFilterData = function (data) {
    var filterList = filtersMap.querySelectorAll('.map__filter');
    var featuresChecked = filtersMap.querySelectorAll('input[type="checkbox"]:checked');

    filterList = Array.from(filterList).filter(function (item) {
      return item.value !== 'any';
    });

    var filterData = data.slice();

    filterList.forEach(function (item) {
      switch (item.id) {
        case 'housing-price':
          filterData = filterByPrice(filterData, item.value);
          break;
        case 'housing-type':
          filterData = filterValue(filterData, 'type', item.value);
          break;
        case 'housing-rooms':
          filterData = filterValue(filterData, 'rooms', item.value);
          break;
        case 'housing-guests':
          filterData = filterValue(filterData, 'guests', item.value);
          break;
      }
    });

    featuresChecked.forEach(function (item) {
      filterData = filterByFeatures(filterData, item.value);
    });

    return filterData;
  };

  window.filter = getFilterData;
})();
