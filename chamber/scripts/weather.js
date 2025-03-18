const apiKey = "3b0dc23895504032b3392679c079280a";
const city = "Kinshasa";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const weatherInfo = document.getElementById("weather-info");
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    weatherInfo.innerHTML = `
            <img src="${icon}" alt="${description}">
            <p>${temperature}°C, ${description}</p>
        `;
  })
  .catch((error) => {
    console.error("Error fetching weather data:", error);
    document.getElementById("weather-info").innerHTML =
      "<p>Failed to load weather data.</p>";
  });
