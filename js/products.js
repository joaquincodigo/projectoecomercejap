// Defining Variables
var PRODUCTS_ARRAY;
var CATEGORY_ID = localStorage.getItem("catID");
let sortAscendingButton = document.getElementById("sortAsc"); // This is a radio input but it works as a button
let sortDecendingButton = document.getElementById("sortDesc"); // This is a radio input but it works as a button
let sortByCountButton = document.getElementById("sortByCount"); // This is a radio input but it works as a button
let filterButton = document.getElementById("rangeFilterCount");
let clearFiltersButton = document.getElementById("clearRangeFilter");

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

function displayProductsList(productsArray) {
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
  let productListContainerElement = document.getElementById(
    "product-list-container"
  );
  productListContainerElement.innerHTML += HTMLContentToAppend;
}

function removeProductList() {
  let listContainerElement = document.getElementById('product-list-container')
  listContainerElement.innerHTML = ""
}

function sortList(criteria, list) {
  let sortedList;

  // Validating Criteria
  let validCriteria = ["AZ", "ZA", "COUNT"];
  if (!validCriteria.includes(criteria)) {
    throw `Criteria ${criteria} is not a valid one.`;
  }

  // Ascending ASCIIbetical order
  if (criteria == "AZ") {
    sortedList = list.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    // Decending ASCIIbetical order
  } else if (criteria == "ZA") {
    sortedList = list.sort((a, b) => {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });

    // Ascending sold-counter order
  } else if (criteria == "COUNT") {
    sortedList = list.sort((a, b) => {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return sortedList;
}

// Adding Event-Listeners
sortAscendingButton.addEventListener("click", () => {
  console.log("Cliecked Ascending Button");
  let sortedList = sortList("AZ", PRODUCTS_ARRAY);
  removeProductList()
  displayProductsList(sortedList);
});

sortDecendingButton.addEventListener("click", () => {
  console.log("Cliecked Decending Button");
  let sortedList = sortList("ZA", PRODUCTS_ARRAY);
  removeProductList()
  displayProductsList(sortedList);
});

sortByCountButton.addEventListener("click", () => {
  console.log("Cliecked Sort By Count Button");
});

clearFiltersButton.addEventListener("click", () => {
  console.log("Cliecked Clear Filters Button");
});

filterButton.addEventListener("click", () => {
  console.log("Cliecked Filter Button");
});

// Waiting for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Fetching JSON product list from the API.
  getJSONData(PRODUCTS_URL + CATEGORY_ID + EXT_TYPE).then((result) => {
    let data = result.data;
    PRODUCTS_ARRAY = data.products;
    // Displaying the page
    displayCategoryTitleHeading(data.catName);
    displayProductsList(data.products);
  });
}); // End of eventListener on DOM Loaded
