//// DECLARING VARIABLES ////
const PRODUCT_ID = localStorage.getItem("productId");
const mainElement = document.getElementsByTagName("main")[0];

//// DEFINING FUNCTIONS ////
function insertProductElements(product) {
  let title = (document.createElement("p").innerHTML = product.name);
  let images = (document.createElement("img").src = product.images[0]);
  let description = (document.createElement("p").innerHTML =
    product.description);
  //   let description = (document.createElement("p").innerHTML = product.description);
  //     let description = (document.createElement("p").innerHTML = product.description);

  mainElement.innerHTML = image;
}

//// ADDING EVENT LISTENERS ////

//// ON DOM LOADED ////
document.addEventListener("DOMContentLoaded", () => {
  insertNavbar();
  getJSONData(PRODUCT_INFO_URL + PRODUCT_ID + EXT_TYPE).then((response) => {
    let productData = response.data;
    insertProductElements(productData);
  });
});
