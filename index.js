
const searchButton = document.getElementById('search-button');
const header = document.getElementById('header');
const main = document.getElementById('weatherForecast');
const backToPageBtn = document.getElementById('back-to-page-btn');
const weatherCodeMap = {
    0: {
        description: "Clear sky",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather01-512.png"
    },
    1: {
        description: "Mainly clear",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png"
    },
    2: {
        description: "Partly cloudy",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather03-512.png"
    },
    3: {
        description: "Overcast",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather04-512.png"
    },
    45: {
        description: "Fog",
        icon: "https://cdn3.iconfinder.com/data/icons/winter-flat-8/32/winter_season_weather_Cloud_fog_sky_wind-512.png"
    },
    48: {
        description: "Depositing rime fog",
        icon: "https://cdn3.iconfinder.com/data/icons/winter-flat-8/32/winter_season_weather_Cloud_fog_sky_wind-512.png"
    },
    51: {
        description: "Light drizzle",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather05-512.png"
    },
    53: {
        description: "Moderate drizzle",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather06-512.png"
    },
    55: {
        description: "Dense drizzle",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png"
    },
    56: {
        description: "Light freezing drizzle",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather05-512.png"
    },
    57: {
        description: "Dense freezing drizzle",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png"
    },
    61: {
        description: "Slight rain",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather05-512.png"
    },
    63: {
        description: "Moderate rain",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather06-512.png"
    },
    65: {
        description: "Heavy rain",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png"
    },
    66: {
        description: "Light freezing rain",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather05-512.png"
    },
    67: {
        description: "Heavy freezing rain",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png"
    },
    71: {
        description: "Slight snow fall",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather05-512.png"
    },
    73: {
        description: "Moderate snow fall",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather12-512.png"
    },
    75: {
        description: "Heavy snow fall",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather13-512.png"
    },
    77: {
        description: "Snow grains",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather12-512.png"
    },
    80: {
        description: "Slight rain showers",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather05-512.png"
    },
    81: {
        description: "Moderate rain showers",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather06-512.png"
    },
    82: {
        description: "Violent rain showers",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png"
    },
    85: {
        description: "Slight snow showers",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather12-512.png"
    },
    86: {
        description: "Heavy snow showers",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather13-512.png"
    },
    95: {
        description: "Slight or moderate thunderstorm",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather09-512.png"
    },
    96: {
        description: "Thunderstorm with slight hail",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather14-512.png"
    },
    99: {
        description: "Thunderstorm with heavy hail",
        icon: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather08-512.png"
    }
};

function h5(title, icon) {
    const h5 = document.createElement('h5');
    h5.innerHTML = `<i class="bi ${icon}"></i>&nbsp;${title}`;
    h5.className = 'forecast-title';
    return h5;
}

function weatherDescription(code) {
    return `
            <img src=${weatherCodeMap[code].icon} alt=${weatherCodeMap[code].description} class="weather-icon">
            <p><small>${weatherCodeMap[code].description}</small></p>
        `
        || "Unknown weather";
}

function getHourlyweather(data) {
    const weatherHourly = document.getElementById('weather-hourly-forecast');
    const currentHour = new Date().getHours();
    weatherHourly.innerHTML = '';

    weatherHourly.appendChild(h5('Hourly Forecast', 'bi-clock'));

    const hourlyContainer = document.createElement('div');
    hourlyContainer.classList.add('hourly-forecast-container');

    for (let i = [currentHour]; i < currentHour + 24; i++) {
        const dataIndex = i;
        const displayHour = new Date(data.time[dataIndex]).toLocaleDateString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).slice(11, 17);


        hourlyContainer.innerHTML += `
                            <div class="hourly-forecast">
                                    <p><b>${displayHour}</b></p>
                                    ${weatherDescription(data.weather_code[dataIndex])}
                                    <p><b>${data.temperature_2m[dataIndex]}</b>°</p>
                            </div>
        `;

    }
    weatherHourly.appendChild(hourlyContainer);

}

function getDailyweather(data) {
    const weatherDaily = document.getElementById('weather-daily-forecast');
    weatherDaily.innerHTML = '';

    weatherDaily.appendChild(h5('Daily Forecast', 'bi-calendar3'));


    for (i = 0; i < data.time.length; i++) {
        const dailyDate = data.time[i].slice(5, 10).replace('-', '/');

        const now = new Date().toLocaleDateString('en-US',
            {
                month: "2-digit",
                day: "2-digit",

            });

        const dailyContainer = document.createElement('div');
        dailyContainer.classList.add('daily-forecast-container');

        dailyContainer.innerHTML += `
                <div class="daily-forecast">
                    <p><b>${now === dailyDate ? 'Today' : dailyDate}</b></p>
                    <div class="weather-description">${weatherDescription(data.weather_code[i])}</div>
                    <p><b>H:${data.temperature_2m_max[i]}</b>°&nbsp;/&nbsp;L:${data.temperature_2m_min[i]}°</p>
                </div>
                <button id="daily-forecast-detail-${i}" class="daily-forecast-detail-${i}">
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
    weatherCurrent.innerHTML = '';

    const currentContainer = document.createElement('div');
    currentContainer.classList.add('weather-current-container');


    setInterval(() => {
        const date = new Date();
        const option = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const currentDate = date.toLocaleDateString('en-US', option);
        const currentTime = date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        });

        currentContainer.innerHTML = `
        <h1>${currentDate}</h1>
        <h2>${currentTime}</h2>
        <h3><i class="bi bi-geo-alt-fill"></i>&nbsp;${name}</h3>
        <h4>${data.current.temperature_2m}℉</h4>
        <h5 class="weather-code">${weatherDescription(data.current.weather_code)}</h5>
        `;
    }, 1000);
    weatherCurrent.appendChild(currentContainer);


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
        return { latitude, longitude, name };

    } catch (err) {
        error.innerHTML = err.message;
        error.classList.add('error-message');
        return null;
    }

}

backToPageBtn.addEventListener('click', () => {
    header.style.display = 'block';
    main.style.display = 'none';
});

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
                    getHourlyweather(data.hourly);
                    getDailyweather(data.daily);
                });
        });
});