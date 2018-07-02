'use strict';
// Хэштеги и комментарий
// Хэштеги
(function () {
  var HASH_SYMBOL = '#';
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_MAX_COUNT = 5;

  window.onHashtagInput = function (event) {
    var target = event.target;
    var hashtagsArray = target.value.split(/\s/);


    var testFirstHash = function () {
      for (var i = 0; i < hashtagsArray.length; i++) {
        if (hashtagsArray[i][0] !== HASH_SYMBOL && hashtagsArray[i][0] !== undefined) {
          return i + 1;
        }
      }
      return true;
    };

    var testHashtagContent = function () {
      for (var i = 0; i < hashtagsArray.length; i++) {
        if (hashtagsArray[i] === HASH_SYMBOL) {
          return i + 1;
        }
      }
      return true;
    };

    var testHashtagLength = function () {
      for (var i = 0; i < hashtagsArray.length; i++) {
        if (hashtagsArray[i].length > HASHTAG_MAX_LENGTH) {
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

      case hashtagsArray.length <= HASHTAG_MAX_COUNT:
        target.setCustomValidity('Не больше 5 хэштегов');
        break;

      default:
        target.setCustomValidity('');
    }
  };
})();
