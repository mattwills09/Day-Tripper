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

  //SHARED GLOBAL VARIABLES
  var zipcode = localStorage.getItem("zip");
  console.log("zipcode: "+zipcode);
  var lat = "";
  var long = "";
  var rainChance;

   /*** WEATHER WEATHER WEATHER***/
   
  //Takes a JSON object from the weather API and uses it to give the user suggestions on how to prepare for that day's weather
  function processWeatherData(response) {
    $(".city").text(response.city.name + "'s Current Weather");
    $(".temp3").text("Current Temperature (F): " + response.list[0].main.temp);
    $(".conditions").text("Current Conditions: " + response.list[0].weather[0].description);

    $(".temp6").text("Forecasted Temperature (Next 6 hrs): " + response.list[1].main.temp);
    $(".conditions").text("Forecasted Conditions: " + response.list[1].weather[0].description);


    //-----------------------------------------------------------------

    var suggestionDay = response.list[0].main.temp;

    if (suggestionDay >= 60) {
        $(".suggestDay").text("Woot!  Jen's kids can wear SHORTS today!");
        $("#topsIcon").attr("src", "assets/images/tshirt.png");
        $("#bottomsIcon").attr("src", "assets/images/shorts.png");}
    else {
        $(".suggestDay").text("No shorts today, looks like you should bring a jacket also.. bummer.");
        $("#topsIcon").attr("src", "assets/images/jacket.png");
        $("#bottomsIcon").attr("src", "assets/images/pants.png");
    }

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
    else if (cloudCover >= 75) {
      $("#welcomeWeather").attr("src", "assets/images/cloudy.png");
    }
    else if (cloudCover >= 50) {
      $("#welcomeWeather").attr("src", "assets/images/partly-cloudy.png");
    }
    else {
      $("#welcomeWeather").attr("src", "assets/images/sunny.jpg");
    }

    if (rainChance6 == "Rain") {
      $("#forecastWeather").attr("src", "assets/images/rainy.png");
    }
    else if (cloudCover6 >= 75) {
      $("#forecastWeather").attr("src", "assets/images/cloudy.png");
    }
    else if (cloudCover6 >= 50) {
      $("#forecastWeather").attr("src", "assets/images/partly-cloudy.png");
    }
    else {
      $("#forecastWeather").attr("src", "assets/images/sunny.jpg");
    }
  }
  //object with two methods, zipSearch to make API call based on zip, and geoSearch to make API call based on geolocation
  var getWeather = {
    //-----------------ZIP CODE API QUERY------------------------


    zipSearch: function (zipCode) {
      var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipCode + "&units=imperial&appid=6832cd13112f3ff58acaee5e7646c57a";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        processWeatherData(response)

        if (rainChance == "Clear") {
          outdoorsActivities.forEach(function (item) {
            makeButton(item, "#categories-1");
          });
          inOutActivities.forEach(function (item) {
            makeButton(item, "#categories-1");
          });
          indoorActivities.forEach(function (item) {
            makeButton(item, "#categories-2");
          });
        }
        else {
          indoorActivities.forEach(function (item) {
            makeButton(item, "#categories-1");
          });
          inOutActivities.forEach(function (item) {
            makeButton(item, "#categories-1");
          });
          outdoorsActivities.forEach(function (item) {
            makeButton(item, "#categories-2");
          });
        }
      });
    },

    //-----------------LATITUDE/LONGITUDE API QUERY------------------------

    geoSearch: function (latitude, longitude) {
      var queryURL = "https://api.openweathermap.org/data/2.5/forecast/hourly?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=6832cd13112f3ff58acaee5e7646c57a";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {

        processWeatherData(response);


      });
    }
  }

  getWeather.zipSearch(zipcode);
 
  ////////////////////
 /*** END WEATHER***/

 /////////////
 /////////////
 /**** YELP ****/

  //array to hold POI (point of interest) objects
  var yelpResults = {};
  var searchCategories = [];
  var myList = []; //arry of POIs that user saved

  //array to hold categories that the user chooses
  //these are pulled from the id attribute of buttons the user clicks
  var chosenCategories = [];

  //predefined categories (Al)
  var outdoorsActivities = ["Destinations", "Motor sports", "Nature", "Parks and Recreation", "Tours", "Water sports", "Wild Life Gaming", "Winter sports"];
  var inOutActivities = ["Adventure sports", "Arts and Entertainment", "Clubs and Organizations", "Combat Sports", "Cultural", "Fitness", "Food and Drink", "Gaming", "Kid centric", "Mindfulness", "Participant sports", "Spectator sports"];
  var indoorActivities = ["Movies", "Museums", "Participant Arts", "Spiritualistic"];
  var activityCategory = [
    { activity: "bungeejumping", category: "Adventure sports" },
    { activity: "climbing", category: "Adventure sports" },
    { activity: "zorbing", category: "Adventure sports" },
    { activity: "rock_climbing", category: "Adventure sports" },
    { activity: "trampoline", category: "Adventure sports" },
    { activity: "zipline", category: "Adventure sports" },
    { activity: "eatertainment", category: "Arts and Entertainment" },
    { activity: "jazzandblues", category: "Arts and Entertainment" },
    { activity: "musicvenues", category: "Arts and Entertainment" },
    { activity: "publicart", category: "Arts and Entertainment" },
    { activity: "sports_clubs", category: "Clubs and Organizations" },
    { activity: "countryclubs", category: "Clubs and Organizations" },
    { activity: "gun_ranges", category: "Combat Sports" },
    { activity: "culturalcenter", category: "Cultural" },
    { activity: "aerialfitness", category: "Fitness" },
    { activity: "fitness", category: "Fitness" },
    { activity: "pilates", category: "Fitness" },
    { activity: "healthtrainers	", category: "Fitness" },
    { activity: "yoga", category: "Mindfulness" },
    { activity: "wineries", category: "Food and Drink" },
    { activity: "sportsbetting", category: "Gaming" },
    { activity: "daycamps", category: "Kid centric" },
    { activity: "kids_activities", category: "Kid centric" },
    { activity: "makerspaces", category: "Kid centric" },
    { activity: "summer_camps", category: "Kid centric" },
    { activity: "taichi", category: "Mindfulness" },
    { activity: "qigong", category: "Mindfulness" },
    { activity: "pettingzoos", category: "Nature" },
    { activity: "studiotaping", category: "Participant Arts" },
    { activity: "amateursportsteams", category: "Participant sports" },
    { activity: "archery", category: "Participant sports" },
    { activity: "axethrowing", category: "Participant sports" },
    { activity: "basketballcourts", category: "Participant sports" },
    { activity: "bubblesoccer", category: "Participant sports" },
    { activity: "discgolf", category: "Participant sports" },
    { activity: "races", category: "Participant sports" },
    { activity: "skatingrinks", category: "Participant sports" },
    { activity: "football", category: "Participant sports" },
    { activity: "tennis", category: "Participant sports" },
    { activity: "racingexperience", category: "Participant sports" },
    { activity: "squash", category: "Participant sports" },
    { activity: "horseracing", category: "Spectator sports" },
    { activity: "stadiumsarenas", category: "Spectator sports" },
    { activity: "sportsteams", category: "Spectator sports" },
    { activity: "racetracks", category: "Spectator sports" },
    { activity: "swimmingpools", category: "Water sports" },
    { activity: "swimminglessons", category: "Water sports" },
    { activity: "dartarenas", category: "Adventure sports" },
    { activity: "galleries", category: "Arts and Entertainment" },
    { activity: "cabaret", category: "Arts and Entertainment" },
    { activity: "hauntedhouses", category: "Arts and Entertainment" },
    { activity: "opera", category: "Arts and Entertainment" },
    { activity: "social_clubs", category: "Clubs and Organizations" },
    { activity: "airsoft", category: "Combat Sports" },
    { activity: "brazilianjiujitsu", category: "Combat Sports" },
    { activity: "chinesemartialarts", category: "Combat Sports" },
    { activity: "karate", category: "Combat Sports" },
    { activity: "kickboxing", category: "Combat Sports" },
    { activity: "martialarts", category: "Combat Sports" },
    { activity: "muaythai", category: "Combat Sports" },
    { activity: "selfdefenseclasses", category: "Combat Sports" },
    { activity: "taekwondo", category: "Combat Sports" },
    { activity: "barreclasses", category: "Fitness" },
    { activity: "boxing", category: "Fitness" },
    { activity: "cardioclasses", category: "Fitness" },
    { activity: "circuittraininggyms", category: "Fitness" },
    { activity: "cyclingclasses", category: "Fitness" },
    { activity: "gymnastics", category: "Fitness" },
    { activity: "gyms", category: "Fitness" },
    { activity: "intervaltraininggyms", category: "Fitness" },
    { activity: "winetastingroom", category: "Food and Drink" },
    { activity: "paintandsip", category: "Food and Drink" },
    { activity: "virtualrealitycenters", category: "Gaming" },
    { activity: "arcades", category: "Gaming" },
    { activity: "bingo", category: "Gaming" },
    { activity: "casinos", category: "Gaming" },
    { activity: "lancenters", category: "Gaming" },
    { activity: "indoor_playcenter", category: "Kid centric" },
    { activity: "meditationcenters", category: "Mindfulness" },
    { activity: "movietheaters", category: "Movies" },
    { activity: "artmuseums", category: "Museums" },
    { activity: "childrensmuseums", category: "Museums" },
    { activity: "museums", category: "Museums" },
    { activity: "observatories", category: "Museums" },
    { activity: "planetarium", category: "Museums" },
    { activity: "aquariums", category: "Parks and Recreation" },
    { activity: "dancestudio", category: "Participant Arts" },
    { activity: "bowling", category: "Participant sports" },
    { activity: "fencing", category: "Participant sports" },
    { activity: "astrologers", category: "Spiritualistic" },
    { activity: "mystics", category: "Spiritualistic" },
    { activity: "psychicmediums", category: "Spiritualistic" },
    { activity: "psychics", category: "Spiritualistic" },
    { activity: "psychic_astrology", category: "Spiritualistic" },
    { activity: "canyoneering", category: "Adventure sports" },
    { activity: "escapegames", category: "Adventure sports" },
    { activity: "hanggliding", category: "Adventure sports" },
    { activity: "horsebackriding", category: "Adventure sports" },
    { activity: "hot_air_balloons", category: "Adventure sports" },
    { activity: "mountainbiking", category: "Adventure sports" },
    { activity: "paragliding", category: "Adventure sports" },
    { activity: "skydiving", category: "Adventure sports" },
    { activity: "carousels", category: "Arts and Entertainment" },
    { activity: "festivals", category: "Arts and Entertainment" },
    { activity: "theater", category: "Arts and Entertainment" },
    { activity: "lasertag", category: "Combat Sports" },
    { activity: "paintball", category: "Combat Sports" },
    { activity: "beaches", category: "Destinations" },
    { activity: "lakes", category: "Destinations" },
    { activity: "bootcamps", category: "Fitness" },
    { activity: "challengecourses", category: "Fitness" },
    { activity: "pickyourown", category: "Food and Drink" },
    { activity: "mini_golf", category: "Gaming" },
    { activity: "scavengerhunts", category: "Gaming" },
    { activity: "atvrentals", category: "Motor sports" },
    { activity: "gokarts", category: "Motor sports" },
    { activity: "scooterrentals", category: "Motor sports" },
    { activity: "driveintheater", category: "Movies" },
    { activity: "outdoormovies", category: "Movies" },
    { activity: "hiking", category: "Nature" },
    { activity: "ranches", category: "Nature" },
    { activity: "zoos", category: "Nature" },
    { activity: "attractionfarms", category: "Nature" },
    { activity: "gardens", category: "Nature" },
    { activity: "farms", category: "Nature" },
    { activity: "amusementparks", category: "Parks and Recreation" },
    { activity: "dog_parks", category: "Parks and Recreation" },
    { activity: "parks", category: "Parks and Recreation" },
    { activity: "playgrounds", category: "Parks and Recreation" },
    { activity: "recreation", category: "Parks and Recreation" },
    { activity: "parklets", category: "Parks and Recreation" },
    { activity: "badminton", category: "Participant sports" },
    { activity: "baseballfields", category: "Participant sports" },
    { activity: "battingcages", category: "Participant sports" },
    { activity: "bobsledding", category: "Participant sports" },
    { activity: "bocceball", category: "Participant sports" },
    { activity: "flyboarding", category: "Participant sports" },
    { activity: "golf", category: "Participant sports" },
    { activity: "golflessons", category: "Participant sports" },
    { activity: "skate_parks", category: "Participant sports" },
    { activity: "pickleball", category: "Participant sports" },
    { activity: "rodeo", category: "Spectator sports" },
    { activity: "bikeparking", category: "Tours" },
    { activity: "bikerentals", category: "Tours" },
    { activity: "beachequipmentrental", category: "Water sports" },
    { activity: "boating", category: "Water sports" },
    { activity: "diving", category: "Water sports" },
    { activity: "freediving", category: "Water sports" },
    { activity: "jetskis", category: "Water sports" },
    { activity: "kiteboarding", category: "Water sports" },
    { activity: "paddleboarding", category: "Water sports" },
    { activity: "parasailing", category: "Water sports" },
    { activity: "rafting", category: "Water sports" },
    { activity: "sailing", category: "Water sports" },
    { activity: "scuba", category: "Water sports" },
    { activity: "snorkeling", category: "Water sports" },
    { activity: "surfing", category: "Water sports" },
    { activity: "tubing", category: "Water sports" },
    { activity: "waterparks", category: "Water sports" },
    { activity: "fishing", category: "Wild Life Gaming" },
    { activity: "wildlifehunting", category: "Wild Life Gaming" },
    { activity: "sledding", category: "Winter sports" }];



  //POI object constructor takes a JSON object returned by yelp API call
  function POI(response) {
    this.name = response.name, //business name
      this.street = response.location.display_address[0], //building number, street name
      this.city = response.location.display_address[1], //city, zip code
      this.link = response.url, //link to business page on yelp
      this.hours = response.hours,//an array of hours objects from yelp; needs to be processed
      this.phone = response.display_phone //phone number
  }
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
        "Authorization": "Bearer hodnYhVW-c-Et4OCFML-TQZbYU3DEG1wTfLrKICbacDyO4m4KmrRZefHxnQmvcC7nCSGVbGKCJdchohtf-amP9BNgKvT7K17Ba35kTrXwR8mrDW7IGrlF7z9t961XHYx",
        "cache-control": "no-cache",
        "crossOrigin": "null",
        "Postman-Token": "a926db60-6442-448e-92fa-65bffe0a2bad"
      }
    }

    return $.ajax(settings);

  }

  //function to make a yelp API call, takes 3 parameters: category (string), latitude (int), and longitude (int)
  function getPOIsCOORDS(category, lat, long) {
    // console.log("getPOICOORDS - category: " + category);
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

      if (JSON.stringify(response.businesses).length > 2) {
        for (var i = 0; i < JSON.stringify(locations.length); i++) {
          // console.log(JSON.stringify(locations[i].id));
          getPOIdetails(locations[i].id)
        }
      }
      else {
        alert("No results in you your area for " + selectedButton);
      }
    })
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
        "Authorization": "Bearer hodnYhVW-c-Et4OCFML-TQZbYU3DEG1wTfLrKICbacDyO4m4KmrRZefHxnQmvcC7nCSGVbGKCJdchohtf-amP9BNgKvT7K17Ba35kTrXwR8mrDW7IGrlF7z9t961XHYx",
        "cache-control": "no-cache",
        "crossOrigin": "null",
        "Postman-Token": "a926db60-6442-448e-92fa-65bffe0a2bad"
      }
    }


    $.ajax(settings).then(function (response) {
      var poi = new POI(response);
      
      var results = [];
      results.push(poi);
      publishResults(results);
      console.log(results);
    });

  }

  //dynamically makes buttons based on categories users are allowed to search for
  function makeButton(name, div) {
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

  function publishResults(POIs) {

    
    //for each of the yelp results
    POIs.forEach(function (result) {
      //grab data
      var name = result.name;
      var street = result.street;
      var city = result.city;
      var phone = result.phone;
      var hours = result.hours;
      var open = result.hours[0].is_open_now;
      var link = result.link;

      //make bootstrap card
      var div = $("<div class='card card-body m-2'>");
      div.attr({ "data-id": result.name });

      //append elements for each piece of data we want shown
      div.append(addName(name,open)).append(addAddress(street, city)).append(addPhone(phone)).append(addLink(link)).append(addListButton());
      //console.log("publishResults div: " + JSON.stringify(div));
      $("#results").append(div);

      function addName(name,open) {
        //console.log("addName");
        var nameTag = $("<h3 class='card-title'>");
        nameTag.text(name);
        //console.log(nameTag);
        if(open){
          var openTag = $("<span class='badge badge-success ml-2'>");
          openTag.text("open");    
          nameTag.append(openTag);
          
        }
        else{
          var openTag = $("<span class='badge badge-secondary ml-2'>");
          openTag.text("closed");    
          nameTag.append(openTag);
        }
        return nameTag;

      }
      function addAddress(street, city) {
        //console.log("addAddress");
        var addressTag = $("<h6 class='card-subtitle mb-3'>");
        addressTag.text(street + ", " + city);

        return addressTag;
      }
      function addPhone(phone) {
        //console.log("addPhone");
        var phoneTag = $("<p>");
        phoneTag.text(phone);

        return phoneTag;
      }
      function addLink(link) {
        //console.log("addLink");
        var linkTag = $("<a>");
        linkTag.attr({ "href": link }).text("Open in Yelp");

        return linkTag;
      }
      //button to add the parent card to the user saved list (my list)
      function addListButton(){
        var button = $("<button class='btn btn-outline-primary mt-2'>");
        button.text("Add to My List");
        //on click, save to my list
        button.on("click",function(){
          if(myList.indexOf(name) == -1){
            myList.push(name);//add to array
            //make a copy of the parent div
            var savedItem = $(this).closest("div").clone();
            //update the button on the cloned div to a remove button
            $(savedItem.find("button")).text("Remove").on("click",function(){
              //remove item from the array
              myList.splice(myList.indexOf(name),1);
              //remove item from DOM
              savedItem.remove();
              if(myList.length < 2){
                $("#emptyList").removeClass("hidden");
              }
              else{
                $("#emptyList").addClass("hidden");
              }
              var removedID = $(savedItem).attr("data-id");

              // $("div[data-id]='"+removedID+"'").find("button").attr("disabled",false);
             $('[data-id="'+removedID+'"]').find("button").attr("disabled",false).text("Add to my list");
             
            });
            //add div to my list
            savedItem.appendTo("#myList");
            $(this).text("Added to your list");
            $(this).attr("disabled",true);
          }
   
        });
        
        return button; //return to be appended to card
      }
    });
  }

  $("#myListButton").on("click", function(){
    if(myList.length < 1){
      $("#emptyList").removeClass("hidden");
    }
    else{
      $("#emptyList").addClass("hidden");
    }
  });

  //creates a promise to wait a certain amount of time before pushing them to the DOM
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //Makes yelp API calls based on the buttons the user selected
  async function yelpHandler() {
    var categoryCalls = []; //array to hold all subcategories associated with the broader categories available to users

    //go through categories that the user selected
    chosenCategories.forEach(function (selected) {
      var selected = selected;
      //go through all possible activity categories
      //this object is declared above in the predefined categories section
      activityCategory.forEach(function (item) {
        //see if they fall under one of the broader categories that the user selected
        if (selected == item.category) {
          //add to the array of categories to be searched
          searchCategories.push(item.activity);
        }
      });
    });

    //for each category the user selected
    for (var i = 0; i < searchCategories.length; i++) {
      //wait for half a second between calls because yelp rate limits
      await sleep(500);
      //add the ajax call into the categoryCalls array
      categoryCalls.push(getPOIsZIP(searchCategories[i], zipcode));


    }
    //after all categoryCalls are completed
    Promise.all(categoryCalls).then(function (categoryArray) {
      
      //loop through the list of JSON responses
      var categoryArray = categoryArray;

      //for each JSON object (which is a set of businesses that  match the category)
      categoryArray.forEach(function (yelpObject) {

        //save businesses in a variable
        var businesses = yelpObject.businesses;

        //loop through businesses
        if (businesses.length > 0) {
          for (var i = 0; i < businesses.length; i++) {
            //save the business into the yelpResults dictionary with id as key in order to avoid duplicates
            yelpResults[businesses[i].id] = businesses[i];
          }
        }
      });

      //make yelpResults into an array of their values
      var yelpResultsValues = Object.values(yelpResults);

      //for each of the businesses in yelpResultsValues
      for (var i = 0; i < yelpResultsValues.length; i++) {
        //use the business id to make a second ajax call
        getPOIdetails(yelpResultsValues[i].id);
      }
      $(".loading").addClass("hidden");
      $("#submit").removeClass("hidden");
    });

  }

  //when user is ready to search
  $("#submit").on("click", function (e) {
    e.preventDefault();

 
    console.log("click");
    //empty out previous results
    $("#results").empty();
    //if the category buttons are showing, then we switch to results state
    if ($("#category-buttons").hasClass("show")) {
      $(".loading").removeClass("hidden");//show loading dots
      $(this).text("Try something else?");//change text to indicate that user can click to re-open the category buttons and make a new search
      $(this).removeClass("btn-success").addClass("btn-primary");
      $(this).addClass("hidden");//hide until results come back
      yelpHandler();//call the yelpHandler to search for selected categories on yelp
    }
    else {

      //switch back to search state
      $(".loading").addClass("hidden");//hide loading dots
      $(this).text("Find something to do!");//change text to indicate user can click to make yelp call
      $(this).removeClass("btn-primary").addClass("btn-success");

    }

  });

  /*** END YELP***/


  //close document ready  
});