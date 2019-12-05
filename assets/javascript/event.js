$(document).ready(function() {


  $("#search").on("click", function() {

    event.preventDefault();

    var eventLocation = $("#locationBox").val();

    console.log(eventLocation);

    // Get the dates value of the dates 
    var fromDateR = $("#fromDate").val();
    var toDateM = $("#toDate").val();

  
    
    console.log(fromDateR); 
    console.log(toDateM);

    //if the the date input is empty get only the API url without dates
    if(fromDateR === "" && toDateM === ""){

    var eventQueryURL = "https://api.eventful.com/json/events/search?...&location="+eventLocation+"&page_size=30&date=today&app_key=ZQ6TgSgf8HWBSqw3";
   
    // Take the value of the dates and show the API between the specific dates
    } else {
    
    //Convert the date values in an array with the split function
    fromDateB = fromDateR.split("/");
    yrB = fromDateB[2];
    mnB = fromDateB[0];
    dayB = fromDateB[1];

    //changin the format date on yyyy/mm/dd
    beginDate = yrB+mnB+dayB+"00";
    console.log(beginDate);

    toDateF = toDateM.split("/");
    yrF = toDateF[2];
    mnF = toDateF[0];
    dayF = toDateF[1];

    finishDate = yrF+mnF+dayF+"00";
    console.log(finishDate);

    //API URL with especific dates 
    var eventQueryURL = "https://api.eventful.com/json/events/search?...&location="+eventLocation+"&page_size=30&date=" + beginDate+"-"+finishDate + "&app_key=ZQ6TgSgf8HWBSqw3";
    }


    $("#eventBox").empty();

    $("#listPageTitle").html(`Finding events in ${eventLocation}`);

    $("#eventLoader").show();

    $("#eventList").empty();

    


    console.log(eventQueryURL);
    //getting the ajax call depends on the conditional url before 
    $.ajax({
      
      url: eventQueryURL,
      method: "GET",
      crossDomain: true,
      dataType: "jsonp"

    }).then(function (response) {

      console.log(response);

     

      theEvents(response);

      $("#eventLoader").hide();
     
      function theEvents(response) {
        for (var i = 0; i < response.events.event.length; i++) {

          var event = $("<div>");
          event.addClass("eventCard card cardT");

          var eventNames = $("<h5>");
          eventNames.addClass("eventName");
          eventNames.append(response.events.event[i].title);

          var eventAddr = $("<h5>");
          eventAddr.addClass("eventAddress");
          eventAddr.append(response.events.event[i].venue_address);
          eventAddr.append(", " + response.events.event[i].city_name);
          eventAddr.append(", " + response.events.event[i].region_abbr);


          var dateTime = $("<h5>");
          dateTime.addClass("eventDate");
          dateTime.append(response.events.event[i].start_time);
          dateTime.append(" - "+ response.events.event[i].stop_time);

          var nameVenue = $("<h5>");
          nameVenue.addClass("eventVenue");
          nameVenue.append(response.events.event[i].venue_name);

          var urlEvent = $("<a>");
          urlEvent.attr("href", response.events.event[i].url);
          urlEvent.attr( `target`, `_blank`);
          urlEvent.addClass("eventURL");
          urlEvent.append("See event website");

          event.append(eventNames, eventAddr, dateTime, nameVenue, urlEvent);

          $("#eventList").append(event);
          $("#listPageTitle").html(`Checkout events in ${eventLocation}`);
        };
      }
    });

    


  });

}) 