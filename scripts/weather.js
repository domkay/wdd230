const apiKey = '3b0dc23895504032b3392679c079280a';
const city = 'Kinshasa';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayWeather(data) {
    const temperature = document.querySelector('#temperature');
    const condition = document.querySelector('#weather-condition');
    const icon = document.querySelector('#weather-icon');
    
    temperature.textContent = Math.round(data.main.temp);
    condition.textContent = data.weather[0].description;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = data.weather[0].description;
}

fetchWeather();