document.addEventListener("DOMContentLoaded", () => {
  
  
  
    let loginFormElement = document.getElementById("login-form");
    let emailInputElement = document.getElementById("email-input")
    let passwordInputElement = document.getElementById("password-input")
    let wrongInputAlertElement = document.getElementById("wrong-input-alert")

    loginFormElement.addEventListener("submit", (event) => {
    event.preventDefault();
      if (passwordInputElement.value.length <= 5) {
      




        //TODO ALERT SYLE
      wrongInputAlertElement.innerHTML = "Hello"
      wrongInputAlertElement.style.display = "block";
      
      
    };
  });

    
    
    
    
});
