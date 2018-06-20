'use strict';

(function () {

var createSimilarPicturesFragment = function (templateNode, contentQueryString, elementsQuantity) {
  var template = templateNode
    .content
    .querySelector(contentQueryString);
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < elementsQuantity; i++) {
    var pictureElement = template.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = data[i].url;
    pictureElement.querySelector('.picture__stat--comments').textContent = data[i].comments.length;
    pictureElement.querySelector('.picture__stat--likes').textContent = data[i].likes;

    fragment.appendChild(pictureElement);
  }
  return fragment;
};

var picturesNode = document.querySelector('.pictures');
var picturesFragment = createSimilarPicturesFragment(util.pictureTemplate, '.picture__link', data.length);
picturesNode.appendChild(picturesFragment);

})();
