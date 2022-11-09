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
const FILE_INPUT_ELEM = document.getElementById("file-upload-input");
const DATA_SUCCESSFULLY_SAVED_FEEDBACK_ELEM = document.getElementById(
  "data-successfully-saved-feedback"
);

// FUNCTIONS
function isCurrentUserLoggedIn() {
  return localStorage.getItem("username") != null;
}

function displayElement(element) {
  element.classList.remove("d-none");
  element.classList.add("d-block");
}

function fillFormWithProfileData() {
  let profileData = JSON.parse(localStorage.getItem("profileData"));

  if (profileData.name != undefined) {
    NAME_INPUT_ELEM.value = profileData.name;
  } else {
    NAME_INPUT_ELEM.value = "";
  }

  if (profileData.secondName != undefined) {
    SECOND_NAME_INPUT_ELEM.value = profileData.secondName;
  } else {
    SECOND_NAME_INPUT_ELEM.value = "";
  }

  if (profileData.surname != undefined) {
    SURNAME_INPUT_ELEM.value = profileData.surname;
  } else {
    SURNAME_INPUT_ELEM.value = "";
  }

  if (profileData.secondSurname != undefined) {
    SECOND_SURNAME_INPUT_ELEM.value = profileData.secondSurname;
  } else {
    SECOND_SURNAME_INPUT_ELEM.value = "";
  }

  if (profileData.email != undefined) {
    EMAIL_INPUT_ELEM.value = profileData.email;
  } else {
    EMAIL_INPUT_ELEM.value = "";
  }

  if (profileData.phone != undefined) {
    PHONE_INPUT_ELEM.value = profileData.phone;
  } else {
    PHONE_INPUT_ELEM.value = "";
  }
}

function saveProfileDataToLocalStorage() {
  let profileData = {
    name: NAME_INPUT_ELEM.value,
    secondName: SECOND_NAME_INPUT_ELEM.value,
    surname: SURNAME_INPUT_ELEM.value,
    secondSurname: SECOND_SURNAME_INPUT_ELEM.value,
    email: EMAIL_INPUT_ELEM.value,
    phone: PHONE_INPUT_ELEM.value,
    profileDataHasBeenModified: true, // cuestionable
  };

  localStorage.setItem("profileData", JSON.stringify(profileData));
}

function isFormValid() {
  return (
    NAME_INPUT_ELEM.value != "" &&
    SURNAME_INPUT_ELEM.value != "" &&
    EMAIL_INPUT_ELEM.value != ""
  );
}

// EVENT LISTENERS
PROFILE_FORM_ELEM.addEventListener("submit", (event) => {
  event.preventDefault();
  if (isFormValid()) {
    saveProfileDataToLocalStorage();
    showDataSavedSuccessfullyFeedback();
  }
});

// ON DOM LOADED
document.addEventListener("DOMContentLoaded", () => {
  insertNavbar();

  if (isCurrentUserLoggedIn()) {
    displayElement(PROFILE_FORM_ELEM);
    fillFormWithProfileData();
  } else {
    displayElement(USER_NOT_LOGGED_ALERT_ELEM);
  }
});

function getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}

function showDataSavedSuccessfullyFeedback() {
  DATA_SUCCESSFULLY_SAVED_FEEDBACK_ELEM.classList.remove("d-none");
  DATA_SUCCESSFULLY_SAVED_FEEDBACK_ELEM.classList.add("d-inline-block");
}

function x() {
  var files = FILE_INPUT_ELEM.files;
  var reader = new FileReader();
  reader.onload = function () {
    console.log(reader.result);
  };
  if (files[0]) {
    // This does not return the text. It just starts reading.
    // The onload handler is triggered when it is done and the result is available.
    reader.readAsText(files[0]);
  }
}

// Solamente se podrá ingresar al perfil si el usuario se encuentra logueado. Además, al momento de ingresar por primera vez, todos los campos se deben encontrar vacíos, excepto E-mail, que debe contener el ingresado por el usuario al momento del login.

// Al presionar el botón para guardar los datos, se debe validar que los campos obligatorios (*) se encuentren con valor, y de ser así, guardar en el almacenamiento local.

// Las siguientes veces que se ingrese al perfil, ya se deben encontrar los datos cargados en los input, listos para ser modificados por el usuario.
