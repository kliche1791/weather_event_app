$(document).ready(function () {

  $(function () {
    $(".date").datepicker();
  });


var weatherQueryURL = "https://api.weatherbit.io/v2.0/forecast/daily?key=b32d4d9a4eab481c8ff762d60ea57308&units=I";

$("#search").click(function (event) {
event.preventDefault();
var city = $("#locationBox").val().trim();
    $.ajax({
        url: weatherQueryURL + "&city=" + city,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        searchResults();
      currentWeather(response);
      givenDatesWeather(response);
        
    });

// DOM VARS
/* These are variables set to the different elements in the DOM (the HTML). We can change elements by calling these variables.  */
var searchFormContainerEl = document.getElementById("searchFormContainer");
var weatherDisplayLockupEL = $("#weatherBox");
var eventListContainerEL =  $("#eventBox");

// ========== Current Weather Retrieving ========== ========== //
function currentWeather(response) {
var weekDay = moment(response.data[0].valid_date, "YYYY-MM-DD");
$(".weekDay").html(weekDay.format('dddd') + " <br> " + response.data[0].weather.icon);
$(".city").html(response.city_name + ", " + response.country_code);
$(".temp").html(response.data[0].temp + "&deg; F");
$(".wind").html(response.data[0].weather.description + " " + " <br>Wind:" + response.data[0].wind_spd + " MPH");
}

// ========== Picked Dates Weather Retrieving ========== ========== //
function givenDatesWeather(response) {

  var fromDate = moment($("#fromDate").val(), "MM/DD/YYYY");
  var toDate = moment($("#toDate").val(), "MM/DD/YYYY");
  for (i=0; i<response.data.length; i++) {
    var iDate = moment(response.data[i].valid_date, "YYYY-MM-DD");
      if (fromDate.isSameOrBefore(iDate) && toDate.isSameOrAfter(iDate)) {
        var row = $("<div class='row'>");
        var col = $("<div class='col-md-2'>").appendTo(row);
        
        $("<div class='weekDay'>" + iDate.format('dddd') + "</div>").appendTo(col);
        $("<div class='city'>" + response.city_name + ", " + response.country_code + "</div>").appendTo(col);
        $("<div class='temp'>" + response.data[i].temp + "&deg; F" + "</div>").appendTo(col);
        $("<div class='wind'>" + response.data[i].weather.description + " " + " <br>Wind:" + response.data[i].wind_spd + " MPH" + "</div>").appendTo(col);
        
        col.appendTo($("#weatherBox"));
      
      }
    
  }
 

}



// ========== SEARCH RESULTS ========== ========== ========== ========== ========== //

 function searchResults(){
      weatherDisplayLockupEL.show();
      eventListContainerEL.show();
  }


});


// ========== LOADING SCREEN ========== ========== ========== ========== ========== //


// Hide DOM Elements that we don't need yet:
function loadingScreenDOM(){
 $("#weatherBox").hide();
  $("#eventBox").hide();
}
loadingScreenDOM();

});
