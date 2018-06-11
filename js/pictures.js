'use strict';

var COMMENTS_POOL = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DESCRIPTIONS_POOL = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var pictures = [];
var picturesQuantity = 25;
var pictureTemplate = document.querySelector('#picture');

var getRandomInteger = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  random = Math.floor(random);
  return random;
};

var getRndProperty = function (arr) {
  var rndIndex = getRandomInteger(0, arr.length - 1);
  return arr[rndIndex];
};

var generateComments = function (quantity) {
  var comments = [];
  for (var i = 0; i < quantity; i++) {
    var newComment = getRndProperty(COMMENTS_POOL);

    comments.push(newComment);
  }
  return comments;
};

var generatePicturesArray = function (quantity) {
  var newPicture;
  for (var i = 1; i <= quantity; i++) {
    newPicture = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomInteger(15, 200),
      comments: generateComments(getRandomInteger(1, 2)),
      description: getRndProperty(DESCRIPTIONS_POOL)
    };
    pictures.push(newPicture);
  }
  return pictures;
};

var getCommentsQuantity = function (arr, index) {
  var pictureComments = arr[index].comments;
  return pictureComments.length.toString();
};

var createSimilarPicturesFragment = function (templateNode, contentQueryString, elementsQuantity) {
  var template = templateNode
    .content
    .querySelector(contentQueryString);
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < elementsQuantity; i++) {
    var pictureElement = template.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = pictures[i].url;
    pictureElement.querySelector('.picture__stat--comments').textContent = getCommentsQuantity(pictures, i);
    pictureElement.querySelector('.picture__stat--likes').textContent = pictures[i].likes;

    fragment.appendChild(pictureElement);
  }
  return fragment;
};

var insertTemplateContent = function (templateNode, nodeQueryString) {
  var template = templateNode;
  var exampleNode = document.querySelector(nodeQueryString);
  template.appendChild(exampleNode);
};

var clearNodeContent = function (nodeToClear) {
  while (nodeToClear.firstChild) {
    nodeToClear.removeChild(nodeToClear.firstChild);
  }
};

var createBigPictureCommentsFragment = function (templateNode, contentQueryString) {
  var template = templateNode.querySelector(contentQueryString);

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < bigPictureCommentsQuantity.textContent; i++) {
    var bigPictureComment = template.cloneNode(true);

    bigPictureComment.querySelector('.social__picture').src = 'img/avatar-' + getRandomInteger(1, 6) + '.svg';
    bigPictureComment.querySelector('.social__text').textContent = pictures[0].description;

    fragment.appendChild(bigPictureComment);
  }
  return fragment;
};

generatePicturesArray(picturesQuantity);

var picturesNode = document.querySelector('.pictures');
var picturesFragment = createSimilarPicturesFragment(pictureTemplate, '.picture__link', picturesQuantity);
picturesNode.appendChild(picturesFragment);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

var bigPictureImgNode = document.querySelector('.big-picture__img');
var bigPictureImg = bigPictureImgNode.getElementsByTagName('img');
bigPictureImg.src = pictures[0].url;

var bigPictureLikes = bigPicture.querySelector('.likes-count');
bigPictureLikes.textContent = pictures[0].likes;

var bigPictureCommentsQuantity = bigPicture.querySelector('.comments-count');
bigPictureCommentsQuantity.textContent = getCommentsQuantity(pictures, 0);

var bigPictureCommentsTemplate = document.createElement('template');
bigPictureCommentsTemplate.id = 'comments';
document.body.insertBefore(bigPictureCommentsTemplate, pictureTemplate);
insertTemplateContent(bigPictureCommentsTemplate, '.social__comment');

var commentsList = document.querySelector('.social__comments');
clearNodeContent(commentsList);
var commentsFragment = createBigPictureCommentsFragment(bigPictureCommentsTemplate, '.social__comment');
commentsList.appendChild(commentsFragment);
