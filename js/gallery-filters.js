'use strict';

(function () {
  var picturesNode = document.querySelector('.pictures');
  var filtersNode = document.querySelector('.img-filters');

  var filtersForm = filtersNode.querySelector('.img-filters__form');
  var activeButton = filtersNode.querySelector('.img-filters__button--active');

  var activeFilter;

  var pictureFilter = {
    popular: function (data, nodes) {
      var array = [].slice.call(nodes).sort(function (left, right) {
        return left.firstElementChild.getAttribute('index') - right.firstElementChild.getAttribute('index');
      });
      array.forEach(function (item) {
        picturesNode.appendChild(item);
        item.classList.remove('hidden');
      });
    },

    new: function (data, nodes) {
      var NEW_COUNT = 10;
      var array = [].slice.call(nodes).sort(function () {
        return Math.random() - 0.5;
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
        leftIndex = parseInt(left.firstElementChild.getAttribute('index'), 10);
        rightIndex = parseInt(right.firstElementChild.getAttribute('index'), 10);
        leftData = data[leftIndex];
        rightData = data[rightIndex];
        return leftData.comments.length - rightData.comments.length;
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

        var activeFilterName = activeButton.getAttribute('id').slice('filter-'.length);
        activeFilter = pictureFilter[activeFilterName];

        var DEBOUNCE_INTERVAL = 500; // ms
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
