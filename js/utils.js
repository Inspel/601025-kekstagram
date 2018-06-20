'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.util =  {
    pictureTemplate: document.querySelector('#picture'),

    getRandomInteger: function (min, max) {
      var random = min + Math.random() * (max + 1 - min);
      random = Math.floor(random);
      return random;
    },

    isEscEvent: function (event, action) {
      if (event.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    getRndProperty: function (arr) {
      var rndIndex = window.util.getRandomInteger(0, arr.length - 1);
      return arr[rndIndex];
    },

    clearNodeContent: function (nodeToClear) {
      while (nodeToClear.firstChild) {
        nodeToClear.removeChild(nodeToClear.firstChild);
      }
    }
  };
})();
