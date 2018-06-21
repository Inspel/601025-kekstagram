'use strict';

// Форма редактирования фотографий
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

// Применение эффекта для изображения
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

// Открывание/закрывание формы
var fileForm = document.querySelector('.img-upload__form');

var effectButtons = document.getElementsByName('effect');
var defaultEffect = (function () {
  for (var i = 0; i < effectButtons.length; i++) {
    if (effectButtons[i].checked) {
      break;
    }
  }
  return effectButtons[i].value;
})();

var previewImage = fileForm.querySelector('.img-upload__preview img');

var addFilter = function (filter) {
  previewImage.className = 'effects__preview--' + filter;
};

var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var uploadOverlayOpen = function () {
  previewImage.removeAttribute('style');
  setScaleDefault();
  addFilter(defaultEffect);
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

var uploadFile = fileForm.elements['filename'];
uploadFile.addEventListener('change', uploadOverlayOpen);

var uploadCancelButton = document.querySelector('.img-upload__cancel');
uploadCancelButton.addEventListener('click', uploadOverlayClose);

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
var bigPictureText = document.querySelector('.img-upload__text');
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

