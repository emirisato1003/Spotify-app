const dailyForecastTag = document.getElementById('dailyForecast');

function getDailyWeather(data) {
    const daily = data.daily;

    // Check if daily data exists
    if (!daily || !daily.time || !daily.temperature_2m_max || !daily.temperature_2m_min) {
        console.error('Invalid daily weather data');
        return;
    }

    // Map through the daily data to create weather summaries
    const dailyForecast = daily.time.map((time, i) => {
        return `${time}: H: ${daily.temperature_2m_max[i]}°F | L: ${daily.temperature_2m_min[i]}°F`;
    });

    // Log each forecast line
    dailyForecast.forEach(forecast => {
        dailyForecastTag.innerHTML += forecast + '<br>'; // Append each forecast with a line break
    });
}

// Fetch weather data and call the getDailyWeather function
fetch('https://api.open-meteo.com/v1/forecast?latitude=45.6387&longitude=-122.6615&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America%2FLos_Angeles')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => getDailyWeather(data))
    .catch(error => console.error('Error fetching weather data:', error));
