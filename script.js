const apiKey = "f8ffa1b03fad4de606b6c2c77f79038a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const weatherSection = document.querySelector(".weather");
const errorSection = document.querySelector(".error");

// ICON MAP
const iconMap = {
    Clouds: "images/clouds.png",
    Clear: "images/clear.png",
    Drizzle: "images/drizzle.png",
    Snow: "images/snow.png",
    Rain: "images/rain.png",
    Mist: "images/mist.png",
    Haze: "images/mist.png",
    Fog: "images/mist.png",
    Smoke: "images/mist.png",
    Dust: "images/mist.png",
    Sand: "images/mist.png",
    Ash: "images/mist.png",
    Squall: "images/rain.png",
    Thunderstorm: "images/rain.png",
};

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        // Handle 404: City not found
        if (response.status === 404) {
            showError();
            return;
        }

        const data = await response.json();

        // Update icon
        const weatherType = data.weather[0].main;
        weatherIcon.src = iconMap[weatherType] || "images/clear.png";

        // Update UI values
        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").textContent = data.main.humidity + "%";
        document.querySelector(".wind").textContent = data.wind.speed + " km/h";

        showWeather();
    } catch (err) {
        console.error("Weather fetch error:", err);
        showError();
    }
}

// ✅ Show weather section properly
function showWeather() {
    weatherSection.hidden = false;
    errorSection.hidden = true;

    weatherSection.classList.add("show");
    errorSection.classList.remove("show");
}

// ✅ Show error section properly
function showError() {
    errorSection.hidden = false;
    weatherSection.hidden = true;

    errorSection.classList.add("show");
    weatherSection.classList.remove("show");
}

// ✅ Button click search
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) checkWeather(city);
});

// ✅ Enter key search (RELIABLE)
searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const city = searchBox.value.trim();
        if (city) checkWeather(city);
    }
});
