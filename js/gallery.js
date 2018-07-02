'use strict';

(function () {

  var util = window.util;

  // Рендер миниатюр
  var pictureTemplate = document.querySelector('#picture');
  var galleryData;

  var template = pictureTemplate.content.querySelector('.picture__link');
  var createSimilarPicturesFragment = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < galleryData.length; i++) {
      var pictureElement = template.cloneNode(true);
      var img = pictureElement.querySelector('.picture__img');

      img.src = galleryData[i].url;
      var index = i.toString();
      img.setAttribute('data-index', index);
      pictureElement.querySelector('.picture__stat--comments').textContent = galleryData[i].comments.length;
      pictureElement.querySelector('.picture__stat--likes').textContent = galleryData[i].likes;
      fragment.appendChild(pictureElement);
    }
    return fragment;
  };

  var renderPicturesMiniatures = function () {
    var picturesFragment = createSimilarPicturesFragment();
    picturesNode.appendChild(picturesFragment);
    addPicturesListeners();
  };

  var picturesImages;
  var addPicturesListeners = function () {
    picturesImages = document.querySelectorAll('.picture__link');
    picturesImages.forEach(function (currentValue, i) {
      currentValue.addEventListener('click', function () {
        openBigPicture(picturesImages[i]);
      });
    });
  };

  // Получение данных и запуск рендера
  var picturesNode = document.querySelector('.pictures');
  var filtersNode = document.querySelector('.img-filters');
  var onLoadSuccess = function (data) {
    galleryData = data;

    renderPicturesMiniatures();
    filtersNode.classList.remove('img-filters--inactive');

    window.galleryFilters(data, picturesImages);
  };

  var onLoadError = function (errorMessage) {
    window.util.showError(errorMessage);
  };

  window.backend.load(onLoadSuccess, onLoadError);

  // Открытие полноэкранного изображения
  var bigPictureNode = document.querySelector('.big-picture');
  var openBigPicture = function (linkElement) {
    document.body.classList.add('modal-open');
    bigPictureNode.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
    window.renderBigPicture(linkElement.firstElementChild, galleryData);
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

})();
