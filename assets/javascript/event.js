$(document).ready(function() {
  $("#search").on("click", function() {

    var eventLocation = $("#locationBox").val();
    console.log(eventLocation);
    var eventQueryURL = "https://api.eventful.com/json/events/search?...&location="+eventLocation+"&page_size=10&date=today&app_key=ZQ6TgSgf8HWBSqw3";


//$("#loading").show();      

$.ajax({
  url: eventQueryURL,
  method: "GET", 
  crossDomain: true,
 dataType: "jsonp"


}).then(function(response) {
 // $("#loading").hide();  
  //var parsed = JSON.parse(response);
  console.log(response.total_items);
  console.log(eventQueryURL);
 $("#eventBox").html("<h1>" + response.events.event[0].country_name + "</h1>");


 for (var i = 0; i < response.page_size; i++) {

  var event = $("<div>");
  event.addClass("eventCard card cardT");

  var card = $("<div>");
  card.addClass("card-header");
  var n =i+1;
  card.text("EVENT # " + n );

  event.append(card);
  var eventNames = $("<h5>");
  eventNames.addClass("eventName");
  eventNames.append("TITLE: " + response.events.event[i].title);

  var eventAddr = $("<h5>");
  eventAddr.addClass("eventAddress");
  eventAddr.append("Address: " + response.events.event[i].venue_address);
  eventAddr.append(", " +response.events.event[i].city_name);
  eventAddr.append(", " +response.events.event[i].region_abbr);


  var dateTime = $("<h5>");
   dateTime.addClass("eventDate");
   dateTime.append("Start Time: " +response.events.event[i].start_time); 
   dateTime.append(", Finish Time: " +response.events.event[i].stop_time); 

   var nameVenue = $("<h5>");
   nameVenue.addClass("eventVenue");
   nameVenue.append("Name of the Venue: " +response.events.event[i].venue_name); 

   var urlEvent = $("<a>");
   urlEvent.attr("href",response.events.event[i].url);
   urlEvent.addClass("eventURL");
   urlEvent.append("URL: " +response.events.event[i].url); 

  event.append(eventNames, eventAddr, dateTime, nameVenue, urlEvent);

  $("#eventBox").append(event);

  }
});

  });

}) 