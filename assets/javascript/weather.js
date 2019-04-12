var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=19125&units=imperial&appid=6832cd13112f3ff58acaee5e7646c57a";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {

    console.log(response);

    $(".temp3").text("Current Temperature (F): " + response.list[0].main.temp);

    //-----------------------------------------------------------------

    var suggestionDay = response.list[0].main.temp;

    if (suggestionDay >= 60)
        $(".suggestDay").text("Woot!  Looks like a SHORTS today!");
    else
        $(".suggestDay").text("Nope, today looks like PANTS weather.. bummer");

    //-----------------------------------------------------------------

    // var suggestionImage = response.list[0].weather[0].description;
    
    // if(suggestionImage == sun) {
    //     document.getElementById("img").src = "https://www.w3schools.com/css/trolltunga.jpg";

    //  } else {
    //     document.getElementById("img").src = "http://wallpaper-         gallery.net/images/image/image-13.jpg";
    // }



});