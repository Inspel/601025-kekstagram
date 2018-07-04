'use strict';
// Хэштеги
(function () {
  var HASH_SYMBOL = '#';
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_MAX_COUNT = 5;

  var hashtagTest = function (testedArray) {
    switch (false) {

      case testedArray.length <= HASHTAG_MAX_COUNT:
        return 'Не больше 5 хэштегов';
        break;

      case testedArray.every(function (currentValue) {
        return currentValue[0] === HASH_SYMBOL || currentValue[0] === undefined;
      }):
        return 'Начни все хэштеги с решетки!';
        break;

      case testedArray.every(function (currentValue) {
        return currentValue !== HASH_SYMBOL;
      }):
        return 'Решетка очень одинока!';
        break;

      case testedArray.some(function (currentValue) {
        return currentValue.length <= HASHTAG_MAX_LENGTH;
      }):
        return 'Хэштегам не надо быть длиннее 20 символов';
        break;

      case testedArray.every(function (currentValue, index, array) {
        return array.lastIndexOf(currentValue) === index;
      }):
        return 'Пусть все хэштеги будут разными!';
        break;

      default:
        return '';
    }
  };

  window.onHashtagInput = function (event) {
    var target = event.target;
    var hashtagsArray = target.value.split(/\s+/);
    var errorMessage = hashtagTest(hashtagsArray);
    target.setCustomValidity(errorMessage);
  };
})();
