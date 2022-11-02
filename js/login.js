// DEFINING VARIABLES
let loginFormElement = document.getElementById("login-form");
let userInputElement = document.getElementById("user-input");
let passwordInputElement = document.getElementById("password-input");

// DEFINING FUNCTIONS
function isInputEmpty(inputField) {
  return inputField.value == "";
}

function showInvalidInputMessage(messageString, inputElement) {
  // Adding the message to the HTML container
  let invalidInputMessageContainerElement = document.getElementById(
    "invalid-input-message-container"
  );
  invalidInputMessageContainerElement.setAttribute("style", "color: red");
  invalidInputMessageContainerElement.innerText = messageString;

  // Highlighting the input
  inputElement.setAttribute(
    "style",
    "box-shadow: 0 4px 8px 0 rgba(255, 0, 0, 0.2), 0 6px 20px 0 rgba(255, 0, 0, 0.19)"
  );
}

function initializeCart() {
  localStorage.setItem("cartProducts", "[]");
}

// Waiting for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  initializeCart();

  loginFormElement.addEventListener("submit", (event) => {
    event.preventDefault();

    if (isInputEmpty(userInputElement)) {
      showInvalidInputMessage(
        "El usuario ingresado no es válido.",
        userInputElement
      );
    } else if (isInputEmpty(passwordInputElement)) {
      showInvalidInputMessage(
        "La contraseña ingresada no es válida.",
        passwordInputElement
      );
    } else {
      let profileData = { email: userInputElement.value };
      localStorage.setItem("profileData", JSON.stringify(profileData));
      localStorage.setItem("username", userInputElement.value);
      window.location.href = "landpage.html";
    }
  });
});
