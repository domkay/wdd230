const apiKey = "3b0dc23895504032b3392679c079280a";
const city = 'Kinshasa';
const units = 'metric';
const weatherContainer = document.getElementById('weather-info');

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const weatherResponse = await fetch(weatherURL);
        const weatherData = await weatherResponse.json();

        const forecastResponse = await fetch(forecastURL);
        const forecastData = await forecastResponse.json();

        const currentTemp = weatherData.main.temp;
        const description = weatherData.weather[0].description;

        // Filter to daily forecasts (around midday)
        const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

        let forecastHTML = '';
        dailyForecasts.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
            const temp = day.main.temp;
            const desc = day.weather[0].description;
            forecastHTML += `<p><strong>${date}</strong>: ${temp.toFixed(1)}°C, ${desc}</p>`;
        });

        weatherContainer.innerHTML = `
            <p><strong>Current Temperature:</strong> ${currentTemp.toFixed(1)}°C</p>
            <p><strong>Condition:</strong> ${description}</p>
            <h4>3-Day Forecast:</h4>
            ${forecastHTML}
        `;
    } catch (error) {
        weatherContainer.innerHTML = '<p>Error loading weather data. Please try again later.</p>';
        console.error('Weather fetch error:', error);
    }
}

fetchWeather();
