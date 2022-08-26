// Defining Functions
function isInputEmpty(inputField) {
  return inputField.value == "";
}

// function showElement(element) {
//   element.setAttribute("style", "display: block !important");
// }

// function hideElement(element) {
//   element.setAttribute("style", "display: none !important");
// }

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

// Waiting for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  
  // Defining HTML elements
  // let loginPageContainer = document.getElementById("login-page-container");
  // let landPageContainer = document.getElementById("landpage-container");
  let loginFormElement = document.getElementById("login-form");
  let userInputElement = document.getElementById("user-input");
  let passwordInputElement = document.getElementById("password-input");

  // When the form is submitted
  loginFormElement.addEventListener("submit", (event) => {
    // Stop the page from reloading
    event.preventDefault();

    // Checking if the fields are valid
    if (isInputEmpty(userInputElement)) {
      showInvalidInputMessage(
        "El usuario ingresado no es válido.",
        userInputElement
      );
    }
    else if (isInputEmpty(passwordInputElement)) {
      showInvalidInputMessage(
        "La contraseña ingresada no es válida.",
        passwordInputElement
      );
    }
    else {
      localStorage.setItem("username", userInputElement.value)
      window.location.href = "landpage.html"
    }
  });
});
