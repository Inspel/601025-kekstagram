'use strict';

(function () {

  var util = window.util;

  // Рендер миниатюр
  var pictureTemplate = document.querySelector('#picture');

  var createSimilarPicturesFragment = function () {
    var template = pictureTemplate.content.querySelector('.picture__link');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < (activeFilter.quantity || activeFilter.sortedData.length); i++) {
      var pictureElement = template.cloneNode(true);
      var img = pictureElement.querySelector('.picture__img');

      img.src = activeFilter.sortedData[i].url;
      var index = i.toString();
      img.setAttribute('index', index);
      pictureElement.querySelector('.picture__stat--comments').textContent = activeFilter.sortedData[i].comments.length;
      pictureElement.querySelector('.picture__stat--likes').textContent = activeFilter.sortedData[i].likes;
      fragment.appendChild(pictureElement);
    }
    return fragment;
  };

  var renderPicturesMiniatures = function () {
    var picturesFragment = createSimilarPicturesFragment();
    picturesNode.appendChild(picturesFragment);
    addPicturesListeners();
  };

  // Открытие полноэкранного изображения
  var bigPictureNode = document.querySelector('.big-picture');
  var openBigPicture = function (event) {
    document.body.classList.add('modal-open');
    bigPictureNode.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
    window.renderBigPicture(event.target, activeFilter.sortedData);
  };
  var picturesImages = document.querySelectorAll('.picture__link');
  var addPicturesListeners = function () {
    picturesImages = document.querySelectorAll('.picture__link');
    for (var i = 0; i < picturesImages.length; i++) {
      picturesImages[i].addEventListener('click', function (event) {
        openBigPicture(event);
      });
    }
  };

  // Закрытие полноэкранного изображения
  var closeBigPicture = function () {
    document.body.removeAttribute('modal-open');
    bigPictureNode.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  var onBigPictureEscPress = function (event) {
    util.isEscEvent(event, closeBigPicture);
  };

  var bigPictureCloseButton = bigPictureNode.querySelector('.big-picture__cancel');
  var bigPictureCommentInput = bigPictureNode.querySelector('.social__footer-text');

  bigPictureCloseButton.addEventListener('click', closeBigPicture);
  bigPictureCommentInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onBigPictureEscPress);
  });
  bigPictureCommentInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onBigPictureEscPress);
  });

  // Получение данных и запуск рендера
  var picturesNode = document.querySelector('.pictures');
  var filtersNode = document.querySelector('.img-filters');
  var pictureFilter;
  var activeFilter;

  var onLoadSuccess = function (rawData) {

    pictureFilter = {
      popular: {
        sortedData: rawData
      },

      new: {
        quantity: 10,
        sortedData: (function () {
          return window.util.shuffleArray(rawData.slice());
        })()
      },

      discussed: {
        sortedData: (function () {
          return rawData.slice().sort(function (left, right) {
            if (left.comments.length > right.comments.length) {
              return 1;
            }
            if (left.comments.length < right.comments.length) {
              return -1;
            }
            return 0;
          });
        })()
      }
    };

    activeFilter = pictureFilter.popular;

    renderPicturesMiniatures();
    filtersNode.classList.remove('img-filters--inactive');
  };

  var onLoadError = function (errorMessage) {
    window.util.showError(errorMessage);
  };

  window.backend.load(onLoadSuccess, onLoadError);


  // Обработчик кнопок фильтров
  var filtersForm = filtersNode.querySelector('.img-filters__form');
  var filterButtons = filtersForm.querySelectorAll('.img-filters__button');
  var onFilterButtonClick = function (event) {
    filterButtons.forEach(function (currentValue) {
      currentValue.classList.remove('img-filters__button--active');
    });

    var activeButton = event.target;
    activeButton.classList.add('img-filters__button--active');

    picturesImages.forEach(function (currentValue) {
      currentValue.remove();
    });

    var activeFilterName = activeButton.getAttribute('id').slice(7);
    activeFilter = pictureFilter[activeFilterName];

    var lastTimeout;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    window.setTimeout(function () {
      renderPicturesMiniatures();
    }, 7000);
  };

  filtersForm.addEventListener('click', onFilterButtonClick);

})();
