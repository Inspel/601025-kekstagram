'use strict';

(function () {
  var NEW_COUNT = 10;
  var DEBOUNCE_INTERVAL = 500;
  var RANDOM_CORRECTION_NUMBER = 0.5;

  var picturesNode = window.gallery.picturesNode;
  var filtersNode = window.gallery.filtersNode;

  var filtersForm = filtersNode.querySelector('.img-filters__form');
  var activeButton = filtersNode.querySelector('.img-filters__button--active');

  var activeFilter;

  var pictureFilter = {
    popular: function (data, nodes) {
      var array = [].slice.call(nodes).sort(function (left, right) {
        return left.firstElementChild.index - right.firstElementChild.index;
      });
      array.forEach(function (item) {
        picturesNode.appendChild(item);
        item.classList.remove('hidden');
      });
    },

    new: function (data, nodes) {
      var array = [].slice.call(nodes).sort(function () {
        return Math.random() - RANDOM_CORRECTION_NUMBER;
      });
      array.forEach(function (item) {
        picturesNode.appendChild(item);
      });
      for (var i = NEW_COUNT; i < nodes.length; i++) {
        nodes[i].classList.add('hidden');
      }
    },

    discussed: function (data, nodes) {
      var leftIndex;
      var rightIndex;
      var leftData;
      var rightData;
      var array = [].slice.call(nodes).sort(function (left, right) {
        leftIndex = parseInt(left.firstElementChild.index, 10);
        rightIndex = parseInt(right.firstElementChild.index, 10);
        leftData = data[leftIndex];
        rightData = data[rightIndex];
        return rightData.comments.length - leftData.comments.length;
      });
      array.forEach(function (item) {
        picturesNode.appendChild(item);
        item.classList.remove('hidden');
      });
    }
  };

  var activateFilter = function (filterFunction, data, nodes) {
    filterFunction(data, nodes);
  };

  // Обработчик нажатий на кнопки фильтров
  window.galleryFilters = function (galleryData, picturesImages) {

    var onFilterButtonClick = function (event) {

      if (event.target.type === 'button' && activeButton !== event.target) {
        activeButton.classList.remove('img-filters__button--active');
        activeButton = event.target;
        activeButton.classList.add('img-filters__button--active');

        var activeFilterName = activeButton.id.slice('filter-'.length);
        activeFilter = pictureFilter[activeFilterName];

        var lastTimeout = null;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        window.setTimeout(function () {
          picturesImages.forEach(function (currentValue) {
            currentValue.remove();
          });

          activateFilter(activeFilter, galleryData, picturesImages);
        }, DEBOUNCE_INTERVAL);
      }
    };
    filtersForm.addEventListener('click', onFilterButtonClick);
  };

})();
