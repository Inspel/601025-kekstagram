'use strict';

var COMMENTS_POOL = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DESCRIPTIONS_POOL = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var pictures = [];
var picturesQuantity = 25;

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
  return comments
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

var createSimilarElements = function (templateQueryString, contentQueryString, elementsQuantity) {

var template = document.querySelector(templateQueryString)
  .content
  .querySelector(contentQueryString);

  var fragment = document.createDocumentFragment();

  var commentsQuantityString;

  for (var i = 0; i < elementsQuantity; i++) {
    var pictureElement = template.cloneNode(true);

    commentsQuantityString = pictures[i].comments.length.toString();

    pictureElement.querySelector('.picture__img').src = pictures[i].url;
    pictureElement.querySelector('.picture__stat--comments').textContent = commentsQuantityString;
    pictureElement.querySelector('.picture__stat--likes').textContent = pictures[i].likes;

    fragment.appendChild(pictureElement);
  }
  return fragment;
};

generatePicturesArray(picturesQuantity);

var similarListElement = document.querySelector('.pictures');

var newFragment = createSimilarElements('#picture', '.picture__link', picturesQuantity);

similarListElement.appendChild(newFragment);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

var bigPictureImg = document.querySelector('big-picture__img')
  .content
  .getElementsByTagName('img');

bigPictureImg.src = pictures[0].url;


