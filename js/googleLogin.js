// function handleCredentialResponse(response) {
//   console.log("Encoded JWT ID token: " + response.credential);
// }

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  console.log(JSON.parse(jsonPayload))
  return JSON.parse(jsonPayload);
};

window.onload = function () {
  google.accounts.id.initialize({
    client_id:
      "712828991122-5opoavq9gvvuokquo7cue7radto24igg.apps.googleusercontent.com",
    callback: parseJwt,
  });
  google.accounts.id.renderButton(
    document.getElementById("googleButtonDiv"),
    { theme: "outline", size: "large" }
  );
  // google.accounts.id.prompt(); // I dissabled the One Tap dialog
};
