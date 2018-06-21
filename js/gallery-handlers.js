'use strict';
(function () {

  var bigPictureNode = document.querySelector('.big-picture');

  // Открытие полноэкранного изображения
  var onPictureClick = function (event) {
    var activePicture = event.target;
    window.renderBigPicture(activePicture);

    bigPictureNode.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  var picturesElements = document.querySelectorAll('.picture__link');

  var addPicturesListeners = function () {
    for (var i = 0; i < picturesElements.length; i++) {
      picturesElements[i].addEventListener('click', onPictureClick);
    }
  };
  addPicturesListeners();

  // Закрытие полноэкранного изображения
  var bigPictureCloseButton = bigPictureNode.querySelector('.big-picture__cancel');
  var bigPictureCommentInput = bigPictureNode.querySelector('.social__footer-text');

  var closeBigPicture = function () {
    bigPictureNode.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  var onBigPictureEscPress = function (event) {
    util.isEscEvent(event, closeBigPicture);
  };

  bigPictureCloseButton.addEventListener('click', closeBigPicture);

  bigPictureCommentInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onBigPictureEscPress);
  });
  bigPictureCommentInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onBigPictureEscPress);
  });
})();
