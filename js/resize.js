'use strict';

(function () {

  var RESIZE_MAX = 100;
  var RESIZE_SHIFT = 25;
  var SCALE_VALUE_FACTOR = 0.01;

  var resizeFieldset = window.form.fileForm.querySelector('.img-upload__resize');

  var previewImage = window.form.previewImage;

  var resizeInput = resizeFieldset.querySelector('.resize__control--value');

  var value;

  window.resize = function () {
    value = RESIZE_MAX;
    activateResize();
  };

  var activateResize = function () {
    previewImage.style.transform = 'scale(' + value * SCALE_VALUE_FACTOR + ')';
    resizeInput.value = value + '%';
  };


  var resizeButtonMinus = resizeFieldset.querySelector('.resize__control--minus');
  var onResizeMinusClick = function () {
    if (value > RESIZE_SHIFT) {
      value -= RESIZE_SHIFT;
      activateResize();
    }
  };

  var resizeButtonPlus = resizeFieldset.querySelector('.resize__control--plus');
  var onResizePlusClick = function () {
    if (value < RESIZE_MAX) {
      value += RESIZE_SHIFT;
      activateResize();
    }
  };

  resizeButtonMinus.addEventListener('click', onResizeMinusClick);
  resizeButtonPlus.addEventListener('click', onResizePlusClick);
})();
