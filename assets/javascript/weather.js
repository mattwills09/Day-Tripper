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


//Push Data to Database
var database = firebase.database();


//Create Firebase event for adding to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    // storing the snapshot.val() in a variable for convenience
    console.log(childSnapshot.val());

    //Stores everything into a variable
    var userZip = childSnapshot.val().zip;

    // Train info
    console.log(userZip);

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + userZip + "&units=imperial&appid=6832cd13112f3ff58acaee5e7646c57a";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        $(".city").html("<h1>" + response.city.name + " Weather Details</h1>");

    });


        // var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=19125&units=imperial&appid=6832cd13112f3ff58acaee5e7646c57a";

        // $.ajax({
        //     url: queryURL,
        //     method: "GET"
        // }).then(function (response) {

        //     console.log(response);

        //     $(".temp3").text("Current Temperature (F): " + response.list[0].main.temp);

        //     //-----------------------------------------------------------------

        //     var suggestionDay = response.list[0].main.temp;

        //     if (suggestionDay >= 60)
        //         $(".suggestDay").text("Woot!  Looks like a SHORTS today!");
        //     else
        //         $(".suggestDay").text("Nope, today looks like PANTS weather.. bummer");

        //     //-----------------------------------------------------------------

        //     // var suggestionImage = response.list[0].weather[0].description;

        //     // if(suggestionImage == sun) {
        //     //     document.getElementById("img").src = "https://www.w3schools.com/css/trolltunga.jpg";

        //     //  } else {
        //     //     document.getElementById("img").src = "http://wallpaper-         gallery.net/images/image/image-13.jpg";
        //     // }



        // });
});