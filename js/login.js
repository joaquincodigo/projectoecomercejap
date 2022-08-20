function showElement(element) {
  element.setAttribute("style", "display: block !important")
}

function hideElement(element) {
  element.setAttribute("style", "display: none !important")
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("> DOM Loaded");
  let loginPageContainer = document.getElementById('login-page-container');
  let landPageContainer = document.getElementById('landpage-container');
  let loginFormElement = document.getElementById('login-form');
  // let emailInputElement = document.getElementById("email-input");
  // let passwordInputElement = document.getElementById("password-input");
  // let wrongInputAlertElement = document.getElementById("wrong-input-alert");

  loginFormElement.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("> Login form submitted");
  
    hideElement(loginPageContainer)
    console.log("> Login page hidden");
    
    showElement(landPageContainer)
    console.log("> Landing page displayed");
    
  });
});



