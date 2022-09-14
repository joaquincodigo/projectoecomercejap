// DECLARING VARIABLES
var PRODUCT_OBJECT;
const PRODUCT_ID = localStorage.getItem("productId");

const PRODUCT_URL = PRODUCT_INFO_URL + PRODUCT_ID + EXT_TYPE;
const COMMENTS_URL = PRODUCT_INFO_COMMENTS_URL + PRODUCT_ID + EXT_TYPE;

const PRODUCT_NAME_ELEMENT = document.getElementById("product-name");
const PRODUCT_IMAGE_ELEMENT = document.getElementById("product-image");
const PRODUCT_CURRENCY_ELEMENT = document.getElementById("product-currency");
const PRODUCT_COST_ELEMENT = document.getElementById("product-cost");
const PRODUCT_DESCRIPTION_ELEMENT = document.getElementById(
  "product-description"
);
const COMMENT_BUTTON_ELEMENT = document.getElementById("comment-button");
const COMMENT_INPUT_ELEMENT = document.getElementById("comment-input");
const RELATED_PRODUCTS_CONTAINER_ELEMENT = document.getElementById(
  "related-products-container"
);
const COMMENT_INPUT_STARS =
  document.getElementsByClassName("comment-input-star");
const COMMENT_CONTAINER_ELEMENT = document.getElementById("comments-container");

//DEFINING FUNCTIONS
function insertBreadcrumsBar() {
  return 0;
}

function insertProductData() {
  PRODUCT_NAME_ELEMENT.innerText = PRODUCT_OBJECT.name;
  PRODUCT_IMAGE_ELEMENT.src = PRODUCT_OBJECT.images[0];
  PRODUCT_DESCRIPTION_ELEMENT.innerText = PRODUCT_OBJECT.description;
  PRODUCT_CURRENCY_ELEMENT.innerText = PRODUCT_OBJECT.currency;
  PRODUCT_COST_ELEMENT.innerText = PRODUCT_OBJECT.cost;
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

    RELATED_PRODUCTS_CONTAINER_ELEMENT.appendChild(containerElement);
  }
}

function fetchAndInsertComments() {
  // Modifying the DOM by using the document object methods
  fetch(COMMENTS_URL)
    .then((response) => response.json())
    .then((commentsObjectsArray) => {
      for (const commentObject of commentsObjectsArray) {
        insertComment(commentObject.description, commentObject.score, commentObject.dateTime);
      }
    });
}

function insertComment(commentText, commmentScore, commentaDate) {
  let commentTextElement = document.createElement("p");
        let commentDateElement = document.createElement("p");
        let commentScoreElement = document.createElement("div");
        let commentSeparatorElement = document.createElement("hr");

        commentTextElement.classList.add("comment-text");
        commentTextElement.innerText = commentText;

        commentDateElement.classList.add("comment-date");
        commentDateElement.innerText = commentaDate;

        commentScoreElement.classList.add = "comment-score";
        for (let i = 1; i <= 5; i++) {
          let starIcon = document.createElement("span");
          starIcon.classList.add("fa");
          starIcon.classList.add("fa-star");
          starIcon.classList.add("comment-score");
          if (i <= commmentScore) {
            starIcon.classList.add("checked");
          }
          commentScoreElement.appendChild(starIcon);
        }

        COMMENT_CONTAINER_ELEMENT.appendChild(commentScoreElement);
        COMMENT_CONTAINER_ELEMENT.appendChild(commentDateElement);
        COMMENT_CONTAINER_ELEMENT.appendChild(commentTextElement);
        COMMENT_CONTAINER_ELEMENT.appendChild(commentSeparatorElement)
}


function addCommentInputStarsHoverAnimation() {
  
  // Adding event listener to each star
  for (let i = 0; i < COMMENT_INPUT_STARS.length; i++) {
    COMMENT_INPUT_STARS[i].addEventListener("mouseover", () => {

      // Uncheking all the stars (reset)
      for (const star of COMMENT_INPUT_STARS) {
        star.classList.remove("checked");
      }

      // Checking all the stars up to the selected one
      for (let j = 0; j <= i; j++) {
        COMMENT_INPUT_STARS[j].classList.add("checked");
      }
    });
  }
}

COMMENT_BUTTON_ELEMENT.addEventListener("click", (event) => {
  event.preventDefault();
  let commentInputStarsArray = Array.from(COMMENT_INPUT_STARS)  
  let commentInputStarsChecked = commentInputStarsArray.filter((star) => star.classList.contains("checked") )
  alert(COMMENT_INPUT_ELEMENT.value + " " + commentInputStarsChecked.length);
});

// ON DOM LOADED
document.addEventListener("DOMContentLoaded", () => {
  insertNavbar();
  getJSONData(PRODUCT_URL).then((response) => {
    PRODUCT_OBJECT = response.data;
    // insertBreadcrumsBar();
    insertProductData();
    insertRelatedProducts();
    fetchAndInsertComments();
    addCommentInputStarsHoverAnimation();
  });
});
