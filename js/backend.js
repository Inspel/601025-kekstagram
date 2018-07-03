'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';
  var TIMEOUT = 5000;
  var SUCCESS_CODE = 200;
  var BAD_REQUEST_CODE = 400;
  var UNAUTHORIZED_CODE = 401;
  var NOT_FOUND_CODE = 404;

  var manageXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case SUCCESS_CODE:
          onLoad(xhr.response);
          break;

        case BAD_REQUEST_CODE:
          error = 'Что-то пошло не так, неверный запрос';
          break;

        case UNAUTHORIZED_CODE:
          error = 'Что-то пошло не так, пользователь не авторизован';
          break;

        case NOT_FOUND_CODE:
          error = 'Что-то пошло не так, ничего не найдено';
          break;

        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }

      if (error) {
        onError(error);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    return xhr;
  };


  window.backend = {
    upload: function (data, onLoad, onError) {

      var xhr = manageXhr(onLoad, onError);

      xhr.open('POST', UPLOAD_URL);
      xhr.send(data);
    },

    load: function (onLoad, onError) {

      var xhr = manageXhr(onLoad, onError);

      xhr.open('GET', LOAD_URL);
      xhr.send();
    }
  };
})();
