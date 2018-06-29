'use strict';

(function () {

  var util = window.util;
  var MAX_COMMENTS = 5;

  // Создание шаблона для комментария
  var pictureTemplate = document.querySelector('#picture');

  var commentTemplateElement = (function () {
    var commentTemplate = document.createElement('template');
    commentTemplate.id = 'comments';
    document.body.insertBefore(commentTemplate, pictureTemplate);
    var commentsNode = document.querySelector('.social__comment');
    commentTemplate.appendChild(commentsNode);
    return commentTemplate;
  })();

  // Создание фрагмента с комментариями
  var bigPicturePreview = document.querySelector('.big-picture__preview');
  var commentsList = bigPicturePreview.querySelector('.social__comments');

  var createBigPictureCommentsFragment = function (activePictureObject) {
    util.clearNodeContent(commentsList);
    var bigPictureCommentsTemplate = commentTemplateElement.querySelector('.social__comment');
    var fragment = document.createDocumentFragment();
    var commentsQuantity = activePictureObject.comments.length;
    var fragmentCommentsQuantity = (commentsQuantity < MAX_COMMENTS ? commentsQuantity : MAX_COMMENTS);

    for (var i = 0; i < fragmentCommentsQuantity; i++) {
      var newBigPictureComment = bigPictureCommentsTemplate.cloneNode(true);

      newBigPictureComment.querySelector('.social__picture').src = 'img/avatar-' + util.getRandomInteger(1, 6) + '.svg';
      newBigPictureComment.querySelector('.social__text').textContent = activePictureObject.comments[i];

      fragment.appendChild(newBigPictureComment);
    }
    return fragment;
  };

  // Заполнение блока полноэкранного изображения контентом
  var bigPictureImg = bigPicturePreview.querySelector('.big-picture__img img');
  var bigPictureDescription = bigPicturePreview.querySelector('.social__caption');
  var bigPictureLikes = bigPicturePreview.querySelector('.likes-count');
  var bigPictureCommentsQuantity = bigPicturePreview.querySelector('.comments-count');

  window.renderBigPicture = function (activeElement, array) {
    var activeIndex = activeElement.getAttribute('index');

    var activePictureObject = array[activeIndex];

    bigPictureImg.src = activeElement.src;
    bigPictureDescription.textContent = activePictureObject.description;
    bigPictureLikes.textContent = activePictureObject.likes;
    bigPictureCommentsQuantity.textContent = activePictureObject.comments.length;

    var commentsFragment = createBigPictureCommentsFragment(activePictureObject);
    commentsList.appendChild(commentsFragment);
  };
})();
