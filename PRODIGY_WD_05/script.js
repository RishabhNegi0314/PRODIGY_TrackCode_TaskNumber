const apiKey = '41c6fee3a251230da086f7f740783b11'; 

function displayWeather(data) {
  document.getElementById("locationName").innerText = data.name + ", " + data.sys.country;
  document.getElementById("description").innerText = data.weather[0].description;
  document.getElementById("temp").innerText = (data.main.temp - 273.15).toFixed(2); // Convert from Kelvin to Celsius
  document.getElementById("humidity").innerText = data.main.humidity;
  document.getElementById("wind").innerText = (data.wind.speed * 3.6).toFixed(1); // m/s to km/h

  document.getElementById("weatherInfo").classList.remove("hidden");
}

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        alert("City not found!");
      }
    })
    .catch(error => {
      console.error("Error fetching weather:", error);
      alert("Error fetching data.");
    });
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
          console.error("Error fetching location weather:", error);
          alert("Unable to fetch location weather.");
        });
    },
    () => {
      alert("Unable to retrieve your location.");
    }
  );
}
