// VARIALES
let PROFILE_FORM_ELEM = document.getElementById("profile-form");
let USER_NOT_LOGGED_ALERT_ELEM = document.getElementById(
  "user-not-logged-alert"
);

// FUNCTIONS
function isCurrentUserLoggedIn() {
  return localStorage.getItem("username") != null;
}

function wasTheProfileModified() {
  return localStorage.getItem("username") == "true";
}

function displayElement(element) {
  element.classList.remove("d-none");
  element.classList.add("d-block");
}

// ON DOM LOADED
document.addEventListener("DOMContentLoaded", () => {
  insertNavbar();
  if (isCurrentUserLoggedIn()) {
    displayElement(PROFILE_FORM_ELEM);
  } else {
    displayElement(USER_NOT_LOGGED_ALERT_ELEM);
  }
});

// TO DO:
// > Solamente se podrá ingresar al perfil si el user esta loggeado.
// > Al ingresar por primera vez, todos los campos deben estar vacios excepto el email que debe ser el del login.
// > Al darle al botón, luego de validar, guardar en el local storage.
// > La siguiente vez que se ingrese ya deben estar todos los datos cargadores desde el LS
