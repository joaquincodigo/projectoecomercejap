//////////////////// DELETE ME  ////////////////////////
// Fetching category list from API.
// function fetchCategoryId(categoryNameString) {
//   return (
//     fetch(CATEGORIES_URL)

//       // Parsin JSON response
//       .then((response) => response.json())

//       // Iterating JSON array searching for the cat name.
//       .then((JSONData) => {
//         for (const category of JSONData) {
//           if (category.name == categoryNameString) {
//             return category.id;
//           }
//         }
//       })
//   );
// }
//////////////////// DELETE ME  ////////////////////////

const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortCategories(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_NAME) {
    result = array.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_NAME) {
    result = array.sort(function (a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_COUNT) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.productCount);
      let bCount = parseInt(b.productCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

function setCatID(id) {
  localStorage.setItem("catID", id);
  window.location = "products.html";
}

function showCategoriesList() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currentCategoriesArray.length; i++) {
    let category = currentCategoriesArray[i];

    if (
      (minCount == undefined ||
        (minCount != undefined &&
          parseInt(category.productCount) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(category.productCount) <= maxCount))
    ) {
      htmlContentToAppend += `
          <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
              <div class="row">
                  <div class="col-3">
                      <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
                  </div>
                  <div class="col">
                      <div class="d-flex w-100 justify-content-between">
                          <h4 class="mb-1">${category.name}</h4>
                          <small class="text-muted">${category.productCount} artículos</small>
                      </div>
                      <p class="mb-1">${category.description}</p>
                  </div>
              </div>
          </div>
          `;
    }

    document.getElementById("cat-list-container").innerHTML =
      htmlContentToAppend;
  }
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
  currentSortCriteria = sortCriteria;

  if (categoriesArray != undefined) {
    currentCategoriesArray = categoriesArray;
  }

  currentCategoriesArray = sortCategories(
    currentSortCriteria,
    currentCategoriesArray
  );

  //Muestro las categorías ordenadas
  showCategoriesList();
}

function insertCategoryTitleHeading(categoryNameString) {
  // Creating the element
  let categoryNameHeadingElement = document.getElementById(
    "category-name-heading"
  );
  categoryNameHeadingElement.classList.add(
    "mt-4",
    "align-text-top",
    "text-center",
    "px-2"
  );
  categoryNameHeadingElement.innerText = `Categoría: ${categoryNameString}`;
}

// Waiting for the DOM to load
document.addEventListener("DOMContentLoaded", () => {

  // Adding Event-Listeners
  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowCategories(ORDER_ASC_BY_NAME);
  });

  // Fetching JSON product list from the API.
  let categoryId = localStorage.getItem("catID");
  getJSONData(PRODUCTS_URL + categoryId + EXT_TYPE)
    .then((resultObject) => resultObject.data)
    .then((dataObject) => {
      // Adding HTML header in #main-container with the category name
      insertCategoryTitleHeading(dataObject.catName);

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
              <p class="font-weight-bold">Precio ${productObject.currency} ${productObject.cost}</p>
            </div>
            <small class="text-muted">Vendidos: ${productObject.soldCount}</small>
          </div>
        </div>
      </div>
    </div>`;
      } //end of for-loop
      let productListContainerElement = document.getElementById(
        "product-list-container"
      );
      productListContainerElement.innerHTML += HTMLContentToAppend;
    }); // End of getJsonData
}); // End of eventListener Dom Loaded
