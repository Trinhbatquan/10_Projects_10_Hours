const APIKEY = '4f0c5f237b428cfe861db9dc06e5875a'

const APIURL = 'https://api.openweathermap.org/data/2.5/weather?q='

const apiIcon = 'https://openweathermap.org/img/w/';

const input = document.getElementById('input');
const searchBtn = document.querySelector('.searchBtn');
const main = document.getElementById('main');



searchBtn.addEventListener('click', () => {
    main.innerHTML = "";
    const city = input.value;
   getWeatherSearch(city);
})


async function getWeatherSearch(city) {
    const resp = await fetch(APIURL + city + '&appid=' + APIKEY);
    const respData = await resp.json();
    console.log(respData);



    const weatherLocation = document.createElement('div');
    weatherLocation.classList.add('weather');

    weatherLocation.innerHTML = `
        <h2 class="CurrentTemp">
            <img src="${apiIcon}${respData.weather[0].icon}.png">
            <span>${configTemp(respData.main.temp)}℃</span>
            <img src="${apiIcon}${respData.weather[0].icon}.png">
        </h2>
        <h2 class="Max_Min"> 
            <span class="maxValue">Max: ${configTemp(respData.main.temp_max)}℃</span>
            <span>Min: ${configTemp(respData.main.temp_min)}℃</span>
        </h2>
    `

    main.appendChild(weatherLocation);
}


function configTemp(K) {
    return (K - 273.15).toFixed(2);
}