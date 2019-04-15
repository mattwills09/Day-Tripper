

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
        for (i = 0; i < this.arr.length; i++) {
            var newBtn = $("<button>");
            // console.log("clkCls: " + this.clkCls);
            newBtn.addClass(this.clkCls);
            newBtn.addClass(this.stylCls);
            newBtn.attr(this.dataLbl, this.arr[i]);
            newBtn.text(this.arr[i]);
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

//  R E N D E R   B U T T O N S   F O R   B R O A D   C A T E G O R I E S   S U I T E D   T O   S E L E C T E D   A C T I V I T Y   S E T T I N G   
//  Pass arguments to button object  
//  var activitySettingArr = ["InOrOut", "Outdoors", "Indoors"];... 
    btnObj.arr = activitySettingArr;
//  console.log("arr: " + btnObj.arr);
    btnObj.anchor = ("#main-buttons-anchor");
//  console.log("anchor: " + btnObj.anchor);


//  C A L L   r e n d e r B u t t o n s ( )   -  B U I L D   S E T T I N G   B U T T O N S
//  <button class="activitySettingsButton btn btn-outline-primary" data-activitySetting="InOrOut">InOrOut</button>... 
    btnObj.renderButtons();


//  S E T T I N G   B U T T O N   C L I C K   E V E N T  
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


// B R O A D   C A T E G O R Y   B U T T O N   C L I C K   E V E N T          
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

//  Render search results on page    
    $("#categories-anchor").html("<p></p>");
    $("p").text(searchArr);
});



