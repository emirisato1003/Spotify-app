
const searchButton = document.getElementById('search-button');
const header = document.getElementById('header');
const main = document.getElementById('weatherForecast');

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const postalCode = document.getElementById('search-input').value;

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${postalCode}&count=10&language=en&format=json`)
        .then((response) => response.json())
        .then(data => {
            const geo = getLatLon(postalCode, data);

            const url = `https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude}&longitude=${geo.longitude}&current=temperature_2m,precipitation,weather_code&hourly=temperature_2m,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FLos_Angeles`;

            fetch(url)
                .then((response) => response.json())
                .then(data => getWeatherForecast(data, geo.name));
        });
});

function getWeatherForecast(data, name) {
    console.log(data);
    header.style.display = 'none';
    main.style.display = 'flex';

    const weatherCurrent = document.getElementById('weather-current');
    // const weatherHourly = document.getElementById('weather-hourly');
    // const weatherDaily = document.getElementById('weather-daily');

    const date = new Date();
    const option = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const currentDate = date.toLocaleDateString('en-US', option);
    const currentTime = date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    const weatherCodeMap = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: ["Overcast"],
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        56: "Light freezing drizzle",
        57: "Dense freezing drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        66: "Light freezing rain",
        67: "Heavy freezing rain",
        71: "Slight snow fall",
        73: "Moderate snow fall",
        75: "Heavy snow fall",
        77: "Snow grains",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        85: "Slight snow showers",
        86: "Heavy snow showers",
        95: "Slight or moderate thunderstorm",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail"
    };

    function weatherDescription(code){
        return (weatherCodeMap[code] || "Unknown weather");
    }

    weatherCurrent.innerHTML = `
                            <h1>${currentDate}&nbsp;${currentTime}</h1>
                            <h2>📍${name}<h2>
                            <h3>${data.current.temperature_2m}℉</h3>
                            <h4>${weatherDescription(data.current.weather_code)}</h4>
    `;
}

function getLatLon(postalCode, data) {
    const error = document.getElementById('error-message');

    error.innerHTML = '';
    error.classList.remove('error-message');

    try {
        if (!postalCode || postalCode.trim() === '') {
            throw new Error('Please enter a valid postal code.');
        }
        if (!data.results) {
            throw new Error('No location found for this postal code.');
        }

        const { latitude, longitude, name } = data.results[0];
        // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        return { latitude, longitude, name };

    } catch (err) {
        error.innerHTML = err.message;
        error.classList.add('error-message');
        return null;
    }

}

