'use strict';
// Хэштеги и комментарий
// Хэштеги
(function () {

  window.onHashtagInput = function (event) {
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
})();
