$(document).ready(function () {
  var input = document.getElementById('locationBox');
  var autocomplete = new google.maps.places.Autocomplete(input, {types: ["(cities)"]});
  $(function () {
    $(".date").datepicker();
  });


  var weatherQueryURL = "https://api.weatherbit.io/v2.0/forecast/daily?key=b32d4d9a4eab481c8ff762d60ea57308&units=I";

  $("#search").click(function (event) {
    event.preventDefault();
    var city = $("#locationBox").val().trim();
    $("#locationBox").val(city);
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
    var eventListContainerEL = $("#eventBox");
    var eventLoader = $("#eventLoader");

    // ========== Current Weather Retrieving ========== ========== //
    function currentWeather(response) {
      var weekDay = moment(response.data[0].valid_date, "YYYY-MM-DD");
      $(".weekDay").html(weekDay.format('dddd') + " <br> ");
      $(".city").html(response.city_name + ", " + response.country_code);
      $(".temp").html(response.data[0].temp + "&deg; F");
      $(".wind").html(response.data[0].weather.description + " " + " <br>Wind:" + response.data[0].wind_spd + "MPH");
      $(".icon").html("<img src = assets/images/" + response.data[0].weather.icon + ".png>")
    }

    // ========== Picked Dates Weather Retrieving ========== ========== //
    function givenDatesWeather(response) {
      $("#weatherBox").empty();

      var mainRow= $("<div class='row'>").appendTo($("#weatherBox"));

      var fromDate = moment($("#fromDate").val(), "MM/DD/YYYY");
      var toDate = moment($("#toDate").val(), "MM/DD/YYYY");
      for (i = 0; i < response.data.length; i++) {
        var iDate = moment(response.data[i].valid_date, "YYYY-MM-DD");
        if (fromDate.isSameOrBefore(iDate) && toDate.isSameOrAfter(iDate)) {
         var mainCol = $("<div class='col-lg-2 col-center'>").appendTo(mainRow);

         var row = $("<div class='row'>").appendTo(mainCol);
         var col2 = $("<div class='col-sm-6'>").appendTo(row);
          $("<img class = 'icon' src = assets/images/" + response.data[i].weather.icon + ".png>").appendTo(col2);
          
         var col = $("<div class='col-sm-6 dayData'>").appendTo(row);

          $("<div class='weekDay'>" + iDate.format('dddd') + "</div>").appendTo(col);
          $("<div class='city'>" + response.city_name + ", " + response.country_code + "</div>").appendTo(col);
          $("<div class='temp'>" + response.data[i].temp + "&deg; F" + "</div>").appendTo(col);
          $("<div class='wind'>" + response.data[i].weather.description + " " + " <br>Wind:" + response.data[i].wind_spd + " MPH" + "</div>").appendTo(col);
          
          //row.appendTo($("#weatherBox"));
        }
      }
      // Only display this message if weatherbox has no children and both dates are valid 
      if ($("#weatherBox").children().length == 0 && fromDate.isValid() && toDate.isValid()) {
        var row = $("<div class='row'>");
        var col = $("<div class='col-md-12'>").appendTo(row);
        $("<div id='noForecastMsg'>Sorry, no forecast is available for the selected dates</div>").appendTo(col);
        row.appendTo($("#weatherBox"));
      }
    }

    // ========== SEARCH RESULTS ========== ========== ========== ========== ========== //

    function searchResults() {
      weatherDisplayLockupEL.show();
      eventListContainerEL.show();
    }


  });


  // ========== LOADING SCREEN ========== ========== ========== ========== ========== //


  // Hide DOM Elements that we don't need yet:
  function loadingScreenDOM() {
    $("#weatherBox").hide();
    $("#eventBox").hide();
    $("#eventLoader").hide();

  }
  loadingScreenDOM();

});
