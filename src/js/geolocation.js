import { showMeteoData } from "./showMeteoData"

// Prevent form submit
document.querySelector(".leftAsideBox__chooseCity--button").addEventListener('click',(event)=>event.preventDefault());
const divPos = document.querySelector(".main__box1--header");

let cityData;

// Get location of navigator
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, error);
  } else { 
    divPos.innerHTML = "Geolocation is not supported by this browser.";
  }
};

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=307b855de38a960270e1caa9d305240a`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      cityData=data;
      divPos.innerHTML = cityData.name;
      showMeteoData(cityData.name)
    })
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  divPos.innerHTML = `ERROR(${err.code}): ${err.message}`;
};

getLocation();
export {getLocation}