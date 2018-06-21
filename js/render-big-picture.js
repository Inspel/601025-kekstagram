'use strict';

(function () {
  var createCommentTemplate = function () {
    var commentTemplate = document.createElement('template');
    commentTemplate.id = 'comments';
    document.body.insertBefore(commentTemplate, util.pictureTemplate);
    var commentsNode = document.querySelector('.social__comment');
    commentTemplate.appendChild(commentsNode);

    return commentTemplate;
  };
  var commentTemplateElement = createCommentTemplate();

  var bigPicture = document.querySelector('.big-picture__preview');

  window.renderBigPicture = function (activeElement) {

    function getPictureIndex(node) {
      var picturesContainer = document.querySelector('.pictures');
      var picturesLinks = picturesContainer.querySelectorAll('.picture__link');
      var notPicturesQuantity = picturesContainer.childElementCount - picturesLinks.length;
      var index = 0;

      while ((node = node.previousElementSibling)) {
        index++;
      }
      return index - notPicturesQuantity;
    }

    var activePictureObject = data[getPictureIndex(activeElement.parentNode)];

    var setBigPictureContent = function () {
      var bigPictureImg = document.querySelector('.big-picture__img img');
      bigPictureImg.src = activeElement.src;

      var bigPictureDescription = bigPicture.querySelector('.social__caption');
      bigPictureDescription.textContent = activePictureObject.description;

      var bigPictureLikes = bigPicture.querySelector('.likes-count');
      bigPictureLikes.textContent = activePictureObject.likes;

      var bigPictureCommentsQuantity = bigPicture.querySelector('.comments-count');
      bigPictureCommentsQuantity.textContent = activePictureObject.comments.length;

      var commentsList = document.querySelector('.social__comments');
      util.clearNodeContent(commentsList);

      var createBigPictureCommentsFragment = function () {
        var bigPictureCommentsTemplate = commentTemplateElement.querySelector('.social__comment');
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < activePictureObject.comments.length; i++) {
          var bigPictureComment = bigPictureCommentsTemplate.cloneNode(true);

          bigPictureComment.querySelector('.social__picture').src = 'img/avatar-' + util.getRandomInteger(1, 6) + '.svg';
          bigPictureComment.querySelector('.social__text').textContent = activePictureObject.comments[i];

          fragment.appendChild(bigPictureComment);
        }
        return fragment;

      };
      var commentsFragment = createBigPictureCommentsFragment();
      commentsList.appendChild(commentsFragment);
    };

    setBigPictureContent();
  };
})();
