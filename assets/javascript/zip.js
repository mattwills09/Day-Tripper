$("#btnLogout").on("click", function (event) {
    event.preventDefault();
    firebase.auth().signOut()
        .then(function () {
            window.location.href = "index.html";
        })
        .catch(function (error) {
            onsole.log(error);
        })
});

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

//When authenticated user show zip-code input
var user = firebase.auth().currentUser;
var usersRef = firebase.database().ref("users");
if (user) {
  usersRef.child(user.uid).set({ 
    email: email,
    zip: zip,
  });
}

//Push Data to Database
var database = firebase.database();

$("#find-zipcode").on("click", function (event) {

    event.preventDefault();

    var zip = $("#zip-input").val();


    var User = {
        zip: zip
    };

    database.ref().push(User);

    $("#zip-input").val("");

    //Create Firebase event for adding to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot) {
        // storing the snapshot.val() in a variable for convenience
        console.log(childSnapshot.val());

        //Stores everything into a variable
        var userZip = childSnapshot.val().zip;

        // Train info
        console.log(userZip);

        $("#zipcode-reveal").text("Let's head to " + userZip),

            function (errorObject) {
                console.log("Errors handled: " + errorObject.code);
            };
    });
});


