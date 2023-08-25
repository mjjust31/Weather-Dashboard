var searchButtonEl = document.querySelector(".search-button");
var checkURL = "";
var displayCityEl = document.querySelector("#display-cities");

function getCityName(event){
  event.preventDefault();
  // console.log('hi')
  var userInputEl = document.querySelector('input[name="userCity"]');
  var selectedCity = userInputEl.value.trim();
  userInputEl.value = "";
  var selectedCities = [];
  selectedCities.push(selectedCity);

  for (var i = 0; i < selectedCities.length; i++) {
    var cityButton = document.createElement("button");
    cityButton.textContent = selectedCities[i];
    displayCityEl.appendChild(cityButton);
  }
};




searchButtonEl.addEventListener("click", getCityName) //so far, this code displays the user's selection and appends to page.

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// var baseSearch = 'https://api.openweathermap.org/data/2.5/weather';
//?q=
//user value
//&appid=
// var apiKey = 'b2a3b52aded2be8f63c9c9b521271bef';
// var requestUrl = 
