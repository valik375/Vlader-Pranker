function authCurrentUserOnPage() {

    const email = document.getElementById("userEmail").value
    const password = document.getElementById("userPassword").value
    const wrongMessage = document.querySelector(".error-message")

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        
        var user = userCredential.user;
        
        window.location.replace("./backend.html");
    })
    .catch((error) => {
        wrongMessage.classList.add('wrong')
    });
}