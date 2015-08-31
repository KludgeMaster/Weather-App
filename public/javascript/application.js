var handlers = {
  genQuery: function(e) {
    e.preventDefault();
    var city_name = $("#search").val()  
    var KEY = "74fd55ce356281ab";
    $.ajax({
      url: "http://autocomplete.wunderground.com/aq?query=" + city_name + '&callback=cb',
      dataType: "jsonp",
      jsonp: 'cb',
      success: function(data){
        var cities = data.RESULTS;
        for( var i=0; i < data.RESULTS.length; i++){
          $.ajax({
            url: "http://api.wunderground.com/api/" + KEY + '/conditions/q/zmw:' + cities[i].zmw + '.json',
            // dataType: "jsonp",
            // jsonp: 'cb',
            success: function(data){
              
              displayWeather(data);
            }
          });
        }
      }
    });

    // $.ajax({
    //   url: "http://api.wunderground.com/api/" + KEY + '/conditions/q/' + city_name + '.json',
    //   // dataType: "jsonp",
    //   // jsonp: 'cb',
    //   success: function(data){
        
    //     displayWeather(data);
    //   }
    // });
  }
};

// 


///////////////////////////////////////////////
// wunderground API key: 74fd55ce356281ab
///////////////////////////////////////////////
function displayWeather(data){
  var weather = data.current_observation;
  // $('#result').append("<div class='name'>"+response[i].name+"</div>");
    $('#result').append("<div class='city'>"+weather.display_location.full+"</div>");
    $('#result').append("<div class='temp'>"+weather.temp_c+"</div>");
    $('#result').append("<div class='weather'>"+weather.weather+"</div>");
    $('#result').append("<br>");
  // console.log(response[i]);
 // console.log(data)
}


// function displayCities(data){
//   var data = data.RESULTS;
//  // $('#result').append(JSON.stringify(data));  
//  for (var i=0; i< data.length; i++){
//   $('#result').append("<div class='name'>"+data[i].name+"</div>");
//   // if (data.)
//  }

 // console.log(data)
// }



$(function () {
  $('#searchBtn').on('click', handlers.genQuery);
  
  // $.getJSON(' http://autocomplete.wunderground.com/aq?query=', function (data) {
  //   $('body').append(JSON.stringify(data));
  // });

  // $.ajax({
  //   url: 'http://autocomplete.wunderground.com/',
  //   // dataType: 'jsonp',
  //   success: function (data) {
  //     $('body').append(JSON.stringify(data));
  //   }
  // });

});

