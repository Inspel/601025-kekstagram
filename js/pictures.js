'use strict';

var COMMENTS_POOL = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DESCRIPTIONS_POOL = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var ESC_KEYCODE = 27;

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

generatePicturesArray(picturesQuantity);

var picturesNode = document.querySelector('.pictures');
var picturesFragment = createSimilarPicturesFragment(pictureTemplate, '.picture__link', picturesQuantity);
picturesNode.appendChild(picturesFragment);

// Полноэкранное изображение

// Наполнение оверлея полноэкранного изображения контентом
var bigPicture = document.querySelector('.big-picture');

var bigPictureCommentsQuantity = bigPicture.querySelector('.comments-count');

var getActivePictureIndex = function (picture) {
  var pictureUrl = picture.src;
  return pictureUrl[pictureUrl.length - 5] - 1;
};

var setBigPictureContent = function (element, number, quantity) {
  var bigPictureImg = document.querySelector('.big-picture__img img');
  bigPictureImg.src = element.src;

  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  bigPictureLikes.textContent = pictures[number].likes;

  bigPictureCommentsQuantity.textContent = quantity;
};

var createBigPictureCommentsFragment = function (templateNode, contentQueryString, number, quantity) {
  var template = templateNode.querySelector(contentQueryString);

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < quantity; i++) {
    var bigPictureComment = template.cloneNode(true);

    bigPictureComment.querySelector('.social__picture').src = 'img/avatar-' + getRandomInteger(1, 6) + '.svg';
    bigPictureComment.querySelector('.social__text').textContent = pictures[number].description;

    fragment.appendChild(bigPictureComment);
  }
  return fragment;
};

var createCommentsTemplate = function () {
  var commentsTemplate = document.createElement('template');

  commentsTemplate.id = 'comments';
  document.body.insertBefore(commentsTemplate, pictureTemplate);
  insertTemplateContent(commentsTemplate, '.social__comment');

  return commentsTemplate;
};

// Обработчик клика по маленькому изображению
var onPictureClick = function (event) {
  var activePicture = event.target;
  var index = getActivePictureIndex(event.target);
  var commentsList = document.querySelector('.social__comments');
  var commentsQuantity = getCommentsQuantity(pictures, index);
  var bigPictureCommentsTemplate = createCommentsTemplate();

  var commentsFragment = createBigPictureCommentsFragment(bigPictureCommentsTemplate, '.social__comment', index, commentsQuantity);

  setBigPictureContent(activePicture, index, commentsQuantity);

  clearNodeContent(commentsList);

  commentsList.appendChild(commentsFragment);

  bigPicture.classList.remove('hidden');
};

var picturesElements = document.querySelectorAll('.picture__link');

var addPicturesListeners = function () {
  for (i = 0; i < picturesElements.length; i++) {
    picturesElements[i].addEventListener('click', onPictureClick);
  }
};
addPicturesListeners();

// Форма редактирования фотографий

// Открывание/закрывание формы
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var uploadCancelButton = document.querySelector('.img-upload__cancel');
var fileForm = document.querySelector('.img-upload__form');
var uploadFile = fileForm.elements['filename'];

var uploadOverlayOpen = function () {
  var defaultEffect = getEffectType();
  addFilter(defaultEffect);
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadOverlayEscPress);
};

var uploadOverlayClose = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onUploadOverlayEscPress);
};

var onUploadOverlayEscPress = function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    uploadOverlayClose();
    fileForm.reset();
  }
};

uploadFile.addEventListener('change', uploadOverlayOpen);

uploadCancelButton.addEventListener('click', uploadOverlayClose);

// Применение эффекта для изображения
var MAX_SCALE = 453;

var effects = {
  none: {},
  chrome: {
    filter: 'grayscale',
    maxValue: 1
  },
  sepia: {
    filter: 'sepia',
    maxValue: 1
  },
  marvin: {
    filter: 'invert',
    maxValue: 100,
    units: '%'
  },
  phobos: {
    filter: 'blur',
    maxValue: 3,
    units: 'px'
  },
  heat: {
    filter: 'brightness',
    maxValue: 3
  }
};

var previewImage = fileForm.querySelector('.img-upload__preview img');
var effectButtons = document.getElementsByName('effect');

var getEffectType = function () {
  for (var i = 0; i < effectButtons.length; i++) {
    if (effectButtons[i].checked) {
      break
    }
  }
  return effectButtons[i].value;
};

var addFilter = function (filter) {
  previewImage.className = 'effects__preview--' + filter;
};

var onEffectRadioClick = function (event) {
  previewImage.removeAttribute('style');
  var activeEffect = event.target.value;
  addFilter(activeEffect);
  effectScale.classList.toggle('hidden', activeEffect === 'none');
};

for (var i = 0; i < effectButtons.length; i++) {
  effectButtons[i].addEventListener('click', onEffectRadioClick);
}

var effectScale = fileForm.querySelector('.img-upload__scale');
var scalePin = effectScale.querySelector('.scale__pin');
var scaleValue = effectScale.querySelector('.scale__value').value;

var getScaleValue = function () {
  var pinLeft = window.getComputedStyle(scalePin).getPropertyValue('left');
  scaleValue = parseInt(pinLeft, 10);
  return scaleValue;
};

var getEffectDepth = function (effectName) {
  var effectMaxValue = effects[effectName].maxValue;
  return (getScaleValue() * effectMaxValue) / MAX_SCALE;

};

var setEffectDepth = function (effectType, effectDepthValue) {
  if (effectType.units) {
    previewImage.style.filter = effectType.filter + '(' + effectDepthValue + effectType.units + ')';
  } else {
    previewImage.style.filter = effectType.filter + '(' + effectDepthValue + ')';
  }
};

var onScalePinMouseup = function () {
  var activeEffect = getEffectType();
  var effectDepth = getEffectDepth(activeEffect);
  setEffectDepth(effects[activeEffect], effectDepth);
};

scalePin.addEventListener('mouseup', onScalePinMouseup);
