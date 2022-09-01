// Defining Variables
var FETCHED_PRODUCTS_ARRAY;
var CURRENTLY_SHOWN_PRODUCTS;
var CATEGORY_ID = localStorage.getItem("catID");
let sortAscendingButton = document.getElementById("sortAsc"); // This is a radio input but it works as a button
let sortDecendingButton = document.getElementById("sortDesc"); // This is a radio input but it works as a button
let sortByCountButton = document.getElementById("sortByCount"); // This is a radio input but it works as a button
let filterButton = document.getElementById("rangeFilterCount");
let clearFiltersButton = document.getElementById("clearRangeFilter");
let filterInputMin = document.getElementById("rangeFilterCountMin");
let filterInputMax = document.getElementById("rangeFilterCountMax");

// Defining Functions
function insertCategoryTitleHeading(categoryNameString) {
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

function insertProductsList(productsArray) {
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
          <br>
          <p style="font-weight: bold; font-size: 20px;" style> ${productObject.currency} ${productObject.cost}</p>
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
  CURRENTLY_SHOWN_PRODUCTS = productsArray;
}

function removeProductList() {
  let listContainerElement = document.getElementById("product-list-container");
  listContainerElement.innerHTML = "";
}

function sortList(criteria, list) {
  let sortedList;

  // Ascending ASCIIbetical order
  if (criteria == "AZ") {
    sortedList = list.sort((a, b) => {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });

    // Decending ASCIIbetical order
  } else if (criteria == "ZA") {
    sortedList = list.sort((a, b) => {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
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

function filteredProductsList() {
  let filteredList = FETCHED_PRODUCTS_ARRAY.filter((product) => {
    let cost = product.cost;
    let min = filterInputMin.value;
    if (!min) {
      min = 0;
    }
    let max = filterInputMax.value;
    if (!max) {
      max = 99999999; // I know this isnt elegant but it works.
    }

    return cost >= min && cost <= max;
  });

  return filteredList;
}

function clearFiltersInputs() {
  filterInputMin.value = "";
  filterInputMax.value = "";
}

// Adding Event-Listeners
sortAscendingButton.addEventListener("click", () => {
  console.log("Cliecked Ascending Button");
  let sortedList = sortList("AZ", CURRENTLY_SHOWN_PRODUCTS); // Just for clarity. Sort modifies the original array.
  removeProductList();
  insertProductsList(sortedList);
});

sortDecendingButton.addEventListener("click", () => {
  console.log("Cliecked Decending Button");
  let sortedList = sortList("ZA", CURRENTLY_SHOWN_PRODUCTS); // Just for clarity. Sort modifies the original array.
  removeProductList();
  insertProductsList(sortedList);
});

sortByCountButton.addEventListener("click", () => {
  console.log("Cliecked Sort By Sold Count Button");
  let sortedList = sortList("COUNT", CURRENTLY_SHOWN_PRODUCTS); // Just for clarity. Sort modifies the original array.
  removeProductList();
  insertProductsList(sortedList);
});

clearFiltersButton.addEventListener("click", () => {
  console.log("Clicked Clear Filters Button");
  clearFiltersInputs();
  removeProductList();
  insertProductsList(FETCHED_PRODUCTS_ARRAY);
});

filterButton.addEventListener("click", () => {
  console.log("Clicked Filter Button");
  filteredList = filteredProductsList();
  removeProductList();
  insertProductsList(filteredList);
});

// Waiting for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Fetching JSON product list from the API.
  getJSONData(PRODUCTS_URL + CATEGORY_ID + EXT_TYPE).then((result) => {
    let data = result.data;
    FETCHED_PRODUCTS_ARRAY = data.products;
    // Displaying the page
    insertCategoryTitleHeading(data.catName);
    insertProductsList(data.products);
  });
}); // End of eventListener on DOM Loaded
