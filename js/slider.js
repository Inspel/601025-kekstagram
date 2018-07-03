'use strict';

(function () {
  var MAX_SCALE = 453;
  var MAX_SCALE_VALUE = '100';
  var SCALE_KEYBOARD_SHIFT = 1;

  var fileForm = window.form.fileForm;
  var effectScale = fileForm.querySelector('.img-upload__scale');

  var scaleInput = fileForm.querySelector('.scale__value');
  scaleInput.removeAttribute('value');


  var scaleLine = effectScale.querySelector('.scale__line');
  var scalePin = effectScale.querySelector('.scale__pin');
  var scaleLevel = effectScale.querySelector('.scale__level');

  window.slider = function () {
    scalePin.style.left = MAX_SCALE + 'px';
    scaleLevel.style.width = MAX_SCALE + 'px';
    scaleInput.value = MAX_SCALE_VALUE;
  };

  // Перемещение пина и обработка его положения

  var setScaleValue = function () {
    var scalePinLeft = parseInt(scalePin.style.left, 10);
    scaleInput.value = Math.round(scalePinLeft * MAX_SCALE_VALUE / MAX_SCALE);
  };

  var setSliderEffect = function (sliderPosition) {
    if (sliderPosition < 0 || sliderPosition > MAX_SCALE) {
      return;
    }
    scalePin.style.left = sliderPosition + 'px';
    scaleLevel.style.width = sliderPosition + 'px';
    setScaleValue();
    window.form.activateFilter();
  };

  var scalePinLeftValue;

  scalePin.addEventListener('mousedown', function (event) {
    var startX = event.clientX;
    var scaleLineLeftOffset = scaleLine.getBoundingClientRect().x;

    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();
      var shift = startX - moveEvent.clientX;
      scalePinLeftValue = startX - shift - scaleLineLeftOffset;

      setSliderEffect(scalePinLeftValue);
    };

    var onScalePinMouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onScalePinMouseup);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onScalePinMouseup);
  });

  var onScalePinArrowPress = function (event) {
    scalePinLeftValue = parseInt(scalePin.style.left, 10);

    switch (true) {
      case event.keyCode === 37:
        scalePinLeftValue -= SCALE_KEYBOARD_SHIFT;
        break;

      case event.keyCode === 39:
        scalePinLeftValue += SCALE_KEYBOARD_SHIFT;
        break;

      default:
        break;
    }

    setSliderEffect(scalePinLeftValue);
  };

  scalePin.addEventListener('focus', function () {
    document.addEventListener('keydown', onScalePinArrowPress);

    scalePin.addEventListener('blur', function () {
      document.removeEventListener('keydown', onScalePinArrowPress);
    });
  });

})();
