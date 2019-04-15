var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=19125&units=imperial&appid=6832cd13112f3ff58acaee5e7646c57a";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {

    console.log(response);

    $(".temp3").text("Current Temperature (F): " + response.list[0].main.temp);
    $(".conditions").text("Current Conditions: " + response.list[0].weather[0].description);

    //-----------------------------------------------------------------

    var suggestionDay = response.list[0].main.temp;

    if (suggestionDay >= 60)
        $(".suggestDay").text("Woot!  Looks like SHORTS today!");
    else
        $(".suggestDay").text("Nope, today looks like PANTS weather.. bummer");

    //-----------------------------------------------------------------

    var cloudCover = response.list[0].clouds.all;
    var rainChance = response.list[0].weather[0].main;

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


});