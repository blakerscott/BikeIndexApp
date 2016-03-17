$(document).ready(function() {
  initMap();
  $('#bikeLocation').click(function() {
    var zipCode = $('#location').val();
    $('#location').val("");

    $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&proximity=' + zipCode + '&proximity_square=2', function(response) {
      console.log(response);
      for(var i = 0; i < response.bikes.length; i++) {
        $('.showBikes').append("The bikes in " + zipCode + " in " + response.bikes[i].title);
        $('.showBikes').append('<ul><li>'+ response.bikes[i].stolen_location + '</li></ul>');
        $('#address').val("'" + response.bikes[i].stolen_location + "'");
        Address();
      }
    });
  });
});

var map;
var geocoder;
function initMap() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 45.5200, lng: -122.6819}
  });
}

//this function makes the marker
function Address() {
//because of the getElementId below, which is part of google's conventional code for placing a pin on a map, I have added an input tag to the index with the id of address an empty value.  That value is filled on line 12.
    var address = document.getElementById("address").value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
