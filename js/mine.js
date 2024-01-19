let day = document.getElementsByClassName("day");
let date = document.getElementsByClassName("date");
let city = document.getElementById("city");
let maxTemp = document.getElementsByClassName("max-temp");
let icon = document.getElementsByClassName("icon");
let minTemp = document.getElementsByClassName("min-temp");
let conditionText = document.getElementsByClassName("condition-text");
let humidity = document.getElementsByClassName("humidity");
let windSpeed = document.getElementsByClassName("wind-speed");
let windDirection = document.getElementsByClassName("wind-direction");
let searchTnp = document.getElementById("search");
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// // fetch API >> get city 
async function getCity(cityLocation)
{

   let url = `https://api.weatherapi.com/v1/forecast.json?key=b1994ca89c8d406997d54501210805&q=${cityLocation}&days=3`;

    let cityApi = await fetch(url)
  
    let data = await cityApi.json();
    // console.log(data);
    let cityName ;
    displayWeather(cityName , data);
    
}
// display weather
function displayWeather(cityName , data)
{
    let dataArray = [] ; 
    dataArray = data.forecast.forecastday;
    cityName = data.location.name ;
    // console.log(cityName);
    // console.log(dataArray);
    //console.log(getDayName(dataArray[0].date))
    for (var i = 0 ; i<dataArray.length ; i++)
    {
        city.innerHTML = `<h1 class="mb-3">${cityName}</h1>`;
        day[i].innerHTML = getDayName(dataArray[i].date);
        date[i].innerHTML = new Date(dataArray[i].date).getDate() + " " + months[new Date(dataArray[i].date).getMonth()] ; 
        // console.log (new Date(dataArray[i].date).getDate())
        // console.log (months[new Date(dataArray[i].date).getMonth()] ) 
         maxTemp[i].innerHTML =  `<h2>${dataArray[i].day.maxtemp_c}<sup>o</sup>C</h2> ` ;
         minTemp[i].innerHTML = ` <h5>${dataArray[i].day.mintemp_c} <sup>o</sup>C</h5> ` ;
         conditionText[i].innerHTML = `<span>${dataArray[i].day.condition.text}</span>`;
         icon[i].src ="https:" + dataArray[i].day.condition.icon;
        humidity[i].innerHTML =  dataArray[i].day.avghumidity + " %";
        windSpeed[i].innerHTML =  dataArray[i].day.avgvis_km + " km/hr";
        windDirection[i].innerHTML = dataArray[i].hour[new Date ().getHours()].wind_dir;
        
        //console.log (dataArray[i].hour[new Date ().getHours()].wind_dir);

    }
    
}

function getDayName(dateString) 
{
    let days = [
      "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
    let d = new Date(dateString);
    // console.log(dateString)
    return days[d.getDay()];
}

getCity("cairo");
searchTnp.addEventListener("keyup" ,function()
    {
        getCity(searchTnp.value);
        // console.log(searchTnp.value);
    });


  






  




