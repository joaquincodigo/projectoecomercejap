const USER_ID = 25801;
const CART_URL = CART_INFO_URL + USER_ID + EXT_TYPE;
const CART_PRODUCTS_ELEM = document.getElementById("cart-products");

function fetchCartProductsData() {
  return fetch(CART_URL)
    .then((response) => response.json())
    .then((CartProductsJSONData) => CartProductsJSONData.articles);
}

function insertCartProducts(cartProductsData) {
  let HTMLCartProductsContent = "";
  for (const product of cartProductsData) {
    let productDataRowHTML = `
    <div class="row product-data-row">
        <div class="col-2 product-image">${product.id}</div>
            <div class="col-2 product-name">${product.name}</div>
            <div class="col-2 product-cost">${product.currency} ${
      product.unitCost
    }</div>
            <div class="col-2">
              <input class="form-control product-quantity-input" type="number" value="${
                product.count
              }" />
            </div>
        <div class="col-2 product-subtotal fw-bold">${
          product.count * product.unitCost
        }</div>
      </div>
      `;
    HTMLCartProductsContent += productDataRowHTML;
  }
  CART_PRODUCTS_ELEM.innerHTML += HTMLCartProductsContent;
}

// ON DOM LOADED
document.addEventListener("DOMContentLoaded", () => {
  insertNavbar();
  fetchCartProductsData().then((cartProductsData) =>
    insertCartProducts(cartProductsData)
  );
});
