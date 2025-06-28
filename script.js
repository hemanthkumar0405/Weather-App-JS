const apiKey = 'b073d07252cb1c0cb9f2b6da125dc371'; // Replace with your API key

function clearWeather() {
    document.getElementById("weatherResult").innerHTML = "";
    document.getElementById("cityInput").value = "";
}

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const resultBox = document.getElementById("weatherResult");

    if (city === "") {
        resultBox.innerHTML = `<p>Please enter a city name.</p>`;
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("City not found or API error");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);  // Debug log
        resultBox.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p><strong>Weather:</strong> ${data.weather[0].main} (${data.weather[0].description})</p>
            <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;
    })
    .catch(error => {
        console.error(error);  // Debug log
        resultBox.innerHTML = `<p>❌ ${error.message}</p>`;
    });
}
