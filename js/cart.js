// DEFINING VARIABLES
const USER_ID = 25801;
const CART_URL = CART_INFO_URL + USER_ID + EXT_TYPE;
const CART_TABLE_CONTAINER_ELEM = document.getElementById(
  "table-content-container"
);
const SHIPMENT_TYPE_RADIO_SELECTOR_ELEMS = document.getElementsByClassName(
  "shipment-type-selector"
);

// DEFINING FUNCTIONS
function fetchCartProductsData() {
  return fetch(CART_URL)
    .then((response) => response.json())
    .then((CartProductsJSONData) => CartProductsJSONData.articles);
}

function insertCartTable(cartProductsData) {
  for (const cartProduct of cartProductsData) {
    // Creating Cart Elements:
    // Container Row
    let productTableRowElem = document.createElement("div");
    productTableRowElem.classList.add("row", "mt-2", "product-data-row");
    CART_TABLE_CONTAINER_ELEM.appendChild(productTableRowElem);

    // Image
    let productImageElem = document.createElement("div");
    productImageElem.classList.add("col-2", "product-image");
    productImageElem.innerHTML = `<img style="width: 100%;" src="${cartProduct.image}"></img>`;
    productTableRowElem.appendChild(productImageElem);

    // Name
    let productNameElem = document.createElement("div");
    productNameElem.classList.add("col-3", "product-name");
    productNameElem.innerHTML = `${cartProduct.name}`;
    productTableRowElem.appendChild(productNameElem);

    // Currency & Cost Container
    let productCurrencyAndCostContainerElem = document.createElement("div");
    productCurrencyAndCostContainerElem.classList.add(
      "col-2",
      "product-currency-and-cost-container"
    );
    productCurrencyAndCostContainerElem.style = "display: flex;";
    productTableRowElem.appendChild(productCurrencyAndCostContainerElem);

    // Currency
    let productCurrencyElem = document.createElement("div");
    productCurrencyElem.classList.add("me-1", "product-currency");
    productCurrencyElem.innerHTML = `${cartProduct.currency}`;
    productCurrencyAndCostContainerElem.appendChild(productCurrencyElem);

    // Cost
    let productCostElem = document.createElement("div");
    productCostElem.classList.add("product-cost");
    productCostElem.innerHTML = `${cartProduct.unitCost}`;
    productCurrencyAndCostContainerElem.appendChild(productCostElem);

    // Quantity
    let productQuantityColumnElem = document.createElement("div");
    productQuantityColumnElem.classList.add("ps-1", "pe-1", "col-2");
    let productQuantityInputElem = document.createElement("input");
    productQuantityInputElem.classList.add(
      "form-control",
      "product-quantity-input"
    );
    productQuantityInputElem.type = "number";
    productQuantityInputElem.value = `${cartProduct.count}`;
    productQuantityInputElem.addEventListener("input", () => {
      if (productQuantityInputElem.value <= 0) {
        productQuantityInputElem.value = 1;
      }

      productSubtotalElem.dataset.value =
        productQuantityInputElem.value * cartProduct.unitCost;
      productSubtotalElem.innerHTML = `
          ${cartProduct.currency} 
          ${productQuantityInputElem.value * cartProduct.unitCost}`;

      modifyExistingProductQuantityInCart(
        cartProduct.id,
        productQuantityInputElem.value
      );
      updateSubtotalCost();
      updateShippingCost();
      updateTotalCost();
    });
    productQuantityColumnElem.appendChild(productQuantityInputElem);
    productTableRowElem.appendChild(productQuantityColumnElem);

    // Subtotal
    let productSubtotalElem = document.createElement("div");
    productSubtotalElem.classList.add("col-2", "product-subtotal", "fw-bold");
    productSubtotalElem.setAttribute(
      "data-currency",
      `${cartProduct.currency}`
    );
    productSubtotalElem.setAttribute(
      "data-value",
      `${cartProduct.count * cartProduct.unitCost}}`
    );
    productSubtotalElem.innerHTML = `
        ${cartProduct.currency} ${cartProduct.count * cartProduct.unitCost}`;
    productTableRowElem.appendChild(productSubtotalElem);

    // Remove Button
    let removeFromCartButton = document.createElement("button");
    removeFromCartButton.classList.add(
      "col-1",
      "remove-from-cart-button",
      "btn",
      "btn-outline-dark",
      // "btn-sm",
      "p-0",
      "h-25",
      "fw-bold"
    );
    removeFromCartButton.innerHTML = "X";
    removeFromCartButton.addEventListener("click", () => {
      productTableRowElem.remove();
      modifyExistingProductQuantityInCart(cartProduct.id, 0);
      updateSubtotalCost();
      updateShippingCost();
      updateTotalCost();
    });
    productTableRowElem.appendChild(removeFromCartButton);
  }
}

