var searchButtonEl = document.querySelector(".search-button");
var checkURL = "";
var displayCityEl = document.querySelector("#display-cities");
var selectedCities = [];

function getCityName(event) {
  event.preventDefault();
  // console.log('hi')
  var userInputEl = document.querySelector('input[name="userCity"]');
  var selectedCity = userInputEl.value.trim();
  userInputEl.value = "";
  selectedCities.push(selectedCity);

  for (var i = 0; i < selectedCities.length; i++) {
    var cityButton = document.createElement("button");
    cityButton.textContent = selectedCities[i];
    displayCityEl.appendChild(cityButton);
  }
  if (selectedCity) {
    getTodaysWeather(selectedCity);
  } else {
    alert("Try again with valid city name");
  }
}

function getTodaysWeather(city) {
  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  var baseSearch = "https://api.openweathermap.org/data/2.5/weather";
  //?q=
  //user value
  //&appid=
  var apiKey = "b2a3b52aded2be8f63c9c9b521271bef";
  var requestUrl =
    baseSearch + "?q=" + city + "&appid=" + apiKey + "&units=imperial";
  fetch(requestUrl).then(function (response) {
    console.log("response", response); //response has response.ok feature as well
    if (response.ok) {
      response.json().then(function (weather) {
        console.log("DATA:", weather);
        displayCurrentWeather(weather);
      });
    }
  });
}

function displayCurrentWeather(weather) {
  var showCityEl = document.querySelector(".show-city");
  var showDate = document.querySelector('.show-date');
  showCityEl.textContent = "";
  // var showDate = document.querySelector('.show-date');
  var cityName = document.createElement("h3");
  var todayEl = document.createElement('h4');
  todayEl.textContent = dayjs().format('dddd, MMMM DD YYYY');
  // console.log(todayEl);
  cityName.textContent = weather.name;
  showCityEl.appendChild(cityName);
  showDate.appendChild(todayEl);
}

searchButtonEl.addEventListener("click", getCityName); //so far, this code displays the user's selection and appends to page.
