'use strict';

(function () {

  var COMMENTS_POOL = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var DESCRIPTIONS_POOL = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят', 'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var generateComments = function (quantity) {
    var comments = [];
    for (var i = 0; i < quantity; i++) {
      var newComment = window.util.getRndProperty(COMMENTS_POOL);

      comments.push(newComment);
    }
    return comments;
  };

  var picturesQuantity = 25;
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var commentsCountMin = 1;
  var commentsCountMac = 2;
  var generatePicturesArray = function () {
    var pictures = [];
    var newPicture;
    for (var i = 0; i <= picturesQuantity - 1; i++) {
      newPicture = {
        index: i,
        url: 'photos/' + (i + 1) + '.jpg',
        likes: window.util.getRandomInteger(LIKES_MIN, LIKES_MAX),
        comments: generateComments(window.util.getRandomInteger(commentsCountMin, commentsCountMac)),
        description: window.util.getRndProperty(DESCRIPTIONS_POOL)
      };
      pictures.push(newPicture);
    }
    return pictures;
  };
  window.data = generatePicturesArray();
})();

