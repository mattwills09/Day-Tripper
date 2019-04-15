$(document).ready(function () {

  //--------------------------! Logout Button !--------------------------
$("#btnLogout").on("click", function (event) {
  event.preventDefault();
  firebase.auth().signOut()
      .then(function () {
          window.location.href = "index.html";
      })
      .catch(function (error) {
          console.log(error);
      })
});

zipSearch(19010);
  //SHARED GLOBAL VARIABLES
  var zipcode = "";
  var lat = "";
  var long = "";
  var rainChance;

  //array to hold POI (point of interest) objects
  var yelpResults = [];

  //array to hold categories that the user chooses
  //these are pulled from the id attribute of buttons the user clicks
  var chosenCategories = [];

  //predefined categories (Al)
  var outdoorsActivities = ["Destinations", "Motor sports", "Nature", "Parks and Recreation", "Tours", "Water sports", "Wild Life Gaming", "Winter sports"];
  var inOutActivities = ["Adventure sports", "Arts and Entertainment", "Clubs and Organizations", "Combat Sports", "Cultural", "Fitness", "Food and Drink", "Gaming", "Kid centric", "Mindfulness", "Participant sports", "Spectator sports"];
  var indoorActivities = ["Movies", "Museums", "Participant Arts", "Spiritualistic"];
  var activityCategory = [
    {activity:"bungeejumping", category:"Adventure sports"},
    {activity:"climbing", category:"Adventure sports"},
    {activity:"zorbing", category:"Adventure sports"},
    {activity:"rock_climbing", category:"Adventure sports"},
    {activity:"trampoline", category:"Adventure sports"},
    {activity:"zipline", category:"Adventure sports"},
    {activity:"eatertainment", category:"Arts and Entertainment"},
    {activity:"jazzandblues", category:"Arts and Entertainment"},
    {activity:"musicvenues", category:"Arts and Entertainment"},
    {activity:"publicart", category:"Arts and Entertainment"},
    {activity:"sports_clubs", category:"Clubs and Organizations"},
    {activity:"countryclubs", category:"Clubs and Organizations"},
    {activity:"gun_ranges", category:"Combat Sports"},
    {activity:"culturalcenter", category:"Cultural"},
    {activity:"aerialfitness", category:"Fitness"},
    {activity:"fitness", category:"Fitness"},
    {activity:"pilates", category:"Fitness"},
    {activity:"healthtrainers	", category:"Fitness"},
    {activity:"yoga", category:"Mindfulness"},
    {activity:"wineries", category:"Food and Drink"},
    {activity:"sportsbetting", category:"Gaming"},
    {activity:"daycamps", category:"Kid centric"},
    {activity:"kids_activities", category:"Kid centric"},
    {activity:"makerspaces", category:"Kid centric"},
    {activity:"summer_camps", category:"Kid centric"},
    {activity:"taichi", category:"Mindfulness"},
    {activity:"qigong", category:"Mindfulness"},
    {activity:"pettingzoos", category:"Nature"},
    {activity:"studiotaping", category:"Participant Arts"},
    {activity:"amateursportsteams", category:"Participant sports"},
    {activity:"archery", category:"Participant sports"},
    {activity:"axethrowing", category:"Participant sports"},
    {activity:"basketballcourts", category:"Participant sports"},
    {activity:"bubblesoccer", category:"Participant sports"},
    {activity:"discgolf", category:"Participant sports"},
    {activity:"races", category:"Participant sports"},
    {activity:"skatingrinks", category:"Participant sports"},
    {activity:"football", category:"Participant sports"},
    {activity:"tennis", category:"Participant sports"},
    {activity:"racingexperience", category:"Participant sports"},
    {activity:"squash", category:"Participant sports"},
    {activity:"horseracing", category:"Spectator sports"},
    {activity:"stadiumsarenas", category:"Spectator sports"},
    {activity:"sportsteams", category:"Spectator sports"},
    {activity:"racetracks", category:"Spectator sports"},
    {activity:"swimmingpools", category:"Water sports"},
    {activity:"swimminglessons", category:"Water sports"},
    {activity:"dartarenas", category:"Adventure sports"},
    {activity:"galleries", category:"Arts and Entertainment"},
    {activity:"cabaret", category:"Arts and Entertainment"},
    {activity:"hauntedhouses", category:"Arts and Entertainment"},
    {activity:"opera", category:"Arts and Entertainment"},
    {activity:"social_clubs", category:"Clubs and Organizations"},
    {activity:"airsoft", category:"Combat Sports"},
    {activity:"brazilianjiujitsu", category:"Combat Sports"},
    {activity:"chinesemartialarts", category:"Combat Sports"},
    {activity:"karate", category:"Combat Sports"},
    {activity:"kickboxing", category:"Combat Sports"},
    {activity:"martialarts", category:"Combat Sports"},
    {activity:"muaythai", category:"Combat Sports"},
    {activity:"selfdefenseclasses", category:"Combat Sports"},
    {activity:"taekwondo", category:"Combat Sports"},
    {activity:"barreclasses", category:"Fitness"},
    {activity:"boxing", category:"Fitness"},
    {activity:"cardioclasses", category:"Fitness"},
    {activity:"circuittraininggyms", category:"Fitness"},
    {activity:"cyclingclasses", category:"Fitness"},
    {activity:"gymnastics", category:"Fitness"},
    {activity:"gyms", category:"Fitness"},
    {activity:"intervaltraininggyms", category:"Fitness"},
    {activity:"winetastingroom", category:"Food and Drink"},
    {activity:"paintandsip", category:"Food and Drink"},
    {activity:"virtualrealitycenters", category:"Gaming"},
    {activity:"arcades", category:"Gaming"},
    {activity:"bingo", category:"Gaming"},
    {activity:"casinos", category:"Gaming"},
    {activity:"lancenters", category:"Gaming"},
    {activity:"indoor_playcenter", category:"Kid centric"},
    {activity:"meditationcenters", category:"Mindfulness"},
    {activity:"movietheaters", category:"Movies"},
    {activity:"artmuseums", category:"Museums"},
    {activity:"childrensmuseums", category:"Museums"},
    {activity:"museums", category:"Museums"},
    {activity:"observatories", category:"Museums"},
    {activity:"planetarium", category:"Museums"},
    {activity:"aquariums", category:"Parks and Recreation"},
    {activity:"dancestudio", category:"Participant Arts"},
    {activity:"bowling", category:"Participant sports"},
    {activity:"fencing", category:"Participant sports"},
    {activity:"astrologers", category:"Spiritualistic"},
    {activity:"mystics", category:"Spiritualistic"},
    {activity:"psychicmediums", category:"Spiritualistic"},
    {activity:"psychics", category:"Spiritualistic"},
    {activity:"psychic_astrology", category:"Spiritualistic"},
    {activity:"canyoneering", category:"Adventure sports"},
    {activity:"escapegames", category:"Adventure sports"},
    {activity:"hanggliding", category:"Adventure sports"},
    {activity:"horsebackriding", category:"Adventure sports"},
    {activity:"hot_air_balloons", category:"Adventure sports"},
    {activity:"mountainbiking", category:"Adventure sports"},
    {activity:"paragliding", category:"Adventure sports"},
    {activity:"skydiving", category:"Adventure sports"},
    {activity:"carousels", category:"Arts and Entertainment"},
    {activity:"festivals", category:"Arts and Entertainment"},
    {activity:"theater", category:"Arts and Entertainment"},
    {activity:"lasertag", category:"Combat Sports"},
    {activity:"paintball", category:"Combat Sports"},
    {activity:"beaches", category:"Destinations"},
    {activity:"lakes", category:"Destinations"},
    {activity:"bootcamps", category:"Fitness"},
    {activity:"challengecourses", category:"Fitness"},
    {activity:"pickyourown", category:"Food and Drink"},
    {activity:"mini_golf", category:"Gaming"},
    {activity:"scavengerhunts", category:"Gaming"},
    {activity:"atvrentals", category:"Motor sports"},
    {activity:"gokarts", category:"Motor sports"},
    {activity:"scooterrentals", category:"Motor sports"},
    {activity:"driveintheater", category:"Movies"},
    {activity:"outdoormovies", category:"Movies"},
    {activity:"hiking", category:"Nature"},
    {activity:"ranches", category:"Nature"},
    {activity:"zoos", category:"Nature"},
    {activity:"attractionfarms", category:"Nature"},
    {activity:"gardens", category:"Nature"},
    {activity:"farms", category:"Nature"},
    {activity:"amusementparks", category:"Parks and Recreation"},
    {activity:"dog_parks", category:"Parks and Recreation"},
    {activity:"parks", category:"Parks and Recreation"},
    {activity:"playgrounds", category:"Parks and Recreation"},
    {activity:"recreation", category:"Parks and Recreation"},
    {activity:"parklets", category:"Parks and Recreation"},
    {activity:"badminton", category:"Participant sports"},
    {activity:"baseballfields", category:"Participant sports"},
    {activity:"battingcages", category:"Participant sports"},
    {activity:"bobsledding", category:"Participant sports"},
    {activity:"bocceball", category:"Participant sports"},
    {activity:"flyboarding", category:"Participant sports"},
    {activity:"golf", category:"Participant sports"},
    {activity:"golflessons", category:"Participant sports"},
    {activity:"skate_parks", category:"Participant sports"},
    {activity:"pickleball", category:"Participant sports"},
    {activity:"rodeo", category:"Spectator sports"},
    {activity:"bikeparking", category:"Tours"},
    {activity:"bikerentals", category:"Tours"},
    {activity:"beachequipmentrental", category:"Water sports"},
    {activity:"boating", category:"Water sports"},
    {activity:"diving", category:"Water sports"},
    {activity:"freediving", category:"Water sports"},
    {activity:"jetskis", category:"Water sports"},
    {activity:"kiteboarding", category:"Water sports"},
    {activity:"paddleboarding", category:"Water sports"},
    {activity:"parasailing", category:"Water sports"},
    {activity:"rafting", category:"Water sports"},
    {activity:"sailing", category:"Water sports"},
    {activity:"scuba", category:"Water sports"},
    {activity:"snorkeling", category:"Water sports"},
    {activity:"surfing", category:"Water sports"},
    {activity:"tubing", category:"Water sports"},
    {activity:"waterparks", category:"Water sports"},
    {activity:"fishing", category:"Wild Life Gaming"},
    {activity:"wildlifehunting", category:"Wild Life Gaming"},
    {activity:"sledding", category:"Winter sports"}];




 /*** WEATHER WEATHER WEATHER***/

 function processData(response){
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
  rainChance = response.list[0].weather[0].main;//update global 
  // 6-hour / Forecasted Weather
  var cloudCover6 = response.list[1].clouds.all;
  var rainChance6 = response.list[1].weather[0].main;



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


function zipSearch(zipCode){
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + "&units=imperial&appid=6832cd13112f3ff58acaee5e7646c57a";

  $.ajax({
  url: queryURL,
  method: "GET"
  }).then(function(response) {

      processData(response)

        if(rainChance == "Clear"){
          outdoorsActivities.forEach(function (item) {
            makeButton(item,"#categories-1");
          });
          inOutActivities.forEach(function (item) {
            makeButton(item,"#categories-1");
          });
          indoorActivities.forEach(function (item) {
            makeButton(item,"#categories-2");
          });    
        }
        else{
          indoorActivities.forEach(function (item) {
            makeButton(item,"#categories-1");
          });    
          inOutActivities.forEach(function (item) {
            makeButton(item,"#categories-1");
          });
          outdoorsActivities.forEach(function (item) {
            makeButton(item,"#categories-2");
          });         
      }
  });
}

//-----------------LATITUDE/LONGITUDE API QUERY------------------------

function geoSearch(latitude, longitude){
var queryURL = "https://api.openweathermap.org/data/2.5/forecast/hourly?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=6832cd13112f3ff58acaee5e7646c57a";

  $.ajax({
  url: queryURL,
  method: "GET"
  }).then(function(response) {

      processData(response);


  });
}


  /****  YELP  FUNCTIONALITY ****/

  //POI object constructor takes a JSON object returned by yelp API call
  function POI(response) {
    this.name = response.name, //business name
      this.street = response.location.display_address[0], //building number, street name
      this.city = response.location.display_address[1], //city, zip code
      this.link = response.url, //link to business page on yelp
      this.hours = response.hours,//an array of hours objects from yelp; needs to be processed
      this.phone = response.display_phone //phone number
  }

  getPOIsCOORDS("Martial", "39.9553076", "-75.1720374")


  //Function to make a yelp API. Takes category(string) and location (zip code number)
  function getPOIsZIP(category, location) {
    var category = category;
    var location = location;

    //yelp query url to search by category and location, with a set radius
    var queryURL = "https://cors-anywhere.herokuapp.com/http://api.yelp.com/v3/businesses/search?radius=2000&categories=" + category + "&location=" + location;

    //settings for the ajax call
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": queryURL,
      "method": "GET",
      "headers": {
        "Authorization": "Bearer a3QTS8V50rV_Xf4jHgTIeYnfEPmEy74KhtAYhFuPJG2ai4R4NVzM4SebzmbeD5ZYDxjGd4O1ZU4ejWMq_5Z7JUUEwju02BaXT94shIGxKVpWhu7eLArA4JWxaDWuXHYx",
        "cache-control": "no-cache",
        "crossOrigin": "null",
        "Postman-Token": "a926db60-6442-448e-92fa-65bffe0a2bad"
      }
    }

    $.ajax(settings).then(function (response) {
      // console.log(response);
      //loop through the list of JSON responses
      // for (var i = 0; i < locations.length; i++){

      //   var yelpID = locations[i].id; //get the business id
      //   getPOIdetails(yelpID); //send the id to getPOIdetails for a second api call
      // }
    });
  }

  //function to make a yelp API call, takes 3 parameters: category (string), latitude (int), and longitude (int)
  function getPOIsCOORDS(category, lat, long) {
    var category = category;
    var lat = lat;
    var long = long;

    //yelp query url to search by category and location, with a set radius
    var queryURL = "https://cors-anywhere.herokuapp.com/http://api.yelp.com/v3/businesses/search?radius=2000&categories=" + category + "&latitude=" + lat + "&longitude=" + long;

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": queryURL,
      "method": "GET",
      "headers": {
        "Authorization": "Bearer a3QTS8V50rV_Xf4jHgTIeYnfEPmEy74KhtAYhFuPJG2ai4R4NVzM4SebzmbeD5ZYDxjGd4O1ZU4ejWMq_5Z7JUUEwju02BaXT94shIGxKVpWhu7eLArA4JWxaDWuXHYx",
        "cache-control": "no-cache",
        "crossOrigin": "null",
        "Postman-Token": "a926db60-6442-448e-92fa-65bffe0a2bad"
      }
    }

    $.ajax(settings).then(function (response) {
      var locations = response.businesses;
      //loop through the list of JSON responses
      // for (var i = 0; i < locations.length; i++){

      //   var yelpID = locations[i].id; //get the business id
      //   getPOIdetails(yelpID); //send the id to getPOIdetails for a second api call
      // }

      getPOIdetails(locations[0].id);
      getPOIdetails(locations[1].id);
      getPOIdetails(locations[2].id);


    });
  }

  //function to make a yelp API call, takes 1 parameter: yelpID (string)
  function getPOIdetails(yelpID) {

    //yelp query url to search by business ID
    var queryURL = "https://cors-anywhere.herokuapp.com/http://api.yelp.com/v3/businesses/" + yelpID;

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": queryURL,
      "method": "GET",
      "headers": {
        "Authorization": "Bearer a3QTS8V50rV_Xf4jHgTIeYnfEPmEy74KhtAYhFuPJG2ai4R4NVzM4SebzmbeD5ZYDxjGd4O1ZU4ejWMq_5Z7JUUEwju02BaXT94shIGxKVpWhu7eLArA4JWxaDWuXHYx",
        "cache-control": "no-cache",
        "crossOrigin": "null",
        "Postman-Token": "a926db60-6442-448e-92fa-65bffe0a2bad"
      }
    }

    $.ajax(settings).then(function (response) {
      var poi = new POI(response);

      yelpResults.push(poi);
      publishResults(yelpResults);
    })

  }

  //dynamically makes buttons based on categories users are allowed to search for
  function makeButton(name,div) {
    var name = name;
    var div = div;
    var btn = $("<button>");
    btn.text(name);
    btn.attr({ "id": name, "data-selected": "false", "class": "btn btn-outline-primary m-1" });//set default to data-selected = false

    //add click listeners to each button
    btn.on("click", function () {

      //if the button is unselected, select it and add to chosenCategories
      if ($(this).attr("data-selected") === "false") {


        chosenCategories.push(name); //add to chosenCategories array

        $(this).attr({ "data-selected": "true" }); //updated selected status

        $(this).addClass("btn-primary text-white");  //add the selected class
      }

      //if the button was already selected, unselect it and remove it from the chosenCategories
      else {

        var index = chosenCategories.indexOf(name) //get index of name in chosenCategories array

        chosenCategories.splice(index, 1); //remove that item from the array

        $(this).attr("data-selected", "false");  //update selected status

        $(this).removeClass("btn-primary text-white"); //remove the selected class
      }


    });

    $(div).append(btn);

  }

  function publishResults(yelpResults) {

    //for each of the yelp results
    yelpResults.forEach(function (result) {
      var name = result.name;
      var street = result.street;
      var city = result.city;
      var phone = result.phone;
      var link = result.link;

      var div = $("<div>");
      div.attr({ "id": result.name });

      div.append(addName(name)).append(addAddress(street, city)).append(addPhone(phone)).append(addLink(link));
   
      $("#results").append(div);
      function addName(name) {
        var nameTag = $("<h3>");
        nameTag.text(name);

        return nameTag;

      }
      function addAddress(street, city) {
        var addressTag = $("<p>");
        addressTag.text(street + ", " + city);

        return addressTag;
      }
      function addPhone(phone) {
        var phoneTag = $("<p>");
        phoneTag.text(phone);

        return phoneTag;
      }
      function addLink(link) {
        var linkTag = $("<a>");
        linkTag.attr({ "href": link }).text("Open in Yelp");

        return linkTag;
      }
    });
  }

$("#submit").on("click",function(e){
  e.preventDefault();
  chosenCategories.forEach(function(selected){
    var selected = selected;
    activityCategory.forEach(function(item){
      if(selected == item.category){
        console.log(item.activity);
      }
    })
  });
});

 /*** END YELP***/

 
  //close document ready  
});