function fetchCategoryId(categoryNameString) {
  // Fetching category list from API.
  return (
    fetch(CATEGORIES_URL)
      // Parsin JSON response
      .then((response) => response.json())

      // Iterating JSON array searching for the cat name.
      .then((JSONData) => {
        for (const category of JSONData) {
          if (category.name == categoryNameString) {
            return category.id;
          }
        }
      })
  );
}

function insertCategoryTitleHeading(categoryNameString) {
  let mainContainerElement = document.getElementById("main-container");

  let categoryNameHeaderElement = document.createElement("h3");
  categoryNameHeaderElement.setAttribute("id", "category-name-heading");
  categoryNameHeaderElement.classList.add(
    "mt-4",
    "align-text-top",
    "text-center",
    "px-2"
  );
  categoryNameHeaderElement.innerText = `Categoría: ${categoryNameString}`;

  mainContainerElement.appendChild(categoryNameHeaderElement);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchCategoryId("Autos").then((categoryId) => {
    // Fetching JSON product list from the API.
    getJSONData(PRODUCTS_URL + categoryId + ".json")
      .then((resultObject) => resultObject.data)
      .then((dataObject) => {
        // Adding HTML header in #main-container with the category name
        let categoryName = dataObject.catName;
        insertCategoryTitleHeading(categoryName);

        return dataObject.products;
      })
      .then((productsArray) => {
        // Iterating the list and generating HTML
        // content for appending to #main-container
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
            </div>
            <small class="text-muted">Vendidos: ${productObject.soldCount}</small>
          </div>
        </div>
      </div>
    </div>`;
        } //end of for-loop
        let mainContainerElement = document.getElementById("main-container");
        mainContainerElement.innerHTML += HTMLContentToAppend;
      });
  }); // End of fetchCategoryId
}); // End of eventListener Dom Loaded
