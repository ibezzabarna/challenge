function showWeather(response) {
  let h3 = document.querySelector("h3");
  let temperature = Math.round(response.data.main.temp);
  h3.innerHTML = temperature;
  let description = response.data.weather[0].description;
  let p = document.querySelector("#description");
  p.innerHTML = description;

}


function formatDate(dateObj) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = dateObj.getDay();
  let hour = dateObj.getHours();
  let minute = dateObj.getMinutes();

  if (minute < 10) {
    minute = "0" + minute;
  }

  return `${days[day]} ${hour}:${minute}`;
}
let h2 = document.querySelector("#date");
h2.innerHTML = formatDate(new Date());

function updateWeatherReport(event) {
  event.preventDefault();
  
  //update city name
  let cityInput = document.querySelector("#city");
  let cityName = cityInput.value;
  document.querySelector("#current-city").innerHTML = cityName;

  //update weather
  let apiKey = "7088414aa37808a4d53d7a27451c98c2";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}
let searchbox = document.querySelector("#search");
searchbox.addEventListener("submit", updateWeatherReport);



function retrievePosition(position) {
  navigator.geolocation.getCurrentPosition(function(geo){
    let apiKey = "7088414aa37808a4d53d7a27451c98c2";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${geo.coords.latitude}&lon=${geo.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(url).then(function(response){
      showWeather(response);
      document.querySelector("#current-city").innerHTML = response.data.name;
    
    })

  })
  
}
let button = document.querySelector("#location");
button.addEventListener("click", retrievePosition);

