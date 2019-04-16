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

//Launch Login Modal
$(window).on('load', function () {
    $('#loginModal').modal('show');
});


//Add Login Event
$("#btnLogin").on("click", function (event) {
    event.preventDefault();
    //Get elements
    var email = $("#txtEmailLgn").val();
    var pass = $("#textPasswordLgn").val();
    firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(function (response) {
            console.log(response);
            $('#loginModal').modal('hide');
        })
        .catch(function (error) {
            // Handle Errors here.
            $("#alertArea").removeClass("invisible");
            $("#alert").text("Hold on -- Let's Get You Signed Up...");
            $('#signUpModal').modal('show');
            // ...
        });

});

//Trigger Sign-Up
$("#sign-up-trig").on("click", function (event) {
    event.preventDefault();
    $('#signUpModal').modal('show');
});

//Add Signup Event
$("#btnsignUp").on("click", function (event) {
    event.preventDefault();
    //Get elements
    var email = $("#txtEmailSgu").val();
    var pass = $("#textPasswordSgu").val();

    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(problem)
        // ...
    });
    console.log("hi");
    $('#loginModal').modal('hide');
    $('#signUpModal').modal('hide');

});

//Add Logout Event
$("#btnLogout").on("click", function (event) {
    event.preventDefault();
    firebase.auth().signOut()
        .then(function () {
            $('#loginModal').modal('hide');
        })
        .catch(function (error) {
            console.log(error);
            $('#loginModal').modal('show');
        })
});

//Add Logout Event
$("#btnLogoutNav").on("click", function (event) {
    event.preventDefault();
    firebase.auth().signOut()
        .then(function () {
            $('#loginModal').modal('hide');
        })
        .catch(function (error) {
            console.log(error);
            $('#loginModal').modal('hshow');
        })
});

var user;


//Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        user = firebaseUser
        console.log(firebaseUser);
        console.log(firebaseUser.email);
        console.log(firebaseUser.uid);
        console.log("hi user");
        $('#loginModal').modal('hide');
        $('#signUpModal').modal('hide');
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
    console.log(zip);
    console.log(user.uid);

    localStorage.setItem("zip", zip);
    
    console.log(localStorage.getItem("zip"));

/*     var newUser = {
        uid: user.uid,
        email: email,
        zip: zip
    };

    database.ref('users/').push(newUser); */

    // console.log(newUser.email)
    // console.log(newUser.zip)

    window.location.href = "landing page.html";
});


/* var database = firebase.database();
DatabaseReference ref = database.getReference('users/user.uid/email');
var query = users
    .orderByChild('email')
    .equalTo(firebaseUser.email)
    .limitToLast(1);

query.on('value', snap => {
    console.log(response);
}) */

/*-----------------! Geo Location !---------------------*/
$("#btnGeoGo").on("click", function (event) {

    event.preventDefault();

   var lat;
   var long;

    
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;

            localStorage.setItem("latitude", lat);
            localStorage.setItem("longitude", long);
         });
   
           
            console.log(localStorage.getItem("latitude"));
            console.log(localStorage.getItem("longitude"));

 /*            var newUser = {
                email: email,
                latitude: lat,
                longitude: long
            }


    database.ref('users/' + user.uid).set(newUser); */

    window.location.href = "landing page.html";

});

