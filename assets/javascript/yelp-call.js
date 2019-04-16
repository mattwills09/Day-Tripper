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
    console.log("POI");
    this.name = response.name, //business name
      this.street = response.location.display_address[0], //building number, street name
      this.city = response.location.display_address[1], //city, zip code
      this.link = response.url, //link to business page on yelp
      this.hours = response.hours,//an array of hours objects from yelp; needs to be processed
      this.phone = response.display_phone //phone number
  }

  //getPOIsCOORDS("Martial", "39.9553076", "-75.1720374")


  //Function to make a yelp API. Takes category(string) and location (zip code number)
  function getPOIsZIP(category, location) {
    console.log("getPOIZIP");
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
      //loop through the list of JSON responses
      var locations = response.businesses;
      console.log("response.businesses length: " + JSON.stringify(response.businesses).length);
      console.log("locations.length: " + JSON.stringify(locations.length));
      if (JSON.stringify(response.businesses).length > 2) {
        for (var i = 0; i < JSON.stringify(locations.length); i++){
          console.log(JSON.stringify(locations[i].id));
          getPOIdetails(locations[i].id)
        }
      }
      else {
        alert("No results in you your area for " + selectedButton);
      } 
      
      
    })
      
  }

  //function to make a yelp API call, takes 3 parameters: category (string), latitude (int), and longitude (int)
  function getPOIsCOORDS(category, lat, long) {
    console.log("getPOICOORDS - category: " + category);
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
        for (var i = 0; i < JSON.stringify(locations.length); i++){
          console.log(JSON.stringify(locations[i].id));
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
    console.log("getPOIdetails");
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

    /*
     $.ajax({
  url: queryURL,
  method: "GET"
}).then(updatePage);
});

    */

    $.ajax(settings).then(function (response) {
      var poi = new POI(response);
       
      console.log("before push of poi to results");
      console.log("new POI response - yelpResults" + JSON.stringify(yelpResults));
      //C L E A R   P R E V I O U S   R E S U L T S 
      yelpResults = [];
      yelpResults.push(poi);
      console.log("after push of poi to results");
      console.log("new POI response - yelpResults" + JSON.stringify(yelpResults));
      console.log("length: " + JSON.stringify(yelpResults).length);
      publishResults(yelpResults);




    });

  }

  //dynamically makes buttons based on categories users are allowed to search for
  function makeButton(name) {
    console.log("makeButton");
    var btn = $("<button>");
    btn.text(name);
    btn.attr({ "id": name, "data-selected": "false" });//set default to data-selected = false

    //add click listeners to each button
    btn.on("click", function () {

      //if the button is unselected, select it and add to chosenCategories
      if ($(this).attr("data-selected") === "false") {


        chosenCategories.push(name); //add to chosenCategories array

        $(this).attr({ "data-selected": "true" }); //updated selected status

        $(this).addClass("selected");  //add the selected class
      }

      //if the button was already selected, unselect it and remove it from the chosenCategories
      else {

        var index = chosenCategories.indexOf(name) //get index of name in chosenCategories array

        chosenCategories.splice(index, 1); //remove that item from the array

        $(this).attr("data-selected", "false");  //update selected status

        $(this).removeClass("selected"); //remove the selected class
      }


    });

    $("#results").append(btn); //add to results div 
  }

  /* var test = ["garden","zorbing","museum"];
  test.forEach(function(item){
    makeButton(item);
  });
*/


  function publishResults(yelpResults) {
    //console.log("publishResults");
    //console.log("here");
    //for each of the yelp results
    yelpResults.forEach(function (result) {

      var name = result.name;
      var street = result.street;
      var city = result.city;
      var phone = result.phone;
      var link = result.link;

      console.log(name);

      var div = $("<div>");
      div.attr({ "id": result.name });

      div.append(addName(name)).append(addAddress(street, city)).append(addPhone(phone)).append(addLink(link));
      //console.log("publishResults div: " + JSON.stringify(div));
      $("#results").append(div);

      function addName(name) {
        //console.log("addName");
        var nameTag = $("<h3>");
        nameTag.text(name);
        //console.log(nameTag);
        return nameTag;

      }
      function addAddress(street, city) {
        //console.log("addAddress");
        var addressTag = $("<p>");
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
    });
  }

  //==================================================================================================================================================    

  //  B U T T O N   O B J E C T 
  //  <button class="activitySettingButton btn btn-outline-primary" data-activitySetting="InOrOut">InOrOut</button>... 
  var btnObj = {
    clkCls: "activitySettingsButton",
    stylCl: "btn btn-outline-primary",
    dataLbl: "data-activitySetting",
    arr: ["Outdoors", "Indoors", "InOrOut"],
    anchor: "#main-buttons-anchor",
    //  r e n d o r B u t t o n   F U N C T I O N 
    renderButtons: function () {
      //console.log("render buttons: " + this.arr);
      for (i = 0; i < this.arr.length; i++) {
        var newBtn = $("<button>");

        //console.log("clkCls: " + this.clkCls);
        newBtn.addClass(this.clkCls);

        //console.log("stylCls: " + this.stylCls);
        newBtn.addClass(this.stylCls);

        //console.log("dataLbl: " + this.dataLbl);
        newBtn.attr(this.dataLbl, this.arr[i]);


        newBtn.text(this.arr[i]);

        //console.log("anchor: " + this.anchor);
        $(this.anchor).append(newBtn);
      }
    },
  };


  // " a c t i v i t y S e a r c h ( )"   F U N C T I O N -  S E A R C H   B R O A D   A N D   A C T I V I T Y   C A T E G O R Y   O B J E C T   A R R A Y S      
  // var broadCategory = [{activity: "Wild Life Gaming", setting: "Outdoors" },...
  // var activityCategory = [{activity:"bungeejumping", category:"Adventure sports"},...
  function activitySearch(myArray, prop, nameKey) {
    //  console.log("myArray: " + myArray);
    var newArr = [];
    for (var i = 0; i < myArray.length; i++) {
      //      console.log(myArray[i][prop]);
      if (myArray[i][prop] === nameKey) {
        newArr.push(myArray[i].activity);
      }
    }
    return newArr;
  }

  //  R E N D E R   B U T T O N S   F O R   A C T I V I T Y   S E T T I N G S - i.e indoors, outdoors, in-or-out  
  //  Pass arguments to button object  
  //  var activitySettingArr = ["InOrOut", "Outdoors", "Indoors"];... 
  btnObj.arr = activitySettingArr;
  //  console.log("arr: " + btnObj.arr);
  btnObj.anchor = ("#main-buttons-anchor");
  //  console.log("anchor: " + btnObj.anchor);


  //  C A L L   r e n d e r B u t t o n s ( )   -  B U I L D   S E T T I N G   B U T T O N S
  //  <button class="activitySettingsButton btn btn-outline-primary" data-activitySetting="InOrOut">InOrOut</button>... 
  btnObj.renderButtons();


  //  S E T T I N G   B U T T O N   C L I C K   E V E N T  - find broad categories for that setting
  $(".activitySettingsButton").on("click", function (event) {
    //      Prevent form submission
    event.preventDefault();

    //      Store button selection for activity setting - indoors, outdoors, both
    //      <button class="activitySettingsButton btn btn-outline-primary" data-activitySetting="InOrOut">InOrOut</button> 
    var selectedButton = $(this).attr("data-activitySetting");
    //      console.log("selectedButton: " + selectedButton);


    //      C A L L   a c t i v i t y S e a r c h ( ) F U N C T I O N   
    //      T O   F I N D   B R O A D   C A T E G O R I E S   O F   A C T I V I T I E S   A P P R O P R I A T E   T O   S E L E C T E D   A C T I V I T Y   S E T T I N G      
    //      A N D   C R E A T E   A R R A Y   O F   R E S U L T S   F O R   B U T T O N S  
    //      var broadCategory = [{ activity: "Wild Life Gaming", setting: "Outdoors" },
    var broadArr = activitySearch(broadCategory, "setting", selectedButton);
    //      console.log("broadArr" + broadArr);

    //====================================================================================================================================================
    //      R E N D E R   B U T T O N S   F O R   B R O A D   C A T E G O R I E S   S U I T E D   T O   S E L E C T E D   A C T I V I T Y   S E T T I N G   
    //      <button class="categoryButton" data-broad="Adventure sports">Adventure sports</button>...
    //      Pass arguments to button object 
    btnObj.clkCls = "categoryButton",
      btnObj.arr = broadArr;
    //      console.log("arr: " + btnObj.arr);
    btnObj.anchor = ("#broad-buttons-anchor");
    $(btnObj.anchor).empty();
    //      console.log("anchor: " + btnObj.anchor);
    btnObj.dataLbl = "data-broad",


      //      C A L L   r e n d e r B u t t o n s ( ) F U N C T I O N 
      btnObj.renderButtons();


    //      E N D   S E T T I N G   B U T T O N   C L I C K   E V E N T   H A N D L I N G   
  });


  // B R O A D   C A T E G O R Y   B U T T O N   C L I C K   E V E N T - find yelp categories for broad category          
  // Using event delegation on parent object to ensure event listener operates on secondary button event
  $(document).on('click', '.categoryButton', function () {
    let button = $(this).parent('#broad-buttons-anchor');


    //  Prevent form submission
    event.preventDefault();


    //  Store broad activity category selection   
    //  <button class="categoryButton" data-broad="Adventure sports">Adventure sports</button>
    var selectedButton = $(this).attr("data-broad");
    //  console.log("selectedButton: " + selectedButton);


    //  C A L L   a c t i v i t y S e a r c h ( ) F U N C T I O N   
    //  T O   F I N D   Y E L P   S E A R C H    C A T E G O R I E S   F O R   A C T I V I T I E S   I N   S E L E C T E D   B R O A D   C A T E G O R Y      
    //  A N D   C R E A T E   A R R A Y   O F   R E S U L T S   F O R   B U T T O N S 
    //  {activity:"bungeejumping", category:"Adventure sports"},
    //  console.log("selectect Button: " + selectedButton);
    var searchArr = activitySearch(activityCategory, "category", selectedButton);

    //====================================================================================================================================================
    //      R E N D E R   B U T T O N S   F O R   Y E L P  C A T E G O R I E S   S U I T E D   T O   S E L E C T E D   B R O A D   C A T E G O R Y   
    //      <button class="searchButton" data-search="Bungie Jumping">Bungie Jumping</button>...
    //      Pass arguments to button object 
    btnObj.clkCls = "searchButton",
      btnObj.arr = searchArr;
    //console.log("arr: " + btnObj.arr);
    btnObj.anchor = ("#search-buttons-anchor");
    $(btnObj.anchor).empty();
    //console.log("anchor: " + btnObj.anchor);
    btnObj.dataLbl = "data-search",
      //console.log("btnObj:  " + btnObj);

      //      C A L L   r e n d e r B u t t o n s ( ) F U N C T I O N 
      btnObj.renderButtons();
  });

  // S E A R C H  C A T E G O R Y   B U T T O N   C L I C K   E V E N T - find yelp categories for broad category          
  // Using event delegation on parent object to ensure event listener operates on secondary button event
  $(document).on('click', '.searchButton', function () {
    let button = $(this).parent('#search-buttons-anchor');


    //  Prevent form submission
    event.preventDefault();


    //  Store broad activity category selection   
    //  <button class="categoryButton" data-broad="Adventure sports">Adventure sports</button>
    var selectedButton = $(this).attr("data-search");
    window.selectedButton = selectedButton;
    
    console.log("selectedButton: " + selectedButton);

    //getPOIsCOORDS(selectedButton, "39.9553076", "-75.1720374")
    getPOIsZIP(selectedButton, "19103")

     
  });
  /*** END YELP***/

  //close document ready  
});