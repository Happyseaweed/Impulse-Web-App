// api key : 82005d27a116c2880c8f0fcb866998a0

// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// app data
const weather = {};

weather.temperature = {
    unit: "celsius"
}

// Consts
const KELVIN = 273;
// API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

// if there is geolocation
if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showErr);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't support geolocation</p>";
}

// Set user position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// show error
function showErr(err){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${err.message} </p>`;
}

// get the weather
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });

}

// displaying weather
function displayWeather(){
    //iconElement.innerHTML = `<img src="./icons/solid-black/png/32x32/${weather.iconId}.png"/>`;
    iconElement.innerHTML = `<img src="./icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// on the click of temperature element
tempElement.addEventListener("click", function(){
    if(weather.temperature.value == undefined) return;

    if (weather.temperature.unit == "celsius"){
        let f = celsiusToFahrenheit(weather.temperature.value);
        f = Math.floor(f);

        tempElement.innerHTML = `${f}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }

});