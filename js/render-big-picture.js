'use strict';

(function () {
  var MAX_VISIBLE_COMMENTS = 5;
  var AVATAR_NUMBER_MIN = 1;
  var AVATAR_NUMBER_MAX = 6;
  var util = window.util;

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
  var loadCommentsButton = bigPicturePreview.querySelector('.social__loadmore');

  var createBigPictureCommentsFragment = function (activePictureObject) {
    util.clearNodeContent(commentsList);
    var bigPictureCommentsTemplate = commentTemplateElement.querySelector('.social__comment');
    var fragment = document.createDocumentFragment();
    var commentsQuantity = activePictureObject.comments.length;

    for (var i = 0; i < commentsQuantity; i++) {
      var newBigPictureComment = bigPictureCommentsTemplate.cloneNode(true);

      newBigPictureComment.querySelector('.social__picture').src = 'img/avatar-' + util.getRandomInteger(AVATAR_NUMBER_MIN, AVATAR_NUMBER_MAX) + '.svg';
      newBigPictureComment.querySelector('.social__text').textContent = activePictureObject.comments[i];

      fragment.appendChild(newBigPictureComment);
      if (i >= MAX_VISIBLE_COMMENTS) {
        newBigPictureComment.classList.add('visually-hidden');
      }
    }
    return fragment;
  };

  // Заполнение блока полноэкранного изображения контентом
  var bigPictureImg = bigPicturePreview.querySelector('.big-picture__img img');
  var bigPictureDescription = bigPicturePreview.querySelector('.social__caption');
  var bigPictureLikes = bigPicturePreview.querySelector('.likes-count');
  var bigPictureCommentsQuantity = bigPicturePreview.querySelector('.comments-count');

  var visibleCommentsQuantity = bigPicturePreview.querySelector('.social__comment-count').firstChild;
  var setVisibleCommentsQuantity = function (quantity) {
    visibleCommentsQuantity.textContent = quantity + ' из ';
  };

  // Обработчик демонстрации скрытых комментариев
  var invisibleCommentsCountFrom;
  var invisibleCommentsCountTo;
  var onLoadCommentsButtonClick = function () {
    if (invisibleCommentsCountTo >= commentsList.childElementCount) {
      invisibleCommentsCountTo = commentsList.childElementCount;
      loadCommentsButton.classList.add('hidden');
    }
    for (var i = invisibleCommentsCountFrom; i < invisibleCommentsCountTo; i++) {
      commentsList.childNodes[i].classList.remove('visually-hidden');
    }
    invisibleCommentsCountFrom = invisibleCommentsCountTo;
    invisibleCommentsCountTo += MAX_VISIBLE_COMMENTS;
    setVisibleCommentsQuantity(invisibleCommentsCountFrom);
  };

  window.renderBigPicture = function (activeElement, array) {
    var activeIndex = activeElement.getAttribute('data-index');
    var activePictureObject = array[activeIndex];

    bigPictureImg.src = activeElement.src;
    bigPictureDescription.textContent = activePictureObject.description;
    bigPictureLikes.textContent = activePictureObject.likes;
    bigPictureCommentsQuantity.textContent = activePictureObject.comments.length;

    var commentsFragment = createBigPictureCommentsFragment(activePictureObject);
    commentsList.appendChild(commentsFragment);

    invisibleCommentsCountFrom = MAX_VISIBLE_COMMENTS;
    invisibleCommentsCountTo = invisibleCommentsCountFrom + MAX_VISIBLE_COMMENTS;

    if (activePictureObject.comments.length <= MAX_VISIBLE_COMMENTS) {
      loadCommentsButton.classList.add('hidden');
      setVisibleCommentsQuantity(activePictureObject.comments.length);
    } else {
      loadCommentsButton.classList.remove('hidden');
      setVisibleCommentsQuantity(MAX_VISIBLE_COMMENTS);
      loadCommentsButton.addEventListener('click', onLoadCommentsButtonClick);
    }
  };
})();
