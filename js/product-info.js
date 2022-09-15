// DECLARING VARIABLES
var PRODUCT_OBJECT;
const PRODUCT_ID = localStorage.getItem("productId");

const PRODUCT_URL = PRODUCT_INFO_URL + PRODUCT_ID + EXT_TYPE;
const COMMENTS_URL = PRODUCT_INFO_COMMENTS_URL + PRODUCT_ID + EXT_TYPE;

const PRODUCT_NAME_ELEM = document.getElementById("product-name");
const PRODUCT_IMAGE_ELEM = document.getElementById("product-image");
const PRODUCT_CURRENCY_ELEM = document.getElementById("product-currency");
const PRODUCT_COST_ELEM = document.getElementById("product-cost");
const PRODUCT_DESCRIPTION_ELEM = document.getElementById("product-description");
const COMMENT_INPUT_BUTTON_ELEM = document.getElementById("comment-button");
const COMMENT_INPUT_ELEM = document.getElementById("comment-input");
const RELATED_PRODUCTS_CONTAINER_ELEM = document.getElementById(
  "related-products-container"
);
const COMMENT_INPUT_STARS_ELEMS =
  document.getElementsByClassName("comment-input-star");
const COMMENTS_CONTAINER_ELEM = document.getElementById("comments-container");
const COMMENT_INPUT_FORM_ELEM = document.getElementById("comment-input");

//DEFINING FUNCTIONS
function insertBreadcrumsBar() {
  return 0;
}

function insertProductData() {
  PRODUCT_NAME_ELEM.innerText = PRODUCT_OBJECT.name;
  PRODUCT_IMAGE_ELEM.src = PRODUCT_OBJECT.images[0];
  PRODUCT_DESCRIPTION_ELEM.innerText = PRODUCT_OBJECT.description;
  PRODUCT_CURRENCY_ELEM.innerText = PRODUCT_OBJECT.currency;
  PRODUCT_COST_ELEM.innerText = PRODUCT_OBJECT.cost;
}

function insertRelatedProducts() {
  // Modifying the DOM by using the document object methods
  for (const relatedProduct of PRODUCT_OBJECT.relatedProducts) {
    let containerElement = document.createElement("div");
    let nameElement = document.createElement("p");
    let imageElement = document.createElement("img");

    imageElement.classList.add("related-product-image");
    nameElement.classList.add("related-product-name");
    containerElement.classList.add("related-product");
    imageElement.classList.add("related-product-image");

    nameElement.innerText = relatedProduct.name;
    imageElement.src = relatedProduct.image;

    containerElement.appendChild(nameElement);
    containerElement.appendChild(imageElement);

    RELATED_PRODUCTS_CONTAINER_ELEM.appendChild(containerElement);
  }
}

function insertAPIComments() {
  // Modifying the DOM by using the document object methods
  fetch(COMMENTS_URL)
    .then((response) => response.json())
    .then((commentsObjectsArray) => {
      for (const commentObject of commentsObjectsArray) {
        ({ description, score, dateTime } = commentObject);
        insertComment(description, score, dateTime);
      }
    });
}

function insertComment(commentText, commmentScore, commentaDate) {
  let commentTextElem = document.createElement("p");
  let commentDateElem = document.createElement("p");
  let commentScoreElem = document.createElement("div");
  let commentSeparatorElem = document.createElement("hr");

  commentTextElem.classList.add("comment-text");
  commentTextElem.innerText = commentText;

  commentDateElem.classList.add("comment-date");
  commentDateElem.innerText = commentaDate;

  commentScoreElem.classList.add = "comment-score";
  for (let i = 1; i <= 5; i++) {
    let starIcon = document.createElement("span");
    starIcon.classList.add("fa");
    starIcon.classList.add("fa-star");
    starIcon.classList.add("comment-score");
    if (i <= commmentScore) {
      starIcon.classList.add("checked");
    }
    commentScoreElem.appendChild(starIcon);
  }

  COMMENTS_CONTAINER_ELEM.appendChild(commentScoreElem);
  COMMENTS_CONTAINER_ELEM.appendChild(commentDateElem);
  COMMENTS_CONTAINER_ELEM.appendChild(commentTextElem);
  COMMENTS_CONTAINER_ELEM.appendChild(commentSeparatorElem);
}

// function sortNodes() {
//   let commen = document.getElementById("mylist");
//   var items = list.childNodes;
//   var itemsArr = [];
//   for (var i in items) {
//     if (items[i].nodeType == 1) {
//       // get rid of the whitespace text nodes
//       itemsArr.push(items[i]);
//     }
//   }

//   itemsArr.sort(function (a, b) {
//     return a.innerHTML == b.innerHTML ? 0 : a.innerHTML > b.innerHTML ? 1 : -1;
//   });

//   for (i = 0; i < itemsArr.length; ++i) {
//     list.appendChild(itemsArr[i]);
//   }
// }

function addCommentInputStarsHoverAnimation() {
  // Adding event listener to each star
  for (let i = 0; i < COMMENT_INPUT_STARS_ELEMS.length; i++) {
    COMMENT_INPUT_STARS_ELEMS[i].addEventListener("mouseover", () => {
      // Uncheking all the stars (reset)
      for (const star of COMMENT_INPUT_STARS_ELEMS) {
        star.classList.remove("checked");
      }

      // Checking all the stars up to the selected one
      for (let j = 0; j <= i; j++) {
        COMMENT_INPUT_STARS_ELEMS[j].classList.add("checked");
      }
    });
  }
}

// ADDING EVENT LISTENERS
COMMENT_INPUT_BUTTON_ELEM.addEventListener("click", (event) => {
  event.preventDefault();
  let commentInputStarsArray = Array.from(COMMENT_INPUT_STARS_ELEMS);
  let commentInputStarsChecked = commentInputStarsArray.filter((star) =>
    star.classList.contains("checked")
  );
  let commentText = COMMENT_INPUT_ELEM.value
  let commentScore = commentInputStarsChecked.length
  let commentDate = new Date(Date.now()).toLocaleDateString();
  insertComment(commentText, commentScore, commentDate)
});

// ON DOM LOADED
document.addEventListener("DOMContentLoaded", () => {
  insertNavbar();
  getJSONData(PRODUCT_URL).then((response) => {
    PRODUCT_OBJECT = response.data;
    // insertBreadcrumsBar();
    insertProductData();
    insertRelatedProducts();
    insertAPIComments();
    addCommentInputStarsHoverAnimation();
  });
});
