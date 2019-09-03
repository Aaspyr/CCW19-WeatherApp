import "./scss/main.scss";

import "./js/townSearcher"
import "./js/loadingScreen"
// import "./js/geolocation";

import getMeteoData from "./js/meteoData"

//funckcja odpowiedzialna za wyświetlanie danych pogodowych
const showMeteoData = async () => {
    const meteo = await getMeteoData("Warszawa");
    console.log(meteo)
    // stan na obecny dzień
    document.getElementsByClassName("main__box2--temp header")[0].innerHTML = `${meteo[0].temp}&deg;C`;
    document.getElementsByClassName("main__box2--minTemp")[0].innerHTML= `temp. min. ${meteo[0].temp_min}&deg;C`;
    document.getElementsByClassName("main__box2--maxTemp")[0].innerHTML = `temp. max. ${meteo[0].temp_max}&deg;C`;
    document.getElementsByClassName("main__box3--pressure")[0].textContent = `Ciśnienie: ${meteo[0].pressure}hPa`;
    document.getElementsByClassName("main__box3--humidity")[0].textContent = `Wilgotność: ${meteo[0].humidity}%`;
    document.getElementsByClassName("main__box3--wind")[0].textContent = `Wiatr: ${meteo[0].wind_speed}km/h`;
    
    const information = document.getElementsByClassName("main__box1--paragraph")[0];
    const description = meteo[0].description;
    console.log(description);
    switch (description){
        case "clear sky":
            information.textContent = "Nie pada!";
            break;
        case "scattered clouds":
            information.textContent = "Występują lekkie chmurki, ale nie pada!";
            break;
        case "overcast clouds":
            information.textContent = "Występuje zachmurzenie, ale nie pada!";
            break;
        case "light rain":
            information.textContent = "Może wystąpić lekki deszczyk!";
            break;
        default:
            information.textContent = description;  
    }

    //stan na następne 5 dni
    const nextDaysTempMin = document.querySelectorAll(".rightAside__forcast--minMax > p:first-child");
    const nextDaysTempMax = document.querySelectorAll(".rightAside__forcast--minMax > p:last-child");
    nextDaysTempMin.forEach((element, i) => {element.innerHTML = `temp. min: ${meteo[i+1].temp_min}&deg;C`;});
    nextDaysTempMax.forEach((element, i) => {element.innerHTML = `temp. max: ${meteo[i+1].temp_max}&deg;C`;});

}

showMeteoData();
