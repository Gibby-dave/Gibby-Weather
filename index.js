document.addEventListener("DOMContentLoaded", function() {
    requestLocationAccess();
});


let locationVal = document.getElementById("locationValue");
let tempVal = document.getElementById("tempValue");
let weatherInput = document.getElementById("weatherInput");
let weatherDescription = document.getElementById("weatherDescription");
let countryCode = document.getElementById("countryCode");
let showResult = document.getElementById("showResult");
let firstBackground = document.getElementById("firstBackground");
let secondBackground = document.getElementById("secondBackground")
const apiKey = "91274169bcd22a7775e98674b8ec343c";

function requestLocationAccess() {


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError, { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 });
} else {
    showResult.innerHTML = "Geolocation is not supported by this browser.";
}
}



function showPosition(position){
const lat = position.coords.latitude;
const long = position.coords.longitude

getWeather(lat, long);
}

function showError(error) {
switch(error.code) {
case error.PERMISSION_DENIED:
    showResult.innerHTML = "User denied the request for Geolocation.";
    break;
case error.POSITION_UNAVAILABLE:
    showResult.innerHTML = "Location information is unavailable.";
    break;
case error.TIMEOUT:
    showResult.innerHTML = "The request to get user location timed out.";
    break;
case error.UNKNOWN_ERROR:
    showResult.innerHTML = "An unknown error occurred.";
    break;
}
}

async function getWeather(lat, long){
const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
try {
    const response = await fetch(apiURL);
    const responseData = await response.json();
    // const data = await responseData;
    console.log(responseData);
    displayWeather(responseData);
    applyBackgroundGradient();
    
} catch (error){
    console.error("Error fetching weather data:", error)
}

}
function displayWeather(data) {
locationValue.innerHTML = `Current Location: ${data.name}`;
tempValue.innerHTML = `Temperature: ${data.main.temp}°C`;
weatherDescription.innerHTML = `Weather Description: ${data.weather[0].description}`;
countryCode.innerHTML = `Country code: ${data.sys.country}`;
}
async function getWeatherByCity() {
const city = weatherInput.value;
if (city) {
const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
try {
    const response = await fetch(apiURL);
    const responseData = await response.json();
    console.log(responseData);
    
    displayWeather(responseData);
    applyBackgroundGradient();
} catch (error) {
    console.error("Error fetching weather data:", error);
}
} else {
showResult.innerHTML = "Please enter a city.";
}
}
function applyBackgroundGradient() {
const gradient = 'linear-gradient(180deg, hsl(210, 100%, 75%), hsl(40, 100%, 75%))';
firstBackground.style.background = gradient;
secondBackground.style.background = gradient;
}



