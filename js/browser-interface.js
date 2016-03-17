$(document).ready(function() {
  $('#bikeLocation').click(function() {
    var zipCode = $('#location').val();
    $('#location').val("");

    $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&proximity=' + zipCode + '&proximity_square=10', function(response) {
      for(var i = 0; i < response.bikes.length; i++) {
        $('.showBikes').append("The bikes in " + zipCode + " in " + response.bikes[i].title);

      }
    });
  });
});
