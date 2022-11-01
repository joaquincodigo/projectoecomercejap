// VARIABLES
const PROFILE_FORM_ELEM = document.getElementById("profile-form");
const NAME_INPUT_ELEM = document.getElementById("name-input");
const SECOND_NAME_INPUT_ELEM = document.getElementById("second-name-input");
const SURNAME_INPUT_ELEM = document.getElementById("surname-input");
const SECOND_SURNAME_INPUT_ELEM = document.getElementById(
  "second-surname-input"
);
const EMAIL_INPUT_ELEM = document.getElementById("email-input");
const PHONE_INPUT_ELEM = document.getElementById("phone-input");
const USER_NOT_LOGGED_ALERT_ELEM = document.getElementById(
  "user-not-logged-alert"
);
const SUBMIT_BUTTON_ELEM = document.getElementById("submit-button");

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

function saveProfileDataToLocalStorage() {
  let profileData = {
    name: NAME_INPUT_ELEM.value,
    secondName: SECOND_NAME_INPUT_ELEM.value,
    surname: SURNAME_INPUT_ELEM.value,
    secondSurname: SECOND_SURNAME_INPUT_ELEM.value,
    email: EMAIL_INPUT_ELEM.value,
    phone: PHONE_INPUT_ELEM.value,
  };
  localStorage.setItem("profileData", JSON.stringify(profileData));
}

function setupImageDropzoneElement() {
  let dzoptions = {
    url: "/",
    autoQueue: false,
  };
  let myDropzone = new Dropzone("div#file-upload", dzoptions);
}

// EVENT LISTENERS
SUBMIT_BUTTON_ELEM.addEventListener("", () => {});

// ON DOM LOADED
document.addEventListener("DOMContentLoaded", () => {
  insertNavbar();
  if (isCurrentUserLoggedIn()) {
    displayElement(PROFILE_FORM_ELEM);
  } else {
    displayElement(USER_NOT_LOGGED_ALERT_ELEM);
  }
  setupImageDropzoneElement();
});

// TO DO:

// DONE > Solamente se podrá ingresar al perfil si el user esta loggeado.
// > Al ingresar por primera vez, todos los campos deben estar vacios excepto el email que debe ser el del login.
// > Al darle al botón, luego de validar, guardar en el local storage.
// > La siguiente vez que se ingrese ya deben estar todos los datos cargadores desde el LS
