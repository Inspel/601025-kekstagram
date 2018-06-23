'use strict';

(function () {

  // Форма редактирования фотографий
  var MAX_SCALE = 453;
  var MAX_SCALE_VALUE = '100';

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

  var util = window.util;

  var fileForm = document.querySelector('.img-upload__form');
  var effectScale = fileForm.querySelector('.img-upload__scale');
  var scaleLine = effectScale.querySelector('.scale__line');
  var scalePin = effectScale.querySelector('.scale__pin');
  var scaleLevel = effectScale.querySelector('.scale__level');

  var scaleInput = fileForm.querySelector('.scale__value');
  scaleInput.removeAttribute('value');

  var previewImage = fileForm.querySelector('.img-upload__preview img');
  var addFilter = function (filter) {
    previewImage.className = 'effects__preview--' + filter;
  };

  var setScaleValueDefault = function () {
    scalePin.style.left = MAX_SCALE + 'px';
    scaleLevel.style.width = MAX_SCALE + 'px';
    scaleInput.value = MAX_SCALE_VALUE;
  };

  // Открывание/закрывание формы
  var effectButtons = fileForm.querySelectorAll('.effects__radio');
  var defaultEffect = (function () {
    for (var i = 0; i < effectButtons.length; i++) {
      if (effectButtons[i].checked) {
        break;
      }
    }
    return effectButtons[i].value;
  })();

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadOverlayOpen = function () {
    previewImage.removeAttribute('style');
    activeEffect = effects[defaultEffect];
    addFilter(defaultEffect);
    setScaleValueDefault();
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

  // Выбор активного эффекта
  var activeEffect;
  var onEffectRadioClick = function (event) {
    previewImage.removeAttribute('style');
    activeEffect = effects[event.target.value];
    effectScale.classList.toggle('hidden', event.target.value === 'none');
    addFilter(event.target.value);
    setScaleValueDefault();
  };

  var addEffectsListeners = function () {
    for (var i = 0; i < effectButtons.length; i++) {
      effectButtons[i].addEventListener('click', onEffectRadioClick);
    }
  };
  addEffectsListeners();

  // Перемещение пина и обработка его положения
  var setScaleValue = function () {
    var scalePinLeft = scalePin.style.left.toString();
    scaleInput.value = Math.round(scalePinLeft.slice(0, -2) * 100 / MAX_SCALE);
  };

  var effectDepth;
  var getEffectDepth = function () {
    var effectMaxValue = activeEffect.maxValue;
    effectDepth = (scaleInput.value * effectMaxValue) / 100;
  };

  var setEffectDepth = function () {
    if (activeEffect.units) {
      previewImage.style.filter = activeEffect.filter + '(' + effectDepth + activeEffect.units + ')';
    } else {
      previewImage.style.filter = activeEffect.filter + '(' + effectDepth + ')';
    }
  };

  scalePin.addEventListener('mousedown', function (event) {
    var startX = event.clientX;
    var scaleLineLeftOffset = scaleLine.getBoundingClientRect().x;

    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();
      var shift = startX - moveEvent.clientX;
      var scalePinLeftValue = startX - shift - scaleLineLeftOffset;

      if (scalePinLeftValue < 0 || scalePinLeftValue > MAX_SCALE) {
        return;
      }
      scalePin.style.left = scalePinLeftValue + 'px';
      scaleLevel.style.width = scalePinLeftValue + 'px';

      setScaleValue();
      getEffectDepth();
      setEffectDepth();
    };

    var onScalePinMouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onScalePinMouseup);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onScalePinMouseup);
  });

  var bigPictureText = document.querySelector('.img-upload__text');
  var hashtagInput = bigPictureText.querySelector('.text__hashtags');

  hashtagInput.addEventListener('input', window.onHashtagInput);

  hashtagInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onUploadOverlayEscPress);
  });

  hashtagInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onUploadOverlayEscPress);
  });

  // Комментарий
  var descriptionInput = bigPictureText.querySelector('.text__description');

  descriptionInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onUploadOverlayEscPress);
  });
  descriptionInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onUploadOverlayEscPress);
  });

  fileForm.addEventListener('submit', function (event) {
    window.upload(new FormData(fileForm), function (response) {
      imgUploadOverlay.classList.add('hidden');
    });
    event.preventDefault();
  });
})();
