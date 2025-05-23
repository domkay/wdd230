// Visit tracking with localStorage
document.addEventListener('DOMContentLoaded', function() {
    const visitMessage = document.getElementById('visitMessage');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    
    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitTimestamp = parseInt(lastVisit);
        const timeDiff = now - lastVisitTimestamp;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        if (daysDiff < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysDiff === 1 ? "day" : "days";
            visitMessage.textContent = `You last visited ${daysDiff} ${dayText} ago.`;
        }
    }
    
    localStorage.setItem('lastVisit', now.toString());
    
    // Set current year and last modified date
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
});

const apiKey = "3b0dc23895504032b3392679c079280a";
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
            forecastText += `${date}: ${temp}°C\n`;
        });

        tempEl.textContent = `${currentTemp.toFixed(1)}°C`;
        descEl.textContent = description;
        forecastEl.innerHTML = forecastText
            .trim()
            .split('\n')
            .map(line => `<div>${line}</div>`)
            .join('');
    } catch (error) {
        tempEl.textContent = 'Error';
        descEl.textContent = 'Error';
        forecastEl.textContent = 'Error';
        console.error('Weather fetch error:', error);
    }
}

fetchWeatherDiscover();