function modifyExistingProductQuantityInCart(
  productToModifyID,
  productToModifyQuantity
) {
  // If the quantity is 0 or less, the product would be eliminated.
  let cartProductsArray = getCartProductsObjects();
  if (isProductInCart(productToModifyID)) {
    for (const cartProduct of cartProductsArray) {
      if (cartProduct.id == productToModifyID) {
        if (productToModifyQuantity > 0) {
          cartProduct.count = productToModifyQuantity;
        } else {
          let cartProductIndex = cartProductsArray.indexOf(cartProduct);
          cartProductsArray.splice(cartProductIndex, 1);
        }
      }
    }
    localStorage.setItem("cartProducts", JSON.stringify(cartProductsArray));
  }
}

function getCartProductsObjects() {
  return JSON.parse(localStorage.getItem("cartProducts"));
}

function isProductInCart(productId) {
  let cartProducts = getCartProductsObjects();
  for (const cartProduct of cartProducts) {
    if (productId == cartProduct.id) {
      return true;
    }
  }
  return false;
}

function convertPesosToDolars(pesosValue) {
  let dolarValueInPesos = 40;
  return pesosValue / dolarValueInPesos;
}

function getChoosenShipmentType() {
  let shipmentTypeSelectorsElems = document.getElementsByClassName(
    "shipment-type-selector"
  );
  for (const selector of shipmentTypeSelectorsElems) {
    if (selector.checked) {
      return selector.value;
    }
  }
  return "none";
}

function updateSubtotalCost() {
  let productsSubtotals = document.getElementsByClassName("product-subtotal");
  let subtotalCartElem = document.getElementsByClassName("subtotal-cost")[0];

  let cartSubtotalValueInDolars = 0;
  for (const productSubtotal of productsSubtotals) {
    let productSubtotalValue = parseInt(productSubtotal.dataset.value);
    // We accumulate the subtotal values but if they are in "pesos"
    // we have to convert them first.
    if (productSubtotal.dataset.currency == "UYU") {
      cartSubtotalValueInDolars += convertPesosToDolars(productSubtotalValue);
    } else {
      cartSubtotalValueInDolars += productSubtotalValue;
    }
  }

  subtotalCartElem.dataset.value = cartSubtotalValueInDolars;
  subtotalCartElem.innerHTML = `USD ${cartSubtotalValueInDolars}`;
}

function updateShippingCost() {
  let shipmentCostElem = document.getElementsByClassName("shipping-cost")[0];
  let cartSubtotalElem = document.getElementsByClassName("subtotal-cost")[0];
  let choosenShipmentType = getChoosenShipmentType();

  let shippingCost = 0;
  if (choosenShipmentType == "standard") {
    shippingCost = (cartSubtotalElem.dataset.value / 100) * 5;
  } else if (choosenShipmentType == "express") {
    shippingCost = (cartSubtotalElem.dataset.value / 100) * 7;
  } else {
    // Premium
    shippingCost = (cartSubtotalElem.dataset.value / 100) * 15;
  }

  shipmentCostElem.dataset.value = Math.round(shippingCost * 100) / 100;
  shipmentCostElem.innerHTML = `USD ${Math.round(shippingCost * 100) / 100}`;
}

function updateTotalCost() {
  let subtotalCostElem = document.getElementsByClassName("subtotal-cost")[0];
  let shippingCostElem = document.getElementsByClassName("shipping-cost")[0];
  let totalCostElem = document.getElementsByClassName("total-cost")[0];

  let totalValue =
    parseInt(subtotalCostElem.dataset.value) +
    parseInt(shippingCostElem.dataset.value);

  totalCostElem.innerHTML = `USD ${totalValue}`;
}

// EVENT LISTENERS
for (const radioSelector of SHIPMENT_TYPE_RADIO_SELECTOR_ELEMS) {
  radioSelector.addEventListener("input", () => {
    updateShippingCost();
    updateTotalCost();
  });
}

// ON DOM LOADED
document.addEventListener("DOMContentLoaded", () => {
  insertNavbar();

  // For the cart fetched from the API
  fetchCartProductsData().then((cartProductsData) => {
    insertCartTable(cartProductsData);
    updateSubtotalCost();
    updateShippingCost();
    updateTotalCost();
  });

  // For the cart in the local storage
  insertCartTable(getCartProductsObjects());

  // For the totals
  updateSubtotalCost();
  updateShippingCost();
  updateTotalCost();
});
