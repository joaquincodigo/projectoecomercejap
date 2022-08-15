//TODO GET CARS CATEGORY NUMBER
function insertCategoryTitleHeading(categoryNameString) {
  let categoryNameHeaderElement = document.createElement("h2")
  categoryNameHeaderElement.classList.add("mt-4", "align-text-top", "text-center", "px-2")
  categoryNameHeaderElement.innerText = `Categoría: ${categoryNameString}`
  let mainContainerElement = document.getElementById("main-container")
  mainContainerElement.appendChild(categoryNameHeaderElement)
}


// Fetching JSON product list from the API.
document.addEventListener("DOMContentLoaded", () => {
  getJSONData("https://japceibal.github.io/emercado-api/cats_products/101.json")
    .then(resultObject => resultObject.data)
    .then(dataObject => {

      // Adding HTML header in main-container
      // with the category name
      insertCategoryTitleHeading(dataObject.catName)
      return dataObject.products})
    .then(productsArray => {
      
      // Iterating the list and generating HTML
      // content for appending to #main-container
      let HTMLContentToAppend = "";
      for (const productObject of productsArray) {
        HTMLContentToAppend +=
              `<div class="list-group-item list-group-item-action">
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
      </div>`
      }
      mainContainerElement = document.getElementById("main-container")
      mainContainerElement.innerHTML += HTMLContentToAppend
    })
});
