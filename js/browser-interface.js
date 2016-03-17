$(document).ready(function() {
  $('#bikeLocation').click(function() {
    var zipCode = $('#location').val();
    $('#location').val("");

    $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&proximity=' + zipCode + '&proximity_square=10', function(response) {
      for(var i = 0; i < response.bikes.length; i++) {
        $('.showBikes').append("The bikes in " + zipCode + " in " + response.bikes[i].title);
        $('.showBikes').append('<ul><li>'+ response.bikes[i].stolen_location + '</li></ul>');
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
    center: {lat: 45.5207260, lng: -122.6796520}
  });
}
