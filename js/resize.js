'use strict';

(function () {

  var RESIZE_MAX = 100;
  var RESIZE_MIN = 25;
  var RESIZE_SHIFT = 25;

  var resizeFieldset = document.querySelector('.img-upload__resize');

  var previewImage = document.querySelector('.img-upload__preview img');

  var resizeInput = resizeFieldset.querySelector('.resize__control--value');

  resizeInput.removeAttribute('value');

  window.resize = function () {
    resizeInput.value = RESIZE_MAX;
    activateResize();
  };

  var activateResize = function () {
    previewImage.style.transform = 'scale(' + resizeInput.value * 0.01 + ')';
  };


  var resizeButtonMinus = resizeFieldset.querySelector('.resize__control--minus');
  var onResizeMinusClick = function () {
    if (resizeInput.value > RESIZE_MIN) {
      resizeInput.value -= RESIZE_SHIFT;
      activateResize();
    }
  };

  var resizeButtonPlus = resizeFieldset.querySelector('.resize__control--plus');
  var onResizePlusClick = function () {
    if (resizeInput.value < RESIZE_MAX) {
      resizeInput.value = parseInt(resizeInput.value, 10) + RESIZE_SHIFT;
      activateResize();
    }
  };

  resizeButtonMinus.addEventListener('click', onResizeMinusClick);
  resizeButtonPlus.addEventListener('click', onResizePlusClick);
})();
