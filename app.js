// get date
let date = new Date();

let currentHour = date.getHours();
if (currentHour > 0) {
  currentHour = date.toTimeString().slice(0, 2);
}
let currentMinute = date.getMinutes();
if (currentMinute > 0) {
  currentMinute = date.toTimeString().slice(3, 5);
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[date.getDay()];

let currentDate = document.querySelector("span#currentTime");
currentDate.innerHTML = `${currentDay}  ${currentHour}:${currentMinute}`;

// city search
function searchCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city");
  let searchInput = document.querySelector("#city-input");
  currentCity.innerHTML = searchInput.value;
  let apiCity = searchInput.value;
  let apiKey = "2caf9a6049c0ca7609a256c606d75f55";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${apiCity}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let weatherCity = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.main.temp);
  weatherCity.innerHTML = temperature;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

// F to C and vice versa

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.main.temp);
  showWeather(temperature);
  let fahrenheitTemperature = (temperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature) + "°F";
}
function convertToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature) + "°C";
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let celsiusTemperature = null;
//current button

function showCurrentLocation(response) {
  let city = document.querySelector("#city");
  let currentCity = response.data.name;
  city.innerHTML = currentCity;
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = temperature + "°C";
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", findPosition);

function findPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(position) {
  let apiKey = "2caf9a6049c0ca7609a256c606d75f55";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentLocation);
}
