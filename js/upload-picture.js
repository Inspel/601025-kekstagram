'use strict';

(function () {

// Отправление данных формы
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var fileForm = document.querySelector('.img-upload__form');
  var uploadFileInput = fileForm.elements['filename'];

  var template = document.querySelector('#picture');
  var uploadErrorTemplate = template.content.querySelector('.error');
  var onUploadError = function () {
    imgUploadOverlay.classList.add('hidden');
    var uploadErrorElement = uploadErrorTemplate.cloneNode(true);
    document.body.appendChild(uploadErrorElement);
    setUploadErrorOverlay();
    uploadErrorElement.classList.remove('hidden');
  };

  var onUploadSuccess = function () {
    window.form.uploadOverlayClose();
    window.form.setScaleValueDefault();
  };

  fileForm.addEventListener('submit', function (event) {
    window.backend.upload(new FormData(fileForm), onUploadSuccess, onUploadError);
    event.preventDefault();
  });

  var setUploadErrorOverlay = function () {
    var uploadErrorElement = document.querySelector('.error');
    var errorButtonsContainer = uploadErrorElement.querySelector('.error__links');
    var errorReuploadButton = errorButtonsContainer.firstElementChild;
    var errorNewFileButton = errorButtonsContainer.lastElementChild;

    var onReuploadSuccess = function () {
      document.body.removeChild(uploadErrorElement);
      onUploadSuccess();
    };

    var onReuploadError = function () {
    };

    var onReuploadButtonClick = function () {
      window.backend.upload(new FormData(fileForm), onReuploadSuccess, onReuploadError);
    };
    errorReuploadButton.addEventListener('click', onReuploadButtonClick);

    var onNewFileButtonClick = function () {
      onUploadSuccess();
      document.body.removeChild(uploadErrorElement);
      uploadFileInput.click();
    };
    errorNewFileButton.addEventListener('click', onNewFileButtonClick);
  };

})();
