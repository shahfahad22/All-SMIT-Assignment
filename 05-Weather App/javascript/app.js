const apiKey = "fcd155d2f9a44b46b3b31056252006";
const apiUrl = "https://api.weatherapi.com/v1/current.json?key=";

const searchBox = document.querySelector(".search-input");
const searchbtn = document.querySelector(".search-button");
const weatherIcon = document.querySelector(".weather-icon");

async function cheakWeather(cityName) {
  const response = await fetch(`${apiUrl}${apiKey}&q=${cityName}`);

  if (!response.ok) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  } else {
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.location.name;
    document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
    document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";

    const condition = data.current.condition.text;

    if (condition.includes("Cloud")) {
      weatherIcon.src = "images/clouds.png";
    } else if (condition.includes("Clear") || condition.includes("Sunny")) {
      weatherIcon.src = "images/clear.png";
    } else if (condition.includes("Drizzle")) {
      weatherIcon.src = "images/drizzle.png";
    } else if (condition.includes("Rain")) {
      weatherIcon.src = "images/rain.png";
    } else if (condition.includes("Mist") || condition.includes("Fog")) {
      weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchbtn.addEventListener("click", () => {
  cheakWeather(searchBox.value.trim());
});
