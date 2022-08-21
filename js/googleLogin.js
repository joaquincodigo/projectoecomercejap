import jwt_decode from 'jwt-decode'

function handler(response) {
  let token = response.credential
  let decoded = jwt_decode(token)
  console.log(decoded)
  return decoded
}

// function handleCredentialResponse(response) {
//   console.log("Encoded JWT ID token: " + response.credential);
// }

window.onload = function () {
  google.accounts.id.initialize({
    client_id:
      "712828991122-5opoavq9gvvuokquo7cue7radto24igg.apps.googleusercontent.com",
    callback: handler,
  });
  google.accounts.id.renderButton(
    document.getElementById("googleButtonDiv"),
    { theme: "outline", size: "large" }
  );
  // google.accounts.id.prompt(); // I dissabled the One Tap dialog
};
