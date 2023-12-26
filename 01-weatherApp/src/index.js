const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");

const image = document.querySelector(".weather-box img");
const temperature = document.querySelector(".weather-box .temperature");
const description = document.querySelector(".weather-box .description");
const humidty = document.querySelector(".weather-details .humidity span");
const wind = document.querySelector(".weather-details .wind span");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "f7b29e21bc15bea9ddb8b35e9ad5423e";
  const city = document.querySelector(".search-box input").value;

  if (city === "") {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
      }

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "imgs/clear.png";
          break;
        case "Rain":
          image.src = "imgs/rain.png";
          break;
        case "Snow":
          image.src = "imgs/snow.png";
          break;
        case "Haze":
          image.src = "imgs/fog.png";
          break;
        case "Clouds":
          image.src = "imgs/cloud.png";
          break;
        case "Smoke":
          image.src = "imgs/smoke.png";
          break;
        case "Fog":
          image.src = "imgs/smoke.png";
          break;
        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      console.log(json.weather[0].description);
      description.innerHTML = `${json.weather[0].description}`;
      humidty.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${json.wind.speed}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";

      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "670px";
      
    });
});
