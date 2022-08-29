// Defining Functions
function displayCategoryTitleHeading(categoryNameString) {

  // Selecting the element
  let categoryNameHeadingElement = document.getElementById(
    "category-name-heading"
  );

  // Styling
  categoryNameHeadingElement.classList.add(
    "mt-4",
    "align-text-top",
    "text-center",
    "px-2"
  );

  // Inserting text
  categoryNameHeadingElement.innerText = `Categoría: ${categoryNameString}`;
}

function displayProductList(productsArray) {
  let HTMLContentToAppend = "";
  for (const productObject of productsArray) {
    HTMLContentToAppend += `<div class="list-group-item list-group-item-action">
  <div class="row">
    <div class="col-3">
      <img
        src="${productObject.image}"
        alt="product image"
        class="img-thumbnail"
      />
    </div>
    <div class="col">
      <div class="d-flex w-100 justify-content-between">
        <div class="mb-1">
          <h4>${productObject.name}</h4>
          <p>${productObject.description}</p>
          <p class="font-weight-bold">Precio ${productObject.currency} ${productObject.cost}</p>
        </div>
        <small class="text-muted">Vendidos: ${productObject.soldCount}</small>
      </div>
    </div>
  </div>
  </div>`;
  }
  let productListContainerElement = document.getElementById("product-list-container")
  productListContainerElement.innerHTML += HTMLContentToAppend;
}

// Adding Event-Listeners
document.getElementById("sortAsc").addEventListener("click", () => {
  console.log("clicked");
});

// Waiting for the DOM to load
document.addEventListener("DOMContentLoaded", () => {

  // Fetching JSON product list from the API.
  let categoryId = localStorage.getItem("catID");
  getJSONData(PRODUCTS_URL + categoryId + EXT_TYPE)
    .then((resultObject) => resultObject.data)
    .then((dataObject) => {

      // Adding HTML header in #main-container with the category name
      displayCategoryTitleHeading(dataObject.catName);
      return dataObject.products;
    })
    .then((productsArray) => {

      // Displaying products list
      displayProductList(productsArray)
      
    }); // End of last ".then"
}); // End of eventListener on DOM Loaded
