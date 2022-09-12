/*

  In is script I use two styles for modifiying the DOM: 

  > Template Literals
  > Document Object Methods

  I'm doing this because I'm trying to practice both. In a real
  world page, I would choose just one style and stick with it.
  
*/

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
const RELATED_PRODUCTS_CONTAINER_ELEMENT = document.getElementById(
  "related-products-container"
);

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

    nameElement.innerText = relatedProduct.name;
    imageElement.src = relatedProduct.image;

    containerElement.appendChild(nameElement);
    containerElement.appendChild(imageElement);

    RELATED_PRODUCTS_CONTAINER_ELEMENT.appendChild(containerElement);
  }
}

function insertComments() {
  // Modifying the DOM by using the document object methods
  fetch(COMMENTS_URL)
    .then((response) => response.json())
    .then((commentsObjectsArray) => {
      let commentContainer = document.getElementById("comments-container");

      for (const commentObject of commentsObjectsArray) {
        let commentText = document.createElement("p");
        let commentDate = document.createElement("p");
        let commentScore = document.createElement("p");

        commentText.innerText = commentObject.description;
        commentDate.innerText = commentObject.dateTime;
        commentScore.innerText = commentObject.score;

        commentContainer.appendChild(commentText);
        commentContainer.appendChild(commentDate);
        commentContainer.appendChild(commentScore);
      }
    });
}

COMMENT_BUTTON_ELEMENT.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(commentInputElement.value);
});

// ON DOM LOADED
document.addEventListener("DOMContentLoaded", () => {
  insertNavbar();
  getJSONData(PRODUCT_URL).then((response) => {
    PRODUCT_OBJECT = response.data;
    // insertBreadcrumsBar();
    insertProductData();
    insertRelatedProducts();
    insertComments();
  });
});
