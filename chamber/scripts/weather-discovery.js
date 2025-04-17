const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const city = 'Kinshasa';
const units = 'metric';

const tempEl = document.getElementById('current-temp');
const descEl = document.getElementById('weather-desc');
const forecastEl = document.getElementById('weather-forecast');

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

async function fetchWeatherDiscover() {
    try {
        const weatherResponse = await fetch(weatherURL);
        const weatherData = await weatherResponse.json();

        const forecastResponse = await fetch(forecastURL);
        const forecastData = await forecastResponse.json();

        const currentTemp = weatherData.main.temp;
        const description = weatherData.weather[0].description;

        const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

        let forecastText = '';
        dailyForecasts.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: 'short' });
            const temp = day.main.temp.toFixed(1);
            forecastText += `${date}: ${temp}°C, `;
        });

        tempEl.textContent = `${currentTemp.toFixed(1)}°C`;
        descEl.textContent = description;
        forecastEl.textContent = forecastText.slice(0, -2); // remove last comma
    } catch (error) {
        tempEl.textContent = 'Error';
        descEl.textContent = 'Error';
        forecastEl.textContent = 'Error';
        console.error('Weather fetch error:', error);
    }
}

fetchWeatherDiscover();
