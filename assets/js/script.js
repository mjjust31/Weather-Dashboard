var searchButtonEl = document.querySelector(".search-button");
var checkURL = "";
var displayCityEl = document.querySelector("#display-cities");

// var selectedCities = [];
var apiKey = "b2a3b52aded2be8f63c9c9b521271bef";
var parameters = "&units=imperial";
// var selectedCity = userInputEl.value.trim();

function init() {
  displayTodayFromLocal();
  createCityButton(); //needs text in button
}
function createCityButton(city) {
  var selectedCities = displayCityEl.children;
  var cityExists = false;

  for (var i = 0; i < selectedCities.length; i++) {
    if (selectedCities[i].textContent === city) {
      cityExists = true;
      break;
    }
  }

  if (!cityExists) {
    var cityButton = document.createElement("button");
    cityButton.setAttribute(
      "style",
      "background-image: linear-gradient(rgb(60, 57, 57), rgb(11, 11, 11))"
    );
    cityButton.textContent = city;
    displayCityEl.appendChild(cityButton);
  }
}

function getCityName(event) {
  event.preventDefault();
  // console.log('hi')
  var userInputEl = document.querySelector('input[name="userCity"]');
  var selectedCity = userInputEl.value.trim().toUpperCase();
  userInputEl.value = "";
  var selectedCities = [];

  if (!selectedCity) {
    alert("Try again with valid city name");
  } else {
    getTodaysWeather(selectedCity);
    getForecast(selectedCity);
  }
}
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
        createCityButton(city);
        CurrentDayToLocalStorage(city, weather);
      });
    } else if (response.status === 404) {
      alert("Please enter the name of a valid city");
    } else {
      alert("Error, please try again");
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
  // console.log(todayEl)

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
        // saveForecastToLocal(city, weather);
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
    //apend each item to the page.
    var date = weatherItem.dt_txt.split(" ")[0];
    var newDate = dayjs(date).format("dddd, MMMM DD YYYY");
    var icon = weatherItem.weather[0].icon;
    var temperature = weatherItem.main.temp;
    var wind = weatherItem.wind.speed;
    var humidity = weatherItem.main.humidity;
    // var items = [temperature, wind, humidity];

    var dateElement = document.createElement("h3");
    dateElement.textContent = newDate;
    card.appendChild(dateElement);

    var iconElement = document.createElement("img");
    iconElement.src = "http://openweathermap.org/img/w/" + icon + ".png";
    card.appendChild(iconElement);

    var temperatureElement = document.createElement("li");
    temperatureElement.textContent = "Temperature: " + temperature + "°F";
    card.appendChild(temperatureElement);

    var windElement = document.createElement("li");
    windElement.textContent = "Wind: " + wind + " MPH";
    card.appendChild(windElement);

    var humidityElement = document.createElement("li");
    humidityElement.textContent = "Humidity: " + humidity + "%";
    card.appendChild(humidityElement);

    weatherCards.appendChild(card);

    var weatherDay = {//only showing the date of the 5day right now.
      date: newDate,
      icon: icon,
      temperature: temperature,
      wind: wind,
      humidity: humidity,
    };
    localStorage.setItem("forecastData", JSON.stringify(weatherDay));
  }
}
// ForecastToLocalStorage(city, weather);

// Save weather data to local storage
// var weather = {
//   date: newDate,
//   icon: icon,
//   temperature: temperature,
//   wind: wind,
//   humidity: humidity,

searchButtonEl.addEventListener("click", getCityName);

displayCityEl.addEventListener("click", function (event) {
  console.log(event);
  if (event.target.tagName === "BUTTON") {
    // Get the weather data for the selected city
    var city = event.target.textContent;
    getTodaysWeather(city);
    getForecast(city);
  }
});

function CurrentDayToLocalStorage(city, weather) {
  // Save city and weather data to localStorage

  var todayWeather = {
    city: city,
    icon: weather.weather[0].icon,
    date: weather.today,
    temp: weather.main.temp,
    wind: weather.wind.speed,
    humidity: weather.main.humidity,
  };

  localStorage.setItem("weatherData", JSON.stringify(todayWeather));
}

function displayTodayFromLocal() {
  var showDate = document.querySelector(".show-date");

  var lastDayWeather = JSON.parse(localStorage.getItem("weatherData"));
  if (lastDayWeather !== null) {
    document.querySelector(".show-city").textContent = lastDayWeather.city;
    // Get temperature, humidity, and wind from local storage
    var storedTemp = "Temperature: " + " " + lastDayWeather.temp + " " + " °F";
    var storedHumidity = "Humidity: " + " " + lastDayWeather.humidity + " %";
    var storedWind = "Wind: " + " " + lastDayWeather.wind + " MPH";
    var storedIcon = lastDayWeather.icon;
    //Same code as displaying previously from original data, just using stored.

    var listItems = [];
    var weatherData = document.querySelector(".weather-data");
    // Push the stored data into the listItems array
    listItems.push(storedTemp, storedHumidity, storedWind);

    var iconEl = document.createElement("img");
    var iconTest = "http://openweathermap.org/img/wn/" + storedIcon + "@4x.png";
    iconEl.src = iconTest;
    iconEl.setAttribute("style", "margin:auto");
    showDate.appendChild(iconEl);

    // Iterate over the listItems array
    for (var i = 0; i < listItems.length; i++) {
      var listItem = document.createElement("li");
      listItem.textContent = listItems[i];
      weatherData.appendChild(listItem);
    }
  }
}

// function saveForecastToLocal(city, weather) {
//   var forecastWeather = {
//     city: city,
//     date: weather.dt_txt,
//     icon: weather.weather[0].icon,
//     temperature: weather.main.temp,
//     wind: weather.wind.speed,
//     humidity: weather.main.humidity,
//   };
//   localStorage.setItem("forecastData", JSON.stringify(forecastWeather));
// }

// function displayForecastFromLocal(){

// }_

// document.querySelector(".show-date").textContent = lastDayWeather.

init();

// function ForecastToLocalStorage(city, weather) {
//   // Retrieve existing forecast data from local storage
//   var forecastData = JSON.parse(localStorage.getItem("forecastData")) || {};

//   // Add or update the forecast data for the city
//   forecastData[city] = weather;

//   // Save the updated forecast data to local storage
//   localStorage.setItem("forecastData", JSON.stringify(forecastData));
// }
// console.log(selecftedCity);

//now I need a function for the the buttons.
//in the display-cities parent container,
//When an element that is a button element
//and when the button's text content matches a city name
//the fuctions of getToday Weather and get Forecast should be called

//The created buttons for the city, but be attached to the parent like in below's exercise.
//In our case the parent element for the buttons is the ID "display-cities"

//   // Dynamically create buttons
//   // Create a for-loop to iterate through the letters array.
//   for (var i = 0; i < letters.length; i++) {
//     // Create button
//     var letterBtn = $('<button>');
//     // Assign style to the button
//     letterBtn.addClass('letter-button btn btn-info');
//     // Assign the letter to the data-letter attribute
//     letterBtn.attr('data-letter', letters[i]);
//     // Display the letter
//     letterBtn.text(letters[i]);
//     // Attach the letter element
//     buttonListEl.append(letterBtn);
//   }
// }

// // Delegate event listener to the parent element, <div id="buttons">
// buttonListEl.on('click', '.letter-button', function (event) {

// Display the forecast for the current day

//so far, this code displays the user's selection and appends to page.

// var showDate = document.querySelector('.show-date');

//   console.log(forecastData);
//   }
