var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var DETAIL_BUTTON_SELECTOR = '[data-image-role="triggerBtn"]';

var curIdx = 0;
var maxIdx = 0;

function setDetails(imageUrl, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb, idx) {
  'use strict';
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    curIdx = idx;
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function getButtonsArray() {
  'use strict';
  var buttons = document.querySelectorAll(DETAIL_BUTTON_SELECTOR);
  var buttonsArray = [].slice.call(buttons);
  return buttonsArray;
}

function getNextIdx() {
  curIdx = curIdx >= (maxIdx - 1) ? 0 : (curIdx + 1);
  return curIdx;
}

function getPrevIdx() {
  curIdx = curIdx <= 0 ? (maxIdx - 1) : (curIdx - 1);
  return curIdx;
}

function addBtnClickHandler(button) {
  'use strict';
  button.addEventListener('click', function () {
    if(button.innerText === '<') {
      var thumbnails = getThumbnailsArray();
      setDetailsFromThumb(thumbnails[getPrevIdx()]);
    }
    else if(button.innerText === '>') {
      var thmbnails = getThumbnailsArray();
      setDetailsFromThumb(thmbnails[getNextIdx()]);
    }
  });
}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  maxIdx = thumbnails.length;
  thumbnails.forEach(addThumbClickHandler);

  var buttons = getButtonsArray();
  buttons.forEach(addBtnClickHandler);


}

initializeEvents();
