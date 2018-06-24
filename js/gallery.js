'use strict';

(function () {

  var util = window.util;

  // Рендер миниатюр
  var pictureTemplate = document.querySelector('#picture');
  var createSimilarPicturesFragment = function () {
    var template = pictureTemplate.content.querySelector('.picture__link');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.gallery.length; i++) {
      var pictureElement = template.cloneNode(true);
      var img = pictureElement.querySelector('.picture__img');

      img.src = window.gallery[i].url;
      var index = i.toString();
      img.setAttribute('index', index);
      pictureElement.querySelector('.picture__stat--comments').textContent = window.gallery[i].comments.length;
      pictureElement.querySelector('.picture__stat--likes').textContent = window.gallery[i].likes;
      fragment.appendChild(pictureElement);
    }
    return fragment;
  };

  // Открытие полноэкранного изображения
  var bigPictureNode = document.querySelector('.big-picture');
  var openBigPicture = function (event) {
    bigPictureNode.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
    window.renderBigPicture(event.target);
  };

  var addPicturesListeners = function () {
    var picturesImages = document.querySelectorAll('.picture__link');
    for (var i = 0; i < picturesImages.length; i++) {
      picturesImages[i].addEventListener('click', function (event) {
        openBigPicture(event);
      });
    }
  };

  // Закрытие полноэкранного изображения
  var closeBigPicture = function () {
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
  var onLoadSuccess = function (picturesData) {
    window.gallery = picturesData;
    var picturesFragment = createSimilarPicturesFragment();
    picturesNode.appendChild(picturesFragment);
    addPicturesListeners();
  };

  var onLoadError = function (errorMessage) {
    window.util.showError(errorMessage);
  };

  window.backend.load(onLoadSuccess, onLoadError);
})();
