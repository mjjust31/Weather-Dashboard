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

  var cityButton = document.createElement("button");
  cityButton.setAttribute(
    "style",
    " background-image: linear-gradient(rgb(60, 57, 57), rgb(11, 11, 11))"
  );
  cityButton.textContent = selectedCity;
  displayCityEl.appendChild(cityButton);

  if (selectedCity) {
    getTodaysWeather(selectedCity);
    getForecast(selectedCity);
  } else {
    alert("Try again with valid city name");
  }
}

var apiKey = "b2a3b52aded2be8f63c9c9b521271bef";
var parameters = "&units=imperial";

function getTodaysWeather(city) {
  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  var baseSearch = "https://api.openweathermap.org/data/2.5/weather";
  //?q=
  //user value
  //&appid=

  var requestUrl = baseSearch + "?q=" + city + "&appid=" + apiKey + parameters;
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
  var showDate = document.querySelector(".show-date");

  var tempature = "Temperature: " + " " + weather.main.temp + " " + "°F";
  var wind = "Wind: " + " " + weather.wind.speed + "MPH";
  var humidity = "Humidity: " + " " + weather.main.humidity + "%";
  var listItems = [tempature, wind, humidity];
  var weatherData = document.querySelector(".weather-data");

  weatherData.textContent = "";
  showCityEl.textContent = "";
  showDate.textContent = "";

  var cityName = document.createElement("h3");
  var todayEl = document.createElement("h4");

  todayEl.textContent = dayjs().format("dddd, MMMM DD YYYY");
  cityName.textContent = weather.name;

  var iconEl = document.createElement("img");
  var iconWeather = weather.weather[0].icon;
  var iconTest = "http://openweathermap.org/img/wn/" + iconWeather + "@4x.png";
  iconEl.src = iconTest;
  iconEl.setAttribute("style", "margin:auto");

  showCityEl.append(cityName);
  showDate.appendChild(iconEl);
  showDate.appendChild(todayEl);

  for (var i = 0; i < listItems.length; i++) {
    var listEl = document.createElement("li");
    listEl.textContent = "";
    listEl.textContent = listItems[i];
    weatherData.appendChild(listEl);
  }
}

function getForecast(city) {
  // https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
  var baseSearch = "https://api.openweathermap.org/data/2.5/forecast";
  var requestUrl =
    baseSearch + "?q=" + city + "&cnt=35" + "&appid=" + apiKey + parameters;

  fetch(requestUrl).then(function (response) {
    console.log("response", response);
    if (response.ok) {
      response.json().then(function (weather) {
        console.log("Data:", weather);
        displayForecast(weather);
      });
    }
  });
}
function displayForecast(weatherData) {
  // Clear previous forecast
  var weatherCards = document.querySelector(".weather-card-wrapper");
  weatherCards.innerHTML = "";

  // Loop through the weather data
  for (var i = 0; i < 5; i++) {
    // Display the next five days
    var weatherItem = weatherData.list[i * 8]; // Get data for each day. Since it shows every 3 hours.
    console.log(weatherItem);
    // Create a weather card
    var card = document.createElement("div");
    card.classList.add("weather-card");

    // Get the icon, temperature, wind, and humidity for the weather item

    var date = weatherItem.dt_txt.split(" ")[0];
    var newDate = dayjs(date).format("dddd, MMMM DD YYYY");
    var icon = weatherItem.weather[0].icon;
    var temperature = weatherItem.main.temp;
    var wind = weatherItem.wind.speed;
    var humidity = weatherItem.main.humidity;

    var dateElement = document.createElement("h3");
    dateElement.textContent = newDate;
    card.appendChild(dateElement);

    var iconElement = document.createElement("img");
    iconElement.src = "http://openweathermap.org/img/w/" + icon + ".png";
    card.appendChild(iconElement);

    var temperatureElement = document.createElement("p");
    temperatureElement.textContent = "Temperature: " + temperature + "°F";
    card.appendChild(temperatureElement);

    var windElement = document.createElement("p");
    windElement.textContent = "Wind: " + wind + " MPH";
    card.appendChild(windElement);

    var humidityElement = document.createElement("p");
    humidityElement.textContent = "Humidity: " + humidity + "%";
    card.appendChild(humidityElement);

    weatherCards.appendChild(card);
  }
}

// Display the forecast for the current day

searchButtonEl.addEventListener("click", getCityName); //so far, this code displays the user's selection and appends to page.

// var showDate = document.querySelector('.show-date');

// var forecastData = weather.list.filter(function(item) {
//   return item.name === cityName;//already passing the city through the get function
//   }).map(function(item) {
//   return {
//   city: item.name,
//   temperature: item.main.temp,
//   };
//   });

//   console.log(forecastData);
//   }

// var forecastData = weather.list.map(function (item) {//testing map function
//   return {
//     date: item.dt_txt,
//     icon: item.weather[0].icon,
//     temperature: item.main.temp,
//     wind: item.wind.speed,
//     humidity: item.main.humidity,
//   };
// });
