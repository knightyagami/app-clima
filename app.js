const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherResultDiv = document.getElementById('weatherResult');
const apiKey='88b51729f028ddfd3f21e6fda27a4905';

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    } else {
        alert('No escribio el nombre de una ciudad.');
    }
});

async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Ciudad no encontrada');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherResultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displayWeather(data) {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const cityName = data.name;
    const weatherHTML = `
        <h2>Clima en ${cityName}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Icono del clima">
         <p><strong>Temperatura:</strong> ${Math.round(temperature)}°C</p>
        <p><strong>Descripción:</strong> ${description}</p>
    `;
    weatherResultDiv.innerHTML = weatherHTML;
}