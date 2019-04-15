var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=99501&units=imperial&appid=6832cd13112f3ff58acaee5e7646c57a";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {

    console.log(response);

    $(".city").text(response.city.name + "'s Current Weather");
    $(".temp3").text("Current Temperature (F): " + response.list[0].main.temp);
    $(".conditions").text("Current Conditions: " + response.list[0].weather[0].description);

    $(".temp6").text("Forecasted Temperature (Next 6 hrs): " + response.list[1].main.temp);
    $(".conditions").text("Forecasted Conditions: " + response.list[1].weather[0].description);

    //-----------------------------------------------------------------

    var suggestionDay = response.list[0].main.temp;

    if (suggestionDay >= 60)
        $(".suggestDay").text("Woot!  Looks like SHORTS today!");
    else
        $(".suggestDay").text("Nope, today looks like PANTS weather.. bummer");

    var suggestionNight = response.list[0].main.temp;

    if (suggestionNight >= 60)
        $(".suggestNight").text("Keep those shorts for later!");
    else
        $(".suggestNight").text("Might need pants later, looks a little chilly.");

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