'use strict';
// Хэштеги
(function () {
  var HASH_SYMBOL = '#';
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_MAX_COUNT = 5;

  var hashErrorCount;
  var setErrorCount = function (index) {
    hashErrorCount = index + 1;
  };

  window.onHashtagInput = function (event) {
    var target = event.target;
    var hashtagsArray = target.value.split(' ');

    switch (false) {

      case hashtagsArray.every(function (currentValue, index) {
        setErrorCount(index);
        return currentValue[0] === HASH_SYMBOL || currentValue[0] === undefined;
      }):
        target.setCustomValidity('Начни ' + hashErrorCount + '-й хэштег с решетки!');
        break;

      case hashtagsArray.every(function (currentValue, index) {
        setErrorCount(index);
        return currentValue !== HASH_SYMBOL;
      }):
        target.setCustomValidity('У хэштэга ' + hashErrorCount + ' решетка очень одинока!');
        break;

      case hashtagsArray.some(function (currentValue, index) {
        setErrorCount(index);
        return currentValue.length <= HASHTAG_MAX_LENGTH;
      }):
        target.setCustomValidity(hashErrorCount + '-й хэштег слишком длинный');
        break;

      case hashtagsArray.every(function (currentValue, index, array) {
        return array.lastIndexOf(currentValue) === index;
      }):
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
