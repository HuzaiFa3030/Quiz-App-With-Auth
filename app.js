function signUp (){
    var email = document.getElementById('email_signup').value
    var password = document.getElementById('Password_signup').value
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    var user = userCredential.user;
    alert('Registration Successful Go to Login Page')
  })
  .catch((error) => {
    var errorMessage = error.message;
    alert(errorMessage)

  });
}

var signup = document.getElementById('signup_btn')

signup.addEventListener('click', signUp)


