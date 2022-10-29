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
let shipmentTypeSelectors = document.getElementsByClassName(
  "shipment-type-selector"
);
for (const shipmentType of SHIPMENT_TYPE_RADIO_SELECTOR_ELEMS) {
  shipmentType.addEventListener("input", () => {
    updateShippingCost();
    updateTotalCost();
  });
}
