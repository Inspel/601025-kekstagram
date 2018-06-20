'use strict';

// Полноэкранное изображение

// Наполнение оверлея полноэкранного изображения контентом

var createCommentTemplate = function () {
  var commentTemplate = document.createElement('template');
  commentTemplate.id = 'comments';
  document.body.insertBefore(commentTemplate, util.pictureTemplate);
  var commentsNode = document.querySelector('.social__comment');
  commentTemplate.appendChild(commentsNode);

  return commentTemplate
};
var commentTemplateElement = createCommentTemplate();

var bigPicture = document.querySelector('.big-picture');

var renderBigPicture = function (activeElement) {

  var getActivePictureIndex = function () {
    var pictureUrl = activeElement.src;
    console.log(pictureUrl.match());
    console.log(data[0]);
    for (var i = 0; i < data.length; i++) {
      if (pictureUrl = data[i].src) {

        return data[i];
      }
    }
  };

  var index = getActivePictureIndex();

  var setBigPictureContent = function () {
    var bigPictureImg = document.querySelector('.big-picture__img img');
    bigPictureImg.src = activeElement.src;

    var bigPictureLikes = bigPicture.querySelector('.likes-count');
    bigPictureLikes.textContent = data[index].likes;

    var bigPictureCommentsQuantity = bigPicture.querySelector('.comments-count');
    bigPictureCommentsQuantity.textContent = data[index].comments.length;

    var commentsList = document.querySelector('.social__comments');
    util.clearNodeContent(commentsList);

    var createBigPictureCommentsFragment = function () {
      var bigPictureCommentsTemplate = commentTemplateElement.querySelector('.social__comment');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < data[index].comments.length; i++) {
        var bigPictureComment = bigPictureCommentsTemplate.cloneNode(true);

        bigPictureComment.querySelector('.social__picture').src = 'img/avatar-' + util.getRandomInteger(1, 6) + '.svg';
        bigPictureComment.querySelector('.social__text').textContent = data[index].comments[i];

        fragment.appendChild(bigPictureComment);
      }
      return fragment;

    };
    var commentsFragment = createBigPictureCommentsFragment();
    commentsList.appendChild(commentsFragment);
  };

  setBigPictureContent();
};

// Обработчик клика по маленькому изображению
var onPictureClick = function (event) {

  var activePicture = event.target;
  renderBigPicture(activePicture);

  bigPicture.classList.remove('hidden');
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
var bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
var bigPictureCommentInput = bigPicture.querySelector('.social__footer-text');

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
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

// Форма редактирования фотографий

// Открывание/закрывание формы
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var uploadCancelButton = document.querySelector('.img-upload__cancel');
var fileForm = document.querySelector('.img-upload__form');
var uploadFile = fileForm.elements['filename'];

var uploadOverlayOpen = function () {
  setScaleDefault();
  var defaultEffect = getEffectType();
  addFilter(defaultEffect);
  activateEffect(defaultEffect);
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayEscPress);
};

var uploadOverlayClose = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onUploadOverlayEscPress);
  fileForm.reset();
};

var onUploadOverlayEscPress = function (event) {
  util.isEscEvent(event, uploadOverlayClose);
};

uploadFile.addEventListener('change', uploadOverlayOpen);

uploadCancelButton.addEventListener('click', uploadOverlayClose);

// Применение эффекта для изображения
var MAX_SCALE = 453;

var effects = {
  none: {},
  chrome: {
    filter: 'grayscale',
    maxValue: 1
  },
  sepia: {
    filter: 'sepia',
    maxValue: 1
  },
  marvin: {
    filter: 'invert',
    maxValue: 100,
    units: '%'
  },
  phobos: {
    filter: 'blur',
    maxValue: 3,
    units: 'px'
  },
  heat: {
    filter: 'brightness',
    maxValue: 3
  }
};

var previewImage = fileForm.querySelector('.img-upload__preview img');
var effectButtons = document.getElementsByName('effect');

var getEffectType = function () {
  for (var i = 0; i < effectButtons.length; i++) {
    if (effectButtons[i].checked) {
      break;
    }
  }
  return effectButtons[i].value;
};

var addFilter = function (filter) {
  previewImage.className = 'effects__preview--' + filter;
};

var onEffectRadioClick = function (event) {
  previewImage.removeAttribute('style');
  var activeEffect = event.target.value;
  effectScale.classList.toggle('hidden', activeEffect === 'none');
  addFilter(activeEffect);
  setScaleDefault();
  activateEffect(activeEffect);
};

var addEffectsListeners = function () {
  for (var i = 0; i < effectButtons.length; i++) {
    effectButtons[i].addEventListener('click', onEffectRadioClick);
  }
};
addEffectsListeners();


