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

Part I: Framework (Moble First Design)
1. A header should be created with a title of the application. 
2. A search bar will need to created with a "search" button.
      a. After the name of the city is and the search button is 'clicked', the name of the city should appear below the search bar.
3. There should be an area to display current city, date, and weather conditions
4. There also needs to be an area to display the five day forecast of five items.

Part II: CSS

1. I will use Tailwinds CSS to practice something other than Boostrap for the project coming up


Part III Javascript: 

1. When the page first loads, a search bar, search button appear with areas to display data. 
2. After inputing a city name and clicking the button, 
      a. The name of the city is appending to the page as a button
      b. The current date and weather information is displayed first. 
            a. City
            b. Date
            c. weather icon
            d. temp
            e. wind.
            f. humidity
      c. after the current day's weather is displayed, the city shows a five day forecast