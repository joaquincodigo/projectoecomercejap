const USER_ID = 25801;
const CART_URL = CART_INFO_URL + USER_ID + EXT_TYPE;
const CART_TABLE_CONTAINER_ELEM = document.getElementById("cart-products");

function fetchCartProductsData() {
  return fetch(CART_URL)
    .then((response) => response.json())
    .then((CartProductsJSONData) => CartProductsJSONData.articles);
}

function insertCartTable(cartProductsData) {
  for (const product of cartProductsData) {
    // Creating Cart Elements:

    // Container Row
    let productDataContainerRowElem = document.createElement("div");
    productDataContainerRowElem.classList.add(
      "row",
      "mt-2",
      "product-data-row"
    );
    CART_TABLE_CONTAINER_ELEM.appendChild(productDataContainerRowElem);

    // Image
    let productImageElem = document.createElement("div");
    productImageElem.classList.add("col-1", "product-image");
    productImageElem.innerHTML = `<img style="width: 100%;" src="${product.image}"></img>`;
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
      if (productQuantityInputElem.value <= 0) {
        productQuantityInputElem.value = 1;
      }

      productSubtotalElem.dataset.value =
        productQuantityInputElem.value * product.unitCost;
      productSubtotalElem.innerHTML = `
        ${product.currency} 
        ${productQuantityInputElem.value * product.unitCost}`;

      modifyExistingProductQuantityInCart(
        product.id,
        productQuantityInputElem.value
      );
      updateCartTableSubtotal();
      updateShippingCost();
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
    productSubtotalElem.setAttribute("data-currency", `${product.currency}`);
    productSubtotalElem.setAttribute(
      "data-value",
      `${product.count * product.unitCost}}`
    );
    productSubtotalElem.innerHTML = `
      ${product.currency} ${product.count * product.unitCost}`;
    productDataContainerRowElem.appendChild(productSubtotalElem);
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

function modifyExistingProductQuantityInCart(productId, quantity) {
  let cartProducts = getCartProductsObjects();
  if (isProductInCart(productId)) {
    for (const cartProduct of cartProducts) {
      if (cartProduct.id == productId) {
        if (quantity > 0) {
          cartProduct.count = quantity;
        } else {
          // Remove the item if the value is 0 or less
          let cartProductIndex = cartProducts.indexOf(cartProduct);
          cartProducts.splice(cartProductIndex, 1);
        }
      }
    }
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }
}

function updateCartTableSubtotal() {
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

function updateShippingCost() {
  debugger;
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

// Event Listeners
let shipmentTypeSelectors = document.getElementsByClassName(
  "shipment-type-selector"
);
for (const shipmentType of shipmentTypeSelectors) {
  shipmentType.addEventListener("input", () => {
    updateShippingCost();
  });
}

// ON DOM LOADED
document.addEventListener("DOMContentLoaded", () => {
  insertNavbar();

  // For the cart fetched from the API
  fetchCartProductsData().then((cartProductsData) => {
    insertCartTable(cartProductsData);
    updateCartTableSubtotal();
    updateShippingCost();
  });

  // For the cart in the local storage
  insertCartTable(getCartProductsObjects());
  updateCartTableSubtotal();
  updateShippingCost();
});

// validate purchase form
// > check address fields
// > check payment fields
// > check others

// updateShipmentCosts
//     select shipment cost value
//     put the selected shipment value

// updateTotalValue
//     change total value to subtotal value plus shipment cost

// toggleCreditCardFields(status)
//     select all credit card fills
//     if statuyou are inactive:
//         add disabled class
//     if status sctivive
//         remove disabled class

// toggle Transfer Card fields(status)
// select all tranf card fills
//     if statuyou are inactive:
//         add disabled class
//     if status sctivive
//         remove disabled class

// function verifyAddressInput() {
//   let addressInputsElems = document.getElementsByClassName("address-input");

//   for (const input of addressInputsElems) {
//     if (!input.value) {
//       highlightRequiredInput(input);
//     }
//   }
// }
