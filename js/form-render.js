'use strict';

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

window.formRender = {
  previewImage: previewImage,
  effectButtons: effectButtons,
  addFilter: addFilter
};
