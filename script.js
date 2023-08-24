var userInput = document.querySelector("#default-search");
var checkURL = "";

// fetch(apiUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (apiUrl) {
//     console.log("DATA:", apiUrl);
//     for (var i = 0; i < giphydata.data.length; i++) {
//       console.log("hi");
//     }
//   });

function getWeather() {
  var apiKey = "b0d17c9d611bc6e0a64a9d6e214da1fb";
  // var rawAPI =
  //   "api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}";
  var searchValue = userInput.value;
  var baseSearchUrl = "https://api.openweathermap.org/data/2.5/forecast";
  var requestUrl = baseSearchUrl + "?q=" + searchValue + "&=appid" + apiKey;

  fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function(weather){
    console.log(weather.data);
    userInput.value = ''
  })
}
getWeather(); //review function later

function appendCitySearch(){
  var searchValue = userInput.value;

  for 


} 


// $( function() {
//   var citySearch = [
//     "Chicago",
//     "New York City",
//     "London",
//     "Scheme"
//   ];
//   $( "#default-search" ).autocomplete({
//     source: citySearch
//   });
// } );
