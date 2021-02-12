function currentTime(timestamp) {
  let dayIndex = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp){
  let date = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function showTemperature(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for(let index = 0; index < 6; index ++){
  let forecast = response.data.list[index];
  forecastElement.innerHTML += `
  <div class="col-2">
     <h3>
     ${formatHours(forecast.dt*1000)}
     </h3>
    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
     alt=""/>
    <div class="weather-forecast-temperature">
    <strong>${Math.round(forecast.main.temp_max)}</strong>${Math.round(forecast.main.temp_min)}
  </div>
  </div>`
  }
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "bee7831fe7daa90e78bd0ad46950355e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https//api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}
function enterCity(event) {
  event.preventDefault();
  let city = document.querySelector("#text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "bee7831fe7daa90e78bd0ad46950355e";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9)/ 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
//function citateElement(response){
  //let description = "response.data.weather[0].description";
  //if (description === "scattered clouds" || description === "broken clouds")
  //{description = `A gray day provides the best light - L. da Vinci`;
//} else if (description === "shower rain" || description === "rain" || description === "thunderstorm")
  //{description = `Without rain nothing grows`;
//} else if( description === "clear sky" || description ==="few clouds")
  //{description = `What sunshine is to flower, smiles are to humanity - J. Addison`;
//} else if (description === "snow" || description === "light snow")
  //{description = `Kindness is like snow. I beautifies everything it covers - K. Gibran`;
//} else 
 //{description = `If you want to see the sunshine, you have to weather the storm - F. Lane`;
//}
//}
//let weatherCitate = document.querySelector("p");
//weatherCitate.innerHTML = citateElement();


let dateElement = document.querySelector("#date");
let now = new Date();
dateElement.innerHTML = currentTime(now);

let cityForm = document.querySelector("#enter-form");
cityForm.addEventListener("submit", enterCity);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", showLocation);

searchCity("Kaunas");