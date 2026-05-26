// ============================
// SELECT ELEMENTS
// ============================

let cityInput = document.querySelector("#cityInput");
let searchBtn = document.querySelector("#searchBtn");

let cityName = document.querySelector("#cityName");
let dateElement = document.querySelector("#date");

let weatherIcon = document.querySelector("#weatherIcon");

let temperature = document.querySelector("#temperature");

let weatherCondition =
    document.querySelector("#weatherCondition");

let humidity = document.querySelector("#humidity");

let wind = document.querySelector("#wind");

let feelsLike = document.querySelector("#feelsLike");

let forecastContainer =
    document.querySelector(".forecast-container");

let loading = document.querySelector(".loading");

let error = document.querySelector(".error");

let modeBtn = document.querySelector("#toggleMode");


// ============================
// API KEY
// ============================

let apiKey = "5d5f110793b04b7ca7d123202262405";


// ============================
// GET WEATHER FUNCTION
// ============================

async function getWeather(city) {

    try {

        // show loading
        loading.classList.remove("hidden");

        error.classList.add("hidden");

        // fetch api
        let response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`
        );

        // convert to json
        let data = await response.json();

        console.log(data);

        // hide loading
        loading.classList.add("hidden");

        // ============================
        // CURRENT WEATHER
        // ============================

        cityName.innerText =
            data.location.name;

        let currentDate =
            new Date(
                data.location.localtime_epoch * 1000
            );

        dateElement.innerText =
            currentDate.toDateString();

        weatherIcon.src =
            "https:" +
            data.current.condition.icon;

        temperature.innerText =
            data.current.temp_c + "°C";

        weatherCondition.innerText =
            data.current.condition.text;

        humidity.innerText =
            data.current.humidity + "%";

        wind.innerText =
            data.current.wind_kph + " km/h";

        feelsLike.innerText =
            data.current.feelslike_c + "°C";


        // ============================
        // FORECAST
        // ============================

        forecastContainer.innerHTML = "";

        data.forecast.forecastday.forEach((day) => {

            forecastContainer.innerHTML += `

                <div class="forecast-card">

                    <h3>${day.date}</h3>

                    <img
                        src="https:${day.day.condition.icon}"
                    >

                    <p>
                        Avg:
                        ${day.day.avgtemp_c}°C
                    </p>

                    <p>
                        Max:
                        ${day.day.maxtemp_c}°C
                    </p>

                    <p>
                        Min:
                        ${day.day.mintemp_c}°C
                    </p>

                </div>
            `;
        });

    }

    catch(err){

        console.log(err);

        loading.classList.add("hidden");

        error.classList.remove("hidden");
    }
}


// ============================
// SEARCH BUTTON
// ============================

searchBtn.addEventListener("click", () => {

    let city = cityInput.value.trim();

    if(city !== ""){

        getWeather(city);
    }
});


// ============================
// ENTER KEY SEARCH
// ============================

cityInput.addEventListener("keypress", (e) => {

    if(e.key === "Enter"){

        let city = cityInput.value.trim();

        if(city !== ""){

            getWeather(city);
        }
    }
});


// ============================
// DEFAULT CITY
// ============================

getWeather("Karachi");


// ============================
// DARK MODE
// ============================

let savedTheme =
    localStorage.getItem("theme");

if(savedTheme === "dark"){

    document.body.classList.add("dark");

    modeBtn.innerText =
        "☀ Light Mode";
}


modeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(
        document.body.classList.contains("dark")
    ){

        localStorage.setItem(
            "theme",
            "dark"
        );

        modeBtn.innerText =
            "☀ Light Mode";

    }

    else{

        localStorage.setItem(
            "theme",
            "light"
        );

        modeBtn.innerText =
            "🌙 Dark Mode";
    }
});