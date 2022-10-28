function giveDate(timeNow) {
    let date = new Date(timeNow)
    let hour = date.getHours();
    let minute = date.getMinutes();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      let day = days[date.getDay()];
      return `${day} ${hour}:${minute}`;
}

function formatDate(now) {
let date = new Date(now * 1000)
let day = date.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
return days[day];
}

function showForecast(response) {
 let dailyForecast = response.data.daily;
 console.log(response);
  
  let forecast = document.querySelector("#forecast");
  

  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastday, index) {
    if (index < 6 ) {
  forecastHTML = forecastHTML +  `
  <div class="col-2">
      <div class="forecast-date">
          ${formatDate(forecastday.dt)} 
      </div>
      <img src="http://openweathermap.org/img/wn/${forecastday.weather[0].icon}@2x.png"
      alt=""
      width="42" />
      <div  class="forecast-temp">
          <span class="forecast-min">${Math.round(forecastday.temp.min)}°C</span> <span class="forecast-max">${Math.round(forecastday.temp.max)}°C</span>
      </div>
  </div>
`
    }
  });
forecastHTML = forecastHTML + `</div>`;
forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `894a2e7aa7f46eeca5d8778f6faa5a5b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
  console.log(coordinates)
}

function showData(response) {
    celsius = response.data.main.temp;

    let newDegrees = document.querySelector(".mainTemp");
    let newTime = document.querySelector("#time-now");
    let newHumidity = document.querySelector("#hum-now");
    let newWind = document.querySelector("#wind-now");
    let newPressure = document.querySelector("#pressure-now");
    let newDesc = document.querySelector("#desc-now");
    let newIcon = document.querySelector("#pic-icon")

    

    newDegrees.innerHTML = `${Math.round(celsius)}°C`;
    newTime.innerHTML = giveDate(response.data.dt * 1000);
    newHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    newWind.innerHTML = `Wind: ${response.data.wind.speed} km/h`
    newPressure.innerHTML = `Pressure: ${response.data.main.pressure} Pa`;
    newDesc.innerHTML = response.data.weather[0].description;
    newIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  
  getForecast(response.data.coord);
  
  }

  


function citySearch(event){
    event.preventDefault();
    let newCity = document.querySelector("#city-input");
    let changedCity = document.querySelector("#city-now");
    changedCity.innerHTML = newCity.value;

    let apiKey = "894a2e7aa7f46eeca5d8778f6faa5a5b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showData);
}


let celsius = null;

let inputCity = document.querySelector("#enter-city");
inputCity.addEventListener("submit", citySearch);
