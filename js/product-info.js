//// DECLARING VARIABLES ////
const PRODUCT_ID = localStorage.getItem("productId");
const mainContainerElement = document.getElementById("main-container");

// NAVIGATION BAR
// <div id="category-container">
//   <p>eMercado > ${product.category}</p>
// </div>

//// DEFINING FUNCTIONS ////
function insertProductData(product) {
  mainContainerElement.innerHTML = `

  <!-- Location -->

  <div id="main-product-container">
    <div id="image-container">
      <img id="product-image" src="${product.images[0]}" alt="PRODUCT NAME">
    </div>

    <!-- Product Info -->
    <div id="product-data-container">
      <h2 id="product-name">${product.name}</h2>

      <div #rating-container>
        <span>X X X X </span>
      </div>

      <div class="separator-container">
        <hr> 
      </div>

      <div id="price-and-button-container">

        <div id="price-container">
          <h3><span id="currency">${product.currency}</span><span id="price">${product.cost}</span></h3>
        </div>

        <div id="button-container">
          <button class="btn btn-primary">COMPRAR</button>
        </div>

      </div>

      <div class="separator-container">
        <hr>
      </div>

      <div id="description-container">
        <p class="font-weight-normal">${product.description}</p>
      </div>

    </div>
  </div>
  
  `;
}

function insertRelatedProducts(product) {
  for (const relatedProduct of product.relatedProducts) {
    let nameElement = document.createElement("p");
    nameElement.innerText = relatedProduct.name;
    nameElement.classList.add("related-product-name");

    let imageElement = document.createElement("img");
    imageElement.src = relatedProduct.image;
    imageElement.classList.add("related-product-image");

    let containerElement = document.createElement("div");
    containerElement.classList.add("related-product-container");
    containerElement.appendChild(nameElement);
    containerElement.appendChild(imageElement);

    mainContainerElement.appendChild(containerElement);
  }
}

//// ADDING EVENT LISTENERS ////

//// ON DOM LOADED ////
document.addEventListener("DOMContentLoaded", () => {
  insertNavbar();
  getJSONData(PRODUCT_INFO_URL + PRODUCT_ID + EXT_TYPE).then((response) => {
    insertProductData(response.data);
    insertRelatedProducts(response.data);
  });
});
