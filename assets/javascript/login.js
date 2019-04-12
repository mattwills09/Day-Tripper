
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDMrNIM1I6SatTgZfcEcc6rDUsGCNOmBNg",
    authDomain: "login-test-fe7e7.firebaseapp.com",
    databaseURL: "https://login-test-fe7e7.firebaseio.com",
    projectId: "login-test-fe7e7",
    storageBucket: "login-test-fe7e7.appspot.com",
    messagingSenderId: "1052759447469"
};
firebase.initializeApp(config);


//Add Login Event
$("#btnLogin").on("click", function (event) {
    event.preventDefault();
    //Get elements
    var email = $("#txtEmail").val();
    var pass = $("#textPassword").val();
    firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(function (response) {
            console.log(response);
            window.location = 'zip.html';
        })
        .catch(function (error) {
            // Handle Errors here.
            $("#alert").modal("show");
            // ...
        });

});

//Add Signup Event
$("#btnSignup").on("click", function (event) {
    event.preventDefault();
    //Get elements
    var email = $("#txtEmail").val();
    var pass = $("#textPassword").val();

    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
    $("#sign-in").modal("show");
});

// firebase.auth().onAuthStateChanged(user => {
//     if(user) {
//       window.location = 'zip.html'; //After successful login, user will be redirected to home.html
//     }
//   });

$("#btnLogout").on("click", function (event) {
    event.preventDefault();
    //Get elements

    firebase.auth().signOut()
        .then(function () {
            alert("signed out");
        })
        .catch(function (error) {
            console.log(error);
        })
});
