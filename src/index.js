
function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let timeElement = document.querySelector("#current-time");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(new Date());
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  speedElement.innerHTML = `${response.data.wind.speed} km/h`;
  temperatureElement.innerHTML = `${Math.round(temperature)}°C`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" alt="Weather icon" />`;


   getForecast(response.data.city);

}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}



function searchCity(city) {
  let apiKey = "c3f61ob3a9e36ad964fd78t24e0619f3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`; // Ensure metric system is used for Celsius
  axios.get(apiUrl).then(refreshWeather).catch(handleError);
}

function getForecast(city) {
  let apiKey = "c3f61ob3a9e36ad964fd78t24e0619f3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast).catch(handleError);
}

function handleError(error) {
  alert("City not found. Please try again.");
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily; 
  forecastElement.innerHTML = "";

  forecast.forEach(function (day, index) {
    if (index < 5) {

      let date = new Date(day.time * 1000);
      let dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
      let maxTemp = Math.round(day.temperature.maximum);
      let minTemp = Math.round(day.temperature.minimum);
      let iconUrl = day.condition.icon_url;

      forecastElement.innerHTML += `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${dayOfWeek}</div>
          <img src="${iconUrl}" class="weather-forecast-icon" alt="Weather icon">
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature"><strong>${maxTemp}º</strong></div>
            <div class="weather-forecast-temperature">${minTemp}º</div>
          </div>
        </div>
      `;
    }
  });
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Johannesburg");
