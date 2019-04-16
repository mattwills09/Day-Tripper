$(document).ready(function () {

    //SHARED GLOBAL VARIABLES
    var zipcode = "";
    var lat = "";
    var long = "";
  
  
  
    /****  YELP  FUNCTIONALITY ****/
  
    //array to hold POI (point of interest) objects
    var yelpResults = [];
  
    //array to hold categories that the user chooses
    //these are pulled from the id attribute of buttons the user clicks
    var chosenCategories = [];
  
    //predefined categories (Al)
  
  
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
      
        // console.log(poi.street);
        // console.log(poi.city);
        // console.log(poi.phone);
        // console.log(poi.link);
        // console.log(poi.hours);
        // console.log(poi);
        yelpResults.push(poi);
        publishResults(yelpResults);
      })
  
    }
  
    //dynamically makes buttons based on categories users are allowed to search for
    function makeButton(name){
      var name = name;
      var btn = $("<button>");
      btn.text(name);
      btn.attr({"id":name,"data-selected":"false"});//set default to data-selected = false
  
      //add click listeners to each button
      btn.on("click", function(){
  
        //if the button is unselected, select it and add to chosenCategories
        if($(this).attr("data-selected")==="false"){
  
          
          chosenCategories.push(name); //add to chosenCategories array
          
          $(this).attr({"data-selected":"true"}); //updated selected status
        
          $(this).addClass("selected");  //add the selected class
        }
  
        //if the button was already selected, unselect it and remove it from the chosenCategories
        else{
          
          var index = chosenCategories.indexOf(name) //get index of name in chosenCategories array
         
          chosenCategories.splice(index, 1); //remove that item from the array
        
          $(this).attr("data-selected","false");  //update selected status
          
          $(this).removeClass("selected"); //remove the selected class
        }
  
  
        });
  
      $("#results").append(btn); //add to results div 
    }
  
    var test = ["garden","zorbing","museum"];
    test.forEach(function(item){
      makeButton(item);
    });
  
  
  
    function publishResults(yelpResults){
      console.log("here");
      //for each of the yelp results
      yelpResults.forEach(function(result){
        var name = result.name;
        var street = result.street;
        var city = result.city;
        var phone = result.phone;
        var link = result.link;
  
        var div = $("<div>");
        div.attr({"id":result.name});
  
        div.append(addName(name)).append(addAddress(street,city)).append(addPhone(phone)).append(addLink(link));
        console.log(div);
        $("#results").append(div);
        function addName(name){
          var nameTag = $("<h3>");
          nameTag.text(name);
          console.log(nameTag);
          return nameTag;
     
        }
        function addAddress(street,city){
          var addressTag = $("<p>");
          addressTag.text(street + ", "+city);
          
          return addressTag;
        }
        function addPhone(phone){
          var phoneTag = $("<p>");
          phoneTag.text(phone);
  
          return phoneTag;
        }
        function addLink(link){
          var linkTag = $("<a>");
          linkTag.attr({"href":link}).text("Open in Yelp");
  
          return linkTag;
        }
      });
    }
  
    /*** END YELP***/
  
    //close document ready  
  });