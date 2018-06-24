'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';

  var manageXhr = function (xhr, onLoad, onError) {
    xhr.responseType = 'json';
    xhr.timeout = 5000;
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;

        case 400:
          error = 'Что-то пошло не так, неверный запрос';
          break;

        case 401:
          error = 'Что-то пошло не так, пользователь не авторизован';
          break;

        case 404:
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
  };

  window.backend = {
    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();

      manageXhr(xhr, onLoad, onError);

      xhr.open('POST', UPLOAD_URL);
      xhr.send(data);
    },

    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();

      manageXhr(xhr, onLoad, onError);

      xhr.open('GET', LOAD_URL);
      xhr.send();
    }
  };
})();
