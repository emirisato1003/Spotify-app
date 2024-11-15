
const searchButton = document.getElementById('search-button');
const header = document.getElementById('header');
const main = document.getElementById('weatherForecast');

const weatherCodeMap = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
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

function weatherDescription(code) {
    return (weatherCodeMap[code] || "Unknown weather");
}

// function getHourlyweather(data) {
//     const weatherHourly = document.getElementById('weather-hourly-forecast');
//     const currentHour = new Date().getHours();
//     weatherHourly.innerHTML = '';

//     const title = document.createElement('h5');
//     title.innerHTML = '<i class="bi bi-clock"></i> Hourly Forecast';
//     weatherHourly.appendChild(title);

//     const hourlyContainer = document.createElement('div');
//     hourlyContainer.classList.add('hourly-forecast-container');

//     for (let i = [currentHour]; i < currentHour + 24; i++) {
//         const dataIndex = i;
//         const displayHour = new Date(data.time[dataIndex]).toLocaleDateString('en-US', {
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: false
//         }).slice(11, 17);


//         hourlyContainer.innerHTML += `
//                             <div class="hourly-forecast">
//                                     <p><b>${displayHour}</b></p>
//                                     <small>${weatherDescription(data.weather_code[dataIndex])}</small>
//                                     <p><b>${data.temperature_2m[dataIndex]}</b>°</p>
//                             </div>
//         `;

//     }
//     weatherHourly.appendChild(hourlyContainer);

// }


function getDailyweather(data) {
    // console.log(data);
    const weatherDaily = document.getElementById('weather-daily-forecast');
    weatherDaily.innerHTML = '';

    const h5 = document.createElement('h5');
    h5.innerHTML = '<i class="bi bi-calendar3"></i> Daily Forecast';
    weatherDaily.appendChild(h5);


    for (i = 0; i < data.time.length; i++) {
        const date = new Date(data.time[i]).toLocaleDateString('en-US', { weekday: 'short' });

        const dailyContainer = document.createElement('div');
        dailyContainer.classList.add('daily-forecast-container');

        dailyContainer.innerHTML += `
                <div class="daily-forecast">
                    <p><b>${date}</b></p>
                    <p><small>${weatherDescription(data.weather_code[i])}</small></p>
                    <p><b>H:${data.temperature_2m_max[i]}</b>°&nbsp;/&nbsp;L:${data.temperature_2m_min[i]}°</p>
                </div>
                <button id="daily-forecast-detail-${i}" class="daily-forecast-detail">
                    <i class="bi bi-caret-down-fill"></i>
                </button>
                <div id="detail-content-${i}" class="detail-content" style="display: none;">
                    <p>Precipitation: <b>${data.precipitation_sum[i]}</b> mm</p>
                    <p><i class="bi bi-cloud-drizzle-fill"></i>: <b>${data.rain_sum[i]}</b> mm</p>
                    <p>
                        <i class="bi bi-sunrise-fill"></i>: <b>${new Date(data.sunrise[i]).toLocaleTimeString('en-US', { timeStyle: "short" })}</b>&nbsp;
                        <span><i class="bi bi-sunset-fill"></i>: <b>${new Date(data.sunset[i]).toLocaleTimeString('en-US', { timeStyle: "short" })}</b></span>
                    </p>
                    <p>UV Index: <b>${data.uv_index_max[i]}</b></p>
                </div>
        `;

        weatherDaily.appendChild(dailyContainer);

    }
    for (let i = 0; i < data.time.length; i++) {
        const button = weatherDaily.querySelector(`#daily-forecast-detail-${i}`);
        const detailContent = document.getElementById(`detail-content-${i}`);
        const icon = button.querySelector('i');

        button.addEventListener('click', () => {
            detailContent.style.display = detailContent.style.display === 'none' ? 'block' : 'none';
            detailContent.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            icon.classList = detailContent.style.display === 'none' ? 'bi bi-caret-down-fill' : 'bi bi-caret-up-fill';
            detailContent.style.borderRadius = detailContent.style.display === 'none' ? '' : '0 0 10px 10px';
            button.style.borderRadius = detailContent.style.display === 'none' ? '' : '0';
        });

    }
}


function getCurrentWeatherForecast(data, name) {
    header.style.display = 'none';
    main.style.display = 'grid';

    const weatherCurrent = document.getElementById('weather-current');

    // setInterval(() => {
        const date = new Date();
        const option = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const currentDate = date.toLocaleDateString('en-US', option);
        const currentTime = date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        });

        weatherCurrent.innerHTML = `
        <h1>${currentDate}</h1>
        <h2>${currentTime}</h2>
        <h3><i class="bi bi-geo-alt-fill"></i>&nbsp;${name}</h3>
        <h4>${data.current.temperature_2m}℉</h4>
        <h5 class="weather-code">${weatherDescription(data.current.weather_code)}</h5>
        `;
    // }, 1000);

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

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const postalCode = document.getElementById('search-input').value;

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${postalCode}&count=10&language=en&format=json`)
        .then((response) => response.json())
        .then(data => {
            const geo = getLatLon(postalCode, data);

            const url = `https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude}&longitude=${geo.longitude}&current=temperature_2m,precipitation,rain,showers,snowfall,weather_code&hourly=temperature_2m,precipitation_probability,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FLos_Angeles`;

            fetch(url)
                .then((response) => response.json())
                .then(data => {
                    console.log(url);
                    getCurrentWeatherForecast(data, geo.name);
                    // getHourlyweather(data.hourly);
                    getDailyweather(data.daily);
                });
        });
});