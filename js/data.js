'use strict';

var COMMENTS_POOL = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DESCRIPTIONS_POOL = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var pictures = [];
var picturesQuantity = 25;

var generateComments = function (quantity) {
  var comments = [];
  for (var i = 0; i < quantity; i++) {
    var newComment = window.utils.getRndProperty(COMMENTS_POOL);

    comments.push(newComment);
  }
  return comments;
};

var generatePicturesArray = function (quantity) {
  var newPicture;
  for (var i = 1; i <= quantity; i++) {
    newPicture = {
      url: 'photos/' + i + '.jpg',
      likes: window.util.getRandomInteger(15, 200),
      comments: generateComments(window.util.getRandomInteger(1, 2)),
      description: window.utils.getRndProperty(DESCRIPTIONS_POOL)
    };
    pictures.push(newPicture);
  }
  return pictures;
};

window.pictures = generatePicturesArray(picturesQuantity);
