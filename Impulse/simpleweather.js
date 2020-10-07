// api key : 82005d27a116c2880c8f0fcb866998a0

// SELECT ELEMENTS
const descElement = document.querySelector(".report p");


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
    
}

// Set user position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// show error
function showErr(err){

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
    console.log(weather.description);
    var desc = weather.temperature.value + '°C';
    descElement.innerHTML = desc + '- ' + weather.description;
}

// C to F
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