// Перемещение пина и обработка его положения
var effectScale = fileForm.querySelector('.img-upload__scale');
var scaleLine = effectScale.querySelector('.scale__line');
var scalePin = effectScale.querySelector('.scale__pin');
var scaleLevel = effectScale.querySelector('.scale__level');

var setScaleDefault = function () {
  scalePin.style.left = MAX_SCALE + 'px';
  scaleLevel.style.width = MAX_SCALE + 'px';
};

var getScaleValue = function () {
  var scalePinLeft = scalePin.style.left.toString();
  return (scalePinLeft.slice(0, -2) * 100) / MAX_SCALE;
};

var getEffectDepth = function (effectName) {
  var effectMaxValue = effects[effectName].maxValue;
  return (getScaleValue() * effectMaxValue) / 100;

};

var setEffectDepth = function (effectType, effectDepthValue) {
  if (effectType.units) {
    previewImage.style.filter = effectType.filter + '(' + effectDepthValue + effectType.units + ')';
  } else {
    previewImage.style.filter = effectType.filter + '(' + effectDepthValue + ')';
  }
};

var activateEffect = function (effectName) {
  var effectDepth = getEffectDepth(effectName);
  effectScale.querySelector('.scale__value').value = getScaleValue();
  setEffectDepth(effects[effectName], effectDepth);
};

scalePin.addEventListener('mousedown', function (event) {
  var startX = event.clientX;
  var scaleLineLeftOffset = scaleLine.getBoundingClientRect().x;
  var activeEffect = previewImage.classList.value.split('effects__preview--')[1];

  var onMouseMove = function (moveEvent) {
    moveEvent.preventDefault();
    var shift = startX - moveEvent.clientX;
    var scalePinLeftValue = startX - shift - scaleLineLeftOffset;

    if (scalePinLeftValue < 0 || scalePinLeftValue > MAX_SCALE) {
      return;
    }

    scalePin.style.left = scalePinLeftValue + 'px';

    scaleLevel.style.width = scalePinLeftValue + 'px';

    activateEffect(activeEffect);
  };

  var onScalePinMouseup = function () {

    activateEffect(activeEffect);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onScalePinMouseup);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onScalePinMouseup);
});

// Хэштеги и комментарий
// Хэштеги
var bigPictureText = fileForm.querySelector('.img-upload__text');
var hashtagInput = bigPictureText.querySelector('.text__hashtags');

var onHashtagInput = function (event) {
  var target = event.target;
  var hashtagsArray = target.value.split(/\s/);

  var testFirstHash = function () {
    for (var i = 0; i < hashtagsArray.length; i++) {
      if (hashtagsArray[i][0] !== '#') {
        return i + 1;
      }
    }
    return true;
  };

  var testHashtagContent = function () {
    for (var i = 0; i < hashtagsArray.length; i++) {
      if (hashtagsArray[i] === '#') {
        return i + 1;
      }
    }
    return true;
  };

  var testHashtagLength = function () {
    for (var i = 0; i < hashtagsArray.length; i++) {
      if (hashtagsArray[i].length > 20) {
        return i + 1;
      }
    }
    return true;
  };

  var testSimilarHashtags = function () {
    var currentHashtag = hashtagsArray[0];
    for (var i = 1; i < hashtagsArray.length; i++) {
      if (hashtagsArray[i].toUpperCase() === currentHashtag.toUpperCase()) {
        return false;
      }
      currentHashtag = hashtagsArray[i];
    }
    return true;
  };

  switch (false) {

    case typeof testFirstHash() === 'boolean':
      target.setCustomValidity('Начни ' + testFirstHash() + '-й хэштег с решетки!');
      break;

    case typeof testHashtagContent() === 'boolean':
      target.setCustomValidity('У хэштэга ' + testHashtagContent() + ' решетка очень одинока!');
      break;

    case typeof testHashtagLength() === 'boolean':
      target.setCustomValidity(testHashtagLength() + '-й хэштег слишком длинный');
      break;

    case testSimilarHashtags():
      target.setCustomValidity('Пусть все хэштеги будут разными!');
      break;

    case hashtagsArray.length <= 5:
      target.setCustomValidity('Не больше 5 хэштегов');
      break;

    default:
      target.setCustomValidity('');
  }
};

hashtagInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onUploadOverlayEscPress);
});

hashtagInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onUploadOverlayEscPress);
});

hashtagInput.addEventListener('input', onHashtagInput);

// Комментарий
var descriptionInput = bigPictureText.querySelector('.text__description');

descriptionInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onUploadOverlayEscPress);
});
descriptionInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onUploadOverlayEscPress);
});

