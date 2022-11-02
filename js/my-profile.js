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

function setupImageDropzoneElement() {
  let dzoptions = {
    url: "/",
    autoQueue: false,
  };
  let myDropzone = new Dropzone("div#file-upload", dzoptions);
}

// EVENT LISTENERS
PROFILE_FORM_ELEM.addEventListener("submit", (event) => {
  event.preventDefault();
  saveProfileDataToLocalStorage();
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

  setupImageDropzoneElement();
});
