'use strict';

(function () {

  // Рендер миниатюр
  var pictureTemplate = document.querySelector('#picture');
  var createSimilarPicturesFragment = function () {
    var template = pictureTemplate.content.querySelector('.picture__link');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      var pictureElement = template.cloneNode(true);
      var img = pictureElement.querySelector('.picture__img');

      img.src = data[i].url;
      img.setAttribute('index', data[i].index);
      pictureElement.querySelector('.picture__stat--comments').textContent = data[i].comments.length;
      pictureElement.querySelector('.picture__stat--likes').textContent = data[i].likes;

      fragment.appendChild(pictureElement);
    }
    return fragment;
  };

  var picturesNode = document.querySelector('.pictures');
  var picturesFragment = createSimilarPicturesFragment();
  picturesNode.appendChild(picturesFragment);

  // Открытие полноэкранного изображения
  var bigPictureNode = document.querySelector('.big-picture');

  var openBigPicture = function (event) {
    bigPictureNode.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
    window.setBigPictureContent(event.target);
  };

  var picturesImages = document.querySelectorAll('.picture__img');
  var addPicturesListeners = function () {
    for (var i = 0; i < picturesImages.length; i++) {
      picturesImages[i].addEventListener('click', function (event) {
        openBigPicture(event);
      });
      picturesImages[i].addEventListener('keydown', function (event){
        util.isEnterEvent(event, openBigPicture(event));
      });
    }
  };
  addPicturesListeners();

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
})();
