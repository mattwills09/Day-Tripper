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

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + userZip + "&units=imperial&appid=6832cd13112f3ff58acaee5e7646c57a";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            $(".city").html("<h1>" + response.city.name + " Weather Details</h1>");
            $(".3-Hour").html("<h2>3-Hour Forecast</h2>");   
            $(".temp3").text("Temperature (F) For Next 3 Hours: " + response.list[0].main.temp);
            $(".conditions3").text("Current Conidtions: " + response.list[0].weather[0].description);
            $(".wind3").text("Wind Speed: " + response.list[0].wind.speed + " mph");
            $(".humidity3").text("Humidity: " + response.list[0].main.humidity);
            $(".temp3max").text("Next 3 Hours - Max Temperature (F): " + response.list[0].main.temp_max);
            $(".temp3min").text("Next 3 Hours - Min Temperature (F): " + response.list[0].main.temp_min);
            $(".6-Hour").html("<h2>3-Hour Forecast</h2>");   
            $(".temp6").text("Forecasted Temperature (F) in 6 Hours: " + response.list[1].main.temp);
            $(".conditions6").text("Current Conidtions: " + response.list[1].weather[0].description);
            $(".wind6").text("Wind Speed: " + response.list[1].wind.speed + " mph");
            $(".humidity6").text("Humidity: " + response.list[1].main.humidity);
            $(".temp6max").text("Next 6 Hours - Max Temperature (F): " + response.list[1].main.temp_max);
            $(".temp6min").text("Next 6 Hours - Min Temperature (F): " + response.list[1].main.temp_min);

            //------------------------------------------------------------

            var suggestionDay = response.list[0].main.temp_max;

            if (suggestionDay >= 60)
                $(".suggestion-day").text("Today looks like a SHORTS day!");
            else
                $(".suggestion-day").text("Nope, today looks like PANTS weather.. bummer");

            var suggestionNight = response.list[1].main.temp_max;

            if (suggestionNight >= 60)
                $(".suggestion-night").text("Tonight looks like a SHORTS night!");
            else
                $(".suggestion-night").text("Nope, tonight looks like PANTS weather.. bummer");

            //------------------------------------------------------------

            console.log(suggestion);
            console.log("Temperature (F): " + response.list[0].main.temp);
            console.log("Current Conidtions: " + response.list[0].weather[0].description);
            console.log("Wind Speed: " + response.list[0].wind.speed + " mph");
            console.log("Next 3 Hours - Max Temperature (F): " + response.list[0].main.temp_max);
            console.log("Next 3 Hours - Min Temperature (F): " + response.list[0].main.temp_min);
            console.log("Next 6 Hours - Max Temperature (F): " + response.list[0].main.temp_max);
            console.log("Next 6 Hours - Min Temperature (F): " + response.list[0].main.temp_min);

        });
    });
});