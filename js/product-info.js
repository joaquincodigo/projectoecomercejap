//////////////////////////////////////////////////////////////////////
//  In is script I use two styles for modifiying the DOM:           //
//                                                                  //
//  > Template Literals                                             //
//  > Document Object Methods                                       //
//                                                                  //
//  I'm doing this because I'm trying to show that im competent     //
//  with both. In a real world page, I would choose just one style  //
//  and stick to it.                                                //
//////////////////////////////////////////////////////////////////////

//// DECLARING VARIABLES ////
var PRODUCT_OBJECT;
const PRODUCT_ID = localStorage.getItem("productId");
const PRODUCT_URL = PRODUCT_INFO_URL + PRODUCT_ID + EXT_TYPE;
const COMMENTS_URL = PRODUCT_INFO_COMMENTS_URL + PRODUCT_ID + EXT_TYPE;
const mainContainerElement = document.getElementById("main-container");

//// DEFINING FUNCTIONS ////
function insertBreadcrumsBar() {
  // Modifying the DOM by using template literals
  mainContainerElement.innerHTML = `

  <div id="category-container">
    <p>eMercado > ${PRODUCT_OBJECT.category}</p>
  </div>`;
}

function insertProductData() {
  // Modifying the DOM by using template literals
  console.log(PRODUCT_OBJECT);

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
        let text = document.createElement("p");
        let date = document.createElement("p");
        let score = document.createElement("p");

        text.innerText = commentObject.description;
        date.innerText = commentObject.dateTime;
        score.innerText = commentObject.score;

        commentContainer.appendChild(text);
        commentContainer.appendChild(date);
        commentContainer.appendChild(score);
      }
    });
}

//// ADDING EVENT LISTENERS ////

//// ON DOM LOADED ////
document.addEventListener("DOMContentLoaded", () => {
  insertNavbar();
  getJSONData(PRODUCT_URL).then((response) => {
    PRODUCT_OBJECT = response.data;
    insertBreadcrumsBar();
    insertProductData();
    insertRelatedProducts();
    insertComments();
  });
});
