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
const mainContainerElement = document.getElementById("main-container");

//DEFINING FUNCTIONS
function insertBreadcrumsBar() {
  // Modifying the DOM by using template literals
  mainContainerElement.innerHTML = `

  <div id="category-container">
    <p>eMercado > ${PRODUCT_OBJECT.category}</p>
  </div>`;
}

function insertProductData() {
  // Modifying the DOM by using template literals
  let { images, name, currency, cost, description } = PRODUCT_OBJECT;
  mainContainerElement.innerHTML += `

  <!-- Location -->
  <div id="main-product-container">
    <div id="image-container">
      <img id="product-image" src="${images[0]}" alt="PRODUCT NAME">
    </div>

    <!-- Product Info -->
    <div id="product-data-container">
      <h2 id="product-name">${name}</h2>

      <div #score-container></div>

      <div class="separator-container">
        <hr> 
      </div>

      <div id="price-and-button-container">

        <div id="price-container">
          <h3><span id="currency">${currency}</span><span id="price">${cost}</span></h3>
        </div>

        <div id="button-container">
          <button class="btn btn-primary">COMPRAR</button>
        </div>

      </div>

      <div class="separator-container">
        <hr>
      </div>

      <div id="description-container">
        <p class="font-weight-normal">${description}</p>
      </div>

    </div>

    <div id="comments-container"></div>
  </div>
  
  `;
}

function insertRelatedProducts() {
  // Modifying the DOM by using the document object methods
  for (const relatedProduct of PRODUCT_OBJECT.relatedProducts) {
    let containerElement = document.createElement("div");
    let nameElement = document.createElement("p");
    let imageElement = document.createElement("img");

    imageElement.classList.add("related-product-image");
    nameElement.classList.add("related-product-name");
    containerElement.classList.add("related-product-container");

    nameElement.innerText = relatedProduct.name;
    imageElement.src = relatedProduct.image;

    containerElement.appendChild(nameElement);
    containerElement.appendChild(imageElement);

    mainContainerElement.appendChild(containerElement);
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

function insertCommentInput() {
  let commentsFormElement = document.createElement("form");
  let commentInputElement = document.createElement("textarea");
  let commentSubmitButtonElement = document.createElement("input");

  commentsFormElement.id = "comment-form";

  commentInputElement.id = "comment-input";
  commentInputElement.placeholder = "Ingresa tu comentario";

  commentSubmitButtonElement.id = "comment-button";
  commentSubmitButtonElement.type = "button";
  commentSubmitButtonElement.value = "Enviar comentario";
  commentSubmitButtonElement.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(commentInputElement.value);
  });

  commentsFormElement.appendChild(commentInputElement);
  commentsFormElement.appendChild(commentSubmitButtonElement);

  mainContainerElement.appendChild(commentsFormElement);
}

// ON DOM LOADED
document.addEventListener("DOMContentLoaded", () => {
  insertNavbar();
  getJSONData(PRODUCT_URL).then((response) => {
    PRODUCT_OBJECT = response.data;
    insertBreadcrumsBar();
    insertProductData();
    insertRelatedProducts();
    insertComments();
    insertCommentInput();
  });
});
