'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  window.backend = {
    upload: function (data, onLoad) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });

      xhr.open('POST', URL);
      xhr.send(data);
    },

    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 5000;

      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;

          case 400:
            error = 'Неверный запрос';
            break;

          case 401:
            error = 'Пользователь не авторизован';
            break;

          case 404:
            error = 'Ничего не найдено';
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

      xhr.open('GET', URL);
      xhr.send();
    }
  };
})();
