//// DECLARING VARIABLES ////
const PRODUCT_ID = localStorage.getItem("productId");
const mainElement = document.getElementsByName("main")[0];

//// DEFINING FUNCTIONS ////
function insertProduct(product) {
  let productTitle = (document.createElement("p").innerHTML = product.id);
  mainElement.appendChild(productTitle);
}

//// ADDING EVENT LISTENERS ////

//// ON DOM LOADED ////
document.addEventListener("DOMContentLoaded", () => {
  insertNavbar();
  getJSONData(PRODUCT_INFO_URL + PRODUCT_ID + EXT_TYPE).then((response) => {
    let productData = response.data;
    insertProduct(productData);
  });
});
