# Weather-Dashboard


#User Sotry

AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

Acceptance Criteria
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

Pseudo Code: 

Part I: Framework (Mobile First Design)
1. A header should be created with a title of the application. 
2. A search bar will need to created with a "search" button.
      a. After the name of the city is and the search button is 'clicked', the name of the city should appear below the search bar.
3. There should be an area to display current city, date, and weather conditions
4. There also needs to be an area to display the five day forecast of five items.

Part II: CSS

1. I will use Tailwinds CSS to practice something other than Boostrap for the project coming up.


Part III Javascript: 

1. When the page first loads, a search bar, search button appear with areas to display data. 
2. After inputing a city name and clicking the button, the data is "fetced" from open weather
3. Will need to do current weather and five-day forecast
      a. The name of the city is appending to the page as a button
      b. The current date and weather information is displayed first. 
            a. City
            b. Date
            c. weather icon
            d. temp
            e. wind.
            f. humidity
      c. after the current day's weather is displayed, the city shows a five day forecast
4. After readping the API documentation, OpenWeather has a current weather anda  five day forecast. Both will need to be used. 

Content Fixes: 

1. Need to review code for creating a button. Not just adding the new city, but the previous city too unless it's refreshed.


2. For forecast data is reading every three hours, so looping through provides the same date.
            1.https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
            2. https://www.w3schools.com/jsref/jsref_filter.asp
            3. https://www.degreesymbol.net/

3. I attempted to use the fetched data at first using map to filter out for unique dates to push it into a new array. While this helped me learn the map function and how useful it may be in the future, I realized I just could move the 'i' and multiply by 8 to get a new day. (8*3=24; 24 hours in a day, etc.). I realized I was trying to make this more complicated than necessary for the fetched data. 

4. Break statement - https://www.w3schools.com/jsref/jsref_break.asp#:~:text=The%20break%20statement%20breaks%20out,the%20loop%20(if%20any). I reviewing ways to say "if this button already exists on the page, stop the function from executing. If the button does NOT exist, create the button. Essentially after reading this, the break statement will stop anything else that is listed in the function. Therefore, by adding break, it will not execute any further code in the script.


5.Forecast Data to local storage. With the current set up for forecast data, it is showing the 5th day only and not all of dive days. Need to push into an array of data to capture each loop before saving to local storage.