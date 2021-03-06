'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var RANDOM_CORRECTION_NUMBER = 1;

  window.util = {
    getRandomInteger: function (min, max) {
      var random = min + Math.random() * (max + RANDOM_CORRECTION_NUMBER - min);
      random = Math.floor(random);
      return random;
    },

    isEscEvent: function (event, action) {
      if (event.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    clearNodeContent: function (nodeToClear) {
      while (nodeToClear.firstChild) {
        nodeToClear.removeChild(nodeToClear.firstChild);
      }
    },

    showError: function (errorMessage) {
      var overlayNode = document.createElement('div');
      overlayNode.classList.add('error-overlay', 'overlay');
      var popupNode = document.createElement('div');
      overlayNode.appendChild(popupNode);
      popupNode.classList.add('error-popup');
      document.body.insertAdjacentElement('afterbegin', overlayNode);
      popupNode.textContent = errorMessage;

      var closeErrorPopup = function () {
        document.body.removeChild(overlayNode);
      };

      var onErrorPopupEscPress = function () {
        window.util.isEscEvent(event, closeErrorPopup);
        document.removeEventListener('keydown', onErrorPopupEscPress);
      };

      document.addEventListener('keydown', onErrorPopupEscPress);
    }
  };
})();
