$(document).ready(function () {
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
                $('#loginModal').modal('show');
            })
            .catch(function (error) {
                console.log(error);
            });
    });

    //Add Logout Event
    $("#btnLogoutNav").on("click", function (event) {
        event.preventDefault();
        firebase.auth().signOut()
            .then(function () {
                $('#loginModal').modal('show');
            })
            .catch(function (error) {
                console.log(error);
            });
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
        }
        else {
            console.log("not logged in");
        }
    });

    /*-----------------! Zipcode Portion !---------------------*/
    var database = firebase.database();

    $("#btnGo").on("click", function (event) {
        event.preventDefault();

        var zip = $("#zip-input").val();

        function checkZip(value) {
            return (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(value);
        };

        if (checkZip(zip)==true) {
           var corrZip=zip
           console.log(corrZip)
          } else { 
            $("#alertLocat").removeClass("invisible");
            $("#alertLocatTxt").text("Not a valid zip code -- try again.");
          };

        var newUser = {
            uid: user.uid,
            email: user.email,
            zip: corrZip

        };

        database.ref("user/" + user.uid).set(newUser);
        localStorage.setItem("zip", corrZip);
        window.location.href = "./welcome.html";
    });

    /*-----------------! Geo Location !---------------------*/
    $("#btnGeoGo").on("click", function (event) {

        event.preventDefault();

        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;

            var newUser = {
                uid: user.uid,
                email: user.email,
                latitude: lat,
                longitude: long
            };

            database.ref("user/" + user.uid).set(newUser);
            localStorage.setItem("latitude", lat);
            localStorage.setItem("longitude", long);

        });
    });
});









