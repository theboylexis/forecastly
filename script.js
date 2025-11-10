const apiKey = "f8ffa1b03fad4de606b6c2c77f79038a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const weatherSection = document.querySelector(".weather");
const errorSection = document.querySelector(".error");

// ICON MAP (handles all weather types)
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
    Thunderstorm: "images/rain.png"
};

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status === 404) {
            errorSection.classList.add("show");
            weatherSection.classList.remove("show");
            return; 
        }

        let data = await response.json();

        // SET WEATHER ICON
        const weatherType = data.weather[0].main;
        weatherIcon.src = iconMap[weatherType] || "images/clear.png";

        // UPDATE UI
        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").textContent = data.main.humidity + "%";
        document.querySelector(".wind").textContent = data.wind.speed + " km/h";

        weatherSection.classList.add("show");
        errorSection.classList.remove("show");
    } catch (error) {
        // Handle network or other errors gracefully
        errorSection.classList.add("show");
        weatherSection.classList.remove("show");
        console.error("Error fetching weather data:", error);
    }
}

// Button click event
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) checkWeather(city);
});

// Optional: Press ENTER to search
searchBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const city = searchBox.value.trim();
        if (city) checkWeather(city);
    }
});
