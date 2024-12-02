//// DEFINING VARIABLES ////
var FETCHED_PRODUCTS_LIST;
var CURRENTLY_SHOWN_PRODUCTS;
var CATEGORY_ID = localStorage.getItem("catID");
let sortAscendingButtonEl = document.getElementById("sortAsc"); // This is a radio input but it works as a button
let sortDecendingButtonEl = document.getElementById("sortDesc"); // This is a radio input but it works as a button
let sortByCountButtonEl = document.getElementById("sortByCount"); // This is a radio input but it works as a button
let filterButtonEl = document.getElementById("rangeFilterCount");
let clearFiltersButtonEl = document.getElementById("clearRangeFilter");
let filterInputMinEl = document.getElementById("rangeFilterCountMin");
let filterInputMaxEl = document.getElementById("rangeFilterCountMax");
let searchInputEl = document.getElementById("search-input");
let searchButtonEl = document.getElementById("search-button");

//// DEFINING FUNCTIONS ////
function searchProducts(searchInput) {
  if (searchInput) {
    let searchTags = generateTagList(searchInput);
    resetSearchMatchFlags();
    for (const searchTag of searchTags) {
      for (const product of FETCHED_PRODUCTS_LIST) {
        productNameTags = generateTagList(product.name);
        productDescriptionTags = generateTagList(product.description);

        if (
          productNameTags.includes(searchTag) ||
          productDescriptionTags.includes(searchTag)
        ) {
          product.itsASearchMatch = true;
        }
      }
    }

    let searchResults = FETCHED_PRODUCTS_LIST.filter(
      (product) => product.itsASearchMatch
    );

    return searchResults;
  }
  resetSearchMatchFlags();
  return FETCHED_PRODUCTS_LIST;
}

function resetSearchMatchFlags() {
  for (const product of FETCHED_PRODUCTS_LIST) {
    product.itsASearchMatch = false;
  }
}

function generateTagList(string) {
  let worthlessTags = ["de", "la", "el", "con", "que", "y", "se", "", " ", " "];
  let stringWords = string.toLowerCase().split(" ");
  let tagList = stringWords.map((word) => removeSymbols(word));
  let usefulTagList = tagList.filter((tag) => !worthlessTags.includes(tag));

  return usefulTagList;
}

function removeSymbols(string) {
  let letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "á",
    "é",
    "í",
    "ó",
    "ú",
    " ",
  ];

  stringArray = string.toLowerCase().split("");
  stringArrayWithNoSymbols = stringArray.filter(
    (char) => letters.includes(char) // Only letters are allowed
  );
  stringWithNoSymbols = stringArrayWithNoSymbols.join("");

  return stringWithNoSymbols;
}

function insertCategoryTitleHeading(categoryNameString) {
  let categoryNameHeadingEl = document.getElementById("category-name-heading");
  categoryNameHeadingEl.classList.add(
    "mt-4",
    "align-text-top",
    "text-center",
    "px-2"
  );
  categoryNameHeadingEl.innerText = `Categoría: ${categoryNameString}`;
}

function insertProductsList(productsArray) {
  let HTMLContentToAppend = "";
  for (const productObject of productsArray) {
    HTMLContentToAppend += `<div id="${productObject.id}" class="list-group-item list-group-item-action">
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

  // Ascending cost order
  if (criteria == "0 -> 9") {
    sortedList = list.sort((a, b) => {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });

    // Decending cost order
  } else if (criteria == "9 -> 0") {
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
  let filteredList = FETCHED_PRODUCTS_LIST.filter((product) => {
    let cost = product.cost;
    let min = filterInputMinEl.value;
    let max = filterInputMaxEl.value;

    if (!min && !max) {
      return true; // All elements pass the test.
    }

    if (!min) {
      return cost <= max;
    }

    if (!max) {
      return cost >= min;
    }

    return cost >= min && cost <= max;
  });

  return filteredList;
}

function clearFiltersInputs() {
  filterInputMinEl.value = "";
  filterInputMaxEl.value = "";
}

function refreshProductsList(listData) {
  removeProductList();
  insertProductsList(listData);
}

function addLinksToProductListElements() {
  /* Each HTML element for each product in the list was created
   with insertProductsList(). That function includes the API's 
   product ID as its own HTML ID attribute value for each element*/

  let productElements = document.getElementsByClassName("list-group-item");
  for (const productElement of productElements) {
    productElement.addEventListener("click", () => {
      localStorage.setItem("productId", productElement.id.toString());
      window.location.href = "product-info.html";
    });
  }
}

//// ADDING EVENT LISTENERS ////


searchInputEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    refreshProductsList(searchProducts(searchInputEl.value.trim()));
  }
});

searchButtonEl.addEventListener("click", () => {
  refreshProductsList(searchProducts(searchInputEl.value.trim()));
});


sortAscendingButtonEl.addEventListener("click", () => {
  let sortedList = sortList("0 -> 9", CURRENTLY_SHOWN_PRODUCTS); // Just for clarity. Sort modifies the original array.
  refreshProductsList(sortedList);
});

sortDecendingButtonEl.addEventListener("click", () => {
  let sortedList = sortList("9 -> 0", CURRENTLY_SHOWN_PRODUCTS); // Just for clarity. Sort modifies the original array.
  refreshProductsList(sortedList);
});

sortByCountButtonEl.addEventListener("click", () => {
  let sortedList = sortList("COUNT", CURRENTLY_SHOWN_PRODUCTS); // Just for clarity. Sort modifies the original array.
  refreshProductsList(sortedList);
});

clearFiltersButtonEl.addEventListener("click", () => {
  clearFiltersInputs();
  refreshProductsList(FETCHED_PRODUCTS_LIST);
});

filterButtonEl.addEventListener("click", () => {
  filteredList = filteredProductsList();
  refreshProductsList(filteredList);
});

//// TRIGGERED ON DOM LOADED ////
document.addEventListener("DOMContentLoaded", () => {
  insertNavbar();

  let productListURL = PRODUCTS_URL + CATEGORY_ID + EXT_TYPE;
  getJSONData(productListURL).then((result) => {
    FETCHED_PRODUCTS_LIST = result.data.products;
    insertCategoryTitleHeading(result.data.catName);
    insertProductsList(FETCHED_PRODUCTS_LIST);
    addLinksToProductListElements();
  });

});
