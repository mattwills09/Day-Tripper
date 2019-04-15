//-----------------SHOWING/PROCESSING WEATHER INFO------------------------

function processData(response) {

    $(".city").text(response.city.name + "'s Current Weather");
    $(".temp3").text("Current Temperature (F): " + response.list[0].main.temp);
    $(".conditions").text("Current Conditions: " + response.list[0].weather[0].description);

    $(".temp6").text("Forecasted Temperature (Next 6 hrs): " + response.list[1].main.temp);
    $(".conditions").text("Forecasted Conditions: " + response.list[1].weather[0].description);


    //-----------------------------------------------------------------

    var suggestionDay = response.list[0].main.temp;

    if (suggestionDay >= 60)
        $(".suggestDay").text("Woot!  Jen's kids can wear SHORTS today!");
    else
        $(".suggestDay").text("No shorts today, looks like you should bring a jacket also.. bummer");

    var suggestionNight = response.list[0].main.temp;

    if (suggestionNight >= 60)
        $(".suggestNight").text("Keep those shorts for later!");
    else
        $(".suggestNight").text("Most likely you'll need a jacket or sweater later, looks a little chilly.");

    //-----------------------------------------------------------------
    // 3-hour / Current Weather
    var cloudCover = response.list[0].clouds.all;
    var rainChance = response.list[0].weather[0].main;
    // 6-hour / Forecasted Weather
    var cloudCover6 = response.list[1].clouds.all;
    var rainChance6 = response.list[1].weather[0].main;

        console.log(rainChance);

    if (rainChance == "Rain") {
        $("#welcomeWeather").attr("src", "assets/images/rainy.png");  
    }
    else if(cloudCover >= 75) {
        $("#welcomeWeather").attr("src", "assets/images/cloudy.png");
     }
    else if(cloudCover >= 50) {
        $("#welcomeWeather").attr("src", "assets/images/partly-cloudy.png");
     }
    else {
        $("#welcomeWeather").attr("src", "assets/images/sunny.jpg");
    }

    if (rainChance6 == "Rain") {
        $("#forecastWeather").attr("src", "assets/images/rainy.png");  
    }
    else if(cloudCover6 >= 75) {
        $("#forecastWeather").attr("src", "assets/images/cloudy.png");
     }
    else if(cloudCover6 >= 50) {
        $("#forecastWeather").attr("src", "assets/images/partly-cloudy.png");
     }
    else {
        $("#forecastWeather").attr("src", "assets/images/sunny.jpg");
    }
};

//-----------------ZIP CODE API QUERY------------------------

zipSearch(99501);

function zipSearch(zipCode){
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + "&units=imperial&appid=6832cd13112f3ff58acaee5e7646c57a";

    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {

        processData(response);
        console.log(response);

    });
}

//-----------------LATITUDE/LONGITUDE API QUERY------------------------

// lat/lon of pennovation: 39.941433, -75.199385
geoSearch(29.76, -95.36);

function geoSearch(latitude, longitude){
var queryURL = "https://api.openweathermap.org/data/2.5/forecast/hourly?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=6832cd13112f3ff58acaee5e7646c57a";

    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {

        processData(response);
        console.log(response);

    });
}