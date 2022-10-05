const USER_ID = 25801;
const CART_URL = CART_INFO_URL + USER_ID + EXT_TYPE;
const CART_PRODUCTS_CONTAINER_ELEM = document.getElementById("cart-products");

function fetchCartProductsData() {
  return fetch(CART_URL)
    .then((response) => response.json())
    .then((CartProductsJSONData) => CartProductsJSONData.articles);
}

function insertCartProducts(cartProductsData) {
  for (const product of cartProductsData) {
    // Creating Cart Elements

    // Container Row
    let productDataContainerRowElem = document.createElement("div");
    productDataContainerRowElem.classList.add(
      "row",
      "mt-2",
      "product-data-row"
    );
    CART_PRODUCTS_CONTAINER_ELEM.appendChild(productDataContainerRowElem);

    // Image
    let productImageElem = document.createElement("div");
    productImageElem.classList.add("col-2", "product-image");
    productImageElem.innerHTML = `${product.id}`;
    productDataContainerRowElem.appendChild(productImageElem);

    // Name
    let productNameElem = document.createElement("div");
    productNameElem.classList.add("col-2", "product-name");
    productNameElem.innerHTML = `${product.name}`;
    productDataContainerRowElem.appendChild(productNameElem);

    // Currency & Cost Container
    let productCurrencyAndCostContainerElem = document.createElement("div");
    productCurrencyAndCostContainerElem.classList.add(
      "col-2",
      "product-currency-and-cost-container"
    );
    productCurrencyAndCostContainerElem.style = "display: flex;";
    productDataContainerRowElem.appendChild(
      productCurrencyAndCostContainerElem
    );

    // Currency
    let productCurrencyElem = document.createElement("div");
    productCurrencyElem.classList.add("me-1", "product-currency");
    productCurrencyElem.innerHTML = `${product.currency}`;
    productCurrencyAndCostContainerElem.appendChild(productCurrencyElem);

    // Cost
    let productCostElem = document.createElement("div");
    productCostElem.classList.add("product-cost");
    productCostElem.innerHTML = `${product.unitCost}`;
    productCurrencyAndCostContainerElem.appendChild(productCostElem);

    // Quantity
    let productQuantityColumnElem = document.createElement("div");
    productQuantityColumnElem.classList.add("ps-1", "pe-1", "col-1");
    let productQuantityInputElem = document.createElement("input");
    productQuantityInputElem.classList.add(
      "form-control",
      "product-quantity-input"
    );
    productQuantityInputElem.type = "number";
    productQuantityInputElem.value = `${product.count}`;
    productQuantityInputElem.addEventListener("input", () => {
      if (productQuantityInputElem.value == 0) {
        productQuantityInputElem.value = 1;
      }

      productSubtotalElem.innerHTML = `
        ${product.currency} 
        ${productQuantityInputElem.value * product.unitCost}`;
    });
    productQuantityColumnElem.appendChild(productQuantityInputElem);
    productDataContainerRowElem.appendChild(productQuantityColumnElem);

    // Subtotal
    let productSubtotalElem = document.createElement("div");
    productSubtotalElem.classList.add(
      "col-2",
      "product-subtotal",
      "fw-bold",
      "ms-5"
    );
    productSubtotalElem.innerHTML = `
      ${product.currency} ${product.count * product.unitCost}`;
    productDataContainerRowElem.appendChild(productSubtotalElem);
  }
}

//  DELETE ME SOON
// function getOnlyNumbersFromString(string) {
//   return string.replace(/\D/g, "");
// }

// ON DOM LOADED
document.addEventListener("DOMContentLoaded", () => {
  insertNavbar();
  fetchCartProductsData().then((cartProductsData) => {
    insertCartProducts(cartProductsData);
  });
});
