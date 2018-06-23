'use strict';

(function () {

  var util = window.util;
  var data = window.data;

  var pictureTemplate = document.querySelector('#picture');
  var commentTemplateElement = (function () {
    var commentTemplate = document.createElement('template');
    commentTemplate.id = 'comments';
    document.body.insertBefore(commentTemplate, pictureTemplate);
    var commentsNode = document.querySelector('.social__comment');
    commentTemplate.appendChild(commentsNode);

    return commentTemplate;
  })();


  var bigPicturePreview = document.querySelector('.big-picture__preview');
  var commentsList = bigPicturePreview.querySelector('.social__comments');
  var createBigPictureCommentsFragment = function (activePictureObject) {
    util.clearNodeContent(commentsList);
    var bigPictureCommentsTemplate = commentTemplateElement.querySelector('.social__comment');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < activePictureObject.comments.length; i++) {
      var newBigPictureComment = bigPictureCommentsTemplate.cloneNode(true);

      newBigPictureComment.querySelector('.social__picture').src = 'img/avatar-' + util.getRandomInteger(1, 6) + '.svg';
      newBigPictureComment.querySelector('.social__text').textContent = activePictureObject.comments[i];

      fragment.appendChild(newBigPictureComment);
    }
    return fragment;
  };

  var bigPictureImg = bigPicturePreview.querySelector('.big-picture__img img');
  var bigPictureDescription = bigPicturePreview.querySelector('.social__caption');
  var bigPictureLikes = bigPicturePreview.querySelector('.likes-count');
  var bigPictureCommentsQuantity = bigPicturePreview.querySelector('.comments-count');

  window.renderBigPicture = function (activeElement) {
    var activeIndex = activeElement.getAttribute('index');
    var activePictureObject = data[activeIndex];
    bigPictureImg.src = activeElement.src;
    bigPictureDescription.textContent = activePictureObject.description;
    bigPictureLikes.textContent = activePictureObject.likes;
    bigPictureCommentsQuantity.textContent = activePictureObject.comments.length;

    var commentsFragment = createBigPictureCommentsFragment(activePictureObject);
    commentsList.appendChild(commentsFragment);
  };
})();
