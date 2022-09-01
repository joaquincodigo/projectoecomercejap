document.addEventListener("DOMContentLoaded", function () {
  insertNavbar();

  // Adding event listeners
  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html";
  });

  // // Loading the username into the navbar
  // navbarUsernameElement = document.getElementById("navbar-username");
  // navbarUsernameElement.innerText = localStorage.getItem("username");
});
