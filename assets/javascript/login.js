
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
            $("#zipModal").modal("show");
        })
        .catch(function (error) {
            // Handle Errors here.
            $("#alertArea").removeClass("invisible");
            $("#alert").text("Hold on -- Let's Get You Signed Up...");
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
        console.log(problem)
        // ...
    });
    $("#alertArea").removeClass("invisible");
    $("#alert").text("You're signed up! Let's login in now...");
});

//Add Logout Event
$("#btnLogout").on("click", function (event) {
    event.preventDefault();
    firebase.auth().signOut()
        .then(function () {
            $("#alertArea").removeClass("invisible");
            $("#alert").text("Hold on -- Let's Get You Signed Up...");
        })
        .catch(function (error) {
            console.log(error);
        })
});


//Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        $("#logout").removeClass("invisible");
    }
    else {
        console.log("not logged in");
        $("#logout").addClass("invisible");
    }
});

/*-----------------! Zipcode Portion !---------------------*/

var database = firebase.database();

$("#btnGo").on("click", function (event) {

    event.preventDefault();

    var email = $("#txtEmail").val();
    var zip = $("#zip-input").val();


    var User = {
        email: email,
        zip: zip
    };

    database.ref().push(User);

     //Create Firebase event for adding to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot) {
        // storing the snapshot.val() in a variable for convenience
        console.log(childSnapshot.val());

        //Stores everything into a variable
        var userZip = childSnapshot.val().zip;

        // Train info
        console.log(userZip);
    });
    window.location = 'welcome.html';
});
