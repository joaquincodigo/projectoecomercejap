document.addEventListener("DOMContentLoaded", function () {
  fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
    .then((response) => response.json())
    .then((dataObject) => dataObject.products)
    .then((productsArray) => {
      let HTMLContentToAppend;
      for (const productObject of productsArray) {
        HTMLContentToAppend += 
        '<div class="list-group-item list-group-item-action">' +
            '<div class="row">' +
                `<div class="col-3">
                    <img src="${productObject.imgSrc}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ productObject.name +`</h4> 
                        <p> `+ productObject.description +`</p> 
                        </div>
                        <small class="text-muted">` + "CONTADORRRRRR" + ` artículos</small> 
                    </div>
                </div>
            </div>
        </div>
        `
      }
      mainContainerElement = document.getElementById("main-container")
      mainContainerElement.innerHTML = HTMLContentToAppend
    });
});
