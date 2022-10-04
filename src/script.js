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


function showData(response) {
    let celsius = response.data.main.temp;

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
  }

  


function citySearch(event){
    event.preventDefault();
    let newCity = document.querySelector("#city-input");
    let changedCity = document.querySelector("#city-now");
    changedCity.innerHTML = newCity.value;

    let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showData);
}

function convertToFahr(event) {
    event.preventDefault();
    let tempCel = document.querySelector(".mainTemp");
    let fahr = (celsius * 9) / 5 + 32;
    tempCel.innerHTML = `${Math.round(fahr)}°F`;
    celsiusConverter.classList.remove("active");
    fahrConverter.classList.add("active");
  }

function convertToCelsius(event) {
    event.preventDefault();
    let backToCelsius = document.querySelector(".mainTemp");
    backToCelsius.innerHTML = `${Math.round(celsius)}°C`;
    fahrConverter.classList.remove("active");
    celsiusConverter.classList.add("active");
}

let celsius = null;

let inputCity = document.querySelector("#enter-city");
inputCity.addEventListener("submit", citySearch);

let celsiusConverter = document.querySelector("#to-celsius");
celsiusConverter.addEventListener("click", convertToCelsius);

let fahrConverter = document.querySelector("#to-fahrenheit");
fahrConverter.addEventListener("click", convertToFahr);