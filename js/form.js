'use strict';

(function () {
  var PERCENT_DIVIDER = 100;

  // Форма редактирования фотографий

  var effects = {
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

  var scaleInput = fileForm.querySelector('.scale__value');

  var previewImage = fileForm.querySelector('.img-upload__preview img');
  var addFilter = function (filter) {
    previewImage.className = 'effects__preview--' + filter;
  };

  // Открывание/закрывание формы
  var effectButtons = fileForm.querySelectorAll('.effects__radio');
  var defaultEffect = (function () {
    var defaultEffectInput = [].slice.call(effectButtons).filter(function (currentValue) {
      return currentValue.checked;
    });
    return defaultEffectInput[0].value;
  })();

  var imgUploadOverlay = fileForm.querySelector('.img-upload__overlay');
  var previewImageUpload = fileForm.querySelector('.img-upload__input');
  var uploadOverlayOpen = function () {
    previewImage.removeAttribute('style');
    activeEffect = effects[defaultEffect];
    addFilter(defaultEffect);
    window.slider();
    window.resize();
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadOverlayEscPress);
    previewImage.src = URL.createObjectURL(previewImageUpload.files[0]);
  };

  var uploadOverlayClose = function () {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onUploadOverlayEscPress);
    fileForm.reset();
  };

  var onUploadOverlayEscPress = function (event) {
    util.isEscEvent(event, uploadOverlayClose);
  };

  var uploadFileInput = fileForm.elements['filename'];
  uploadFileInput.addEventListener('change', function () {
    uploadOverlayOpen();
  });

  var uploadCancelButton = imgUploadOverlay.querySelector('.img-upload__cancel');
  uploadCancelButton.addEventListener('click', function () {
    uploadOverlayClose();
  });

  // Выбор активного эффекта
  var activeEffect;
  var onEffectRadioClick = function (event) {
    previewImage.removeAttribute('style');
    activeEffect = (effects[event.target.value] || 'none');
    effectScale.classList.toggle('hidden', event.target.value === 'none');
    addFilter(event.target.value);
    window.slider();
  };

  effectButtons.forEach(function (currentValue) {
    currentValue.addEventListener('click', onEffectRadioClick);
  });

  // Перемещение пина и обработка его положения

  var effectDepth;
  var getEffectDepth = function () {
    var effectMaxValue = activeEffect.maxValue;
    effectDepth = (scaleInput.value * effectMaxValue) / PERCENT_DIVIDER;
  };

  var setEffectDepth = function () {
    if (activeEffect.units) {
      previewImage.style.filter = activeEffect.filter + '(' + effectDepth + activeEffect.units + ')';
    } else {
      previewImage.style.filter = activeEffect.filter + '(' + effectDepth + ')';
    }
  };

  window.form = {
    fileForm: fileForm,
    previewImage: previewImage,
    uploadOverlayClose: uploadOverlayClose,

    activateFilter: function () {
      getEffectDepth();
      setEffectDepth();
    }
  };

  // Комментарий
  var bigPictureText = imgUploadOverlay.querySelector('.img-upload__text');
  var hashtagInput = bigPictureText.querySelector('.text__hashtags');

  hashtagInput.addEventListener('input', window.onHashtagInput);

  hashtagInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onUploadOverlayEscPress);
  });

  hashtagInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onUploadOverlayEscPress);
  });

  var descriptionInput = bigPictureText.querySelector('.text__description');

  descriptionInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onUploadOverlayEscPress);
  });
  descriptionInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onUploadOverlayEscPress);
  });
})();
