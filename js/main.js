// script.js
document.addEventListener("DOMContentLoaded", () => {
    const weatherDisplay = document.querySelector("#weatherDisplay");
    const citySelect = document.querySelector("#citySelect");
  
    // City coordinates with all provided details
    const cityCoordinates = [
      { city: "Amsterdam", lat: 52.367, lon: 4.904 },
      { city: "Ankara", lat: 39.933, lon: 32.859 },
      { city: "Ã…storp", lat: 56.134, lon: 12.945 },
      { city: "Athens", lat: 37.983, lon: 23.727 },
      { city: "Belfast", lat: 54.597, lon: -5.93 },
      { city: "Barcelona", lat: 41.387, lon: 2.168 },
      { city: "Berlin", lat: 52.52, lon: 13.405 },
      { city: "Bern", lat: 46.948, lon: 7.447 },
      { city: "Bilbao", lat: 43.263, lon: -2.935 },
      { city: "Brussels", lat: 50.847, lon: 4.357 },
      { city: "Bucharest", lat: 47.497, lon: 19.04 },
      { city: "Budapest", lat: 59.329, lon: 18.068 },
      { city: "Cardiff", lat: 51.483, lon: -3.168 },
      { city: "Cologne", lat: 50.937, lon: 6.96 },
      { city: "Copenhagen", lat: 55.676, lon: 12.568 },
      { city: "Cork", lat: 51.898, lon: -8.475 },
      { city: "Dublin", lat: 53.349, lon: -6.26 },
      { city: "Edinburgh", lat: 55.953, lon: -3.188 },
      { city: "Florence", lat: 43.7696, lon: 11.255 },
      { city: "Frankfurt", lat: 50.11, lon: 8.682 },
      { city: "French Riviera", lat: 43.254, lon: 6.637 },
      { city: "Funchal", lat: 32.65, lon: -16.908 },
      { city: "Gibraltar", lat: 36.14, lon: -5.353 },
      { city: "Gothenburg", lat: 57.708, lon: 11.974 },
      { city: "Hamburg", lat: 53.548, lon: 9.987 },
      { city: "Helsinki", lat: 60.169, lon: 24.938 },
      { city: "Ibiza", lat: 39.02, lon: 1.482 },
      { city: "Kyiv", lat: 50.45, lon: 30.523 },
      { city: "Lillehammer", lat: 61.115, lon: 10.466 },
      { city: "Lisbon", lat: 38.722, lon: -9.139 },
      { city: "London", lat: 51.507, lon: -0.127 },
      { city: "Madrid", lat: 40.416, lon: -3.703 },
      { city: "Mallorca", lat: 39.695, lon: 3.017 },
      { city: "Manchester", lat: 53.48, lon: -2.242 },
      { city: "Marseille", lat: 43.296, lon: 5.369 },
      { city: "Maspalomas", lat: 27.76, lon: -15.586 },
      { city: "Milan", lat: 45.464, lon: 9.19 },
      { city: "Munich", lat: 48.135, lon: 11.582 },
      { city: "Naples", lat: 40.851, lon: 14.268 },
      { city: "OÃ±ati", lat: 43.034, lon: -2.417 },
      { city: "Oslo", lat: 59.913, lon: 10.752 },
      { city: "Paris", lat: 48.856, lon: 2.352 },
      { city: "Prague", lat: 50.075, lon: 14.437 },
      { city: "ReykjavÃ­k", lat: 64.146, lon: -21.942 },
      { city: "Riga", lat: 56.879, lon: 24.603 },
      { city: "Rome", lat: 41.902, lon: 12.496 },
      { city: "Santa Cruz das Flores", lat: 39.453, lon: -31.127 },
      { city: "Santa Cruz de Tenerife", lat: 28.463, lon: -16.251 },
      { city: "Skye", lat: 57.273, lon: -6.215 },
      { city: "Sofia", lat: 42.697, lon: 23.321 },
      { city: "Stockholm", lat: 59.329, lon: 18.068 },
      { city: "Tallinn", lat: 59.437, lon: 24.753 },
      { city: "Vienna", lat: 18.208, lon: 16.373 },
      { city: "Warsaw", lat: 52.229, lon: 21.012 },
      { city: "York", lat: 53.961, lon: -1.07 },
      { city: "Zurich", lat: 47.376, lon: 8.541 },
    ];
  
    // Populate dropdown menu
    cityCoordinates.forEach(({ city }) => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  
    // Fetch and display weather when a city is selected
    citySelect.addEventListener("change", async (event) => {
      const selectedCity = event.target.value;
      const cityData = cityCoordinates.find(city => city.city === selectedCity);
  
      if (!cityData) {
        weatherDisplay.innerHTML = "<p>Please select a valid city.</p>";
        return;
      }
  
      const { lat, lon } = cityData;
      const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,temperature_2m_max,weathercode&timezone=auto`;
  
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Network response was not ok.");
        const data = await response.json();
  
        if (data.daily) {
          displayWeather(data.daily, selectedCity);
        } else {
          weatherDisplay.innerHTML = "<p>No weather data available. Please try again later.</p>";
        }
      } catch (error) {
        console.error("Error:", error);
        weatherDisplay.innerHTML = "<p>Error fetching weather data. Please check your connection.</p>";
      }
    });
  
    // Function to display weather data
    function displayWeather(dailyData, city) {
      weatherDisplay.innerHTML = `<h2>Weather Forecast for ${city}</h2>`;
      const weatherConditions = {
        0: "Clear",
        1: "Partly Cloudy",
        2: "Cloudy",
        3: "Fog",
        51: "Light Rain",
        53: "Moderate Rain",
        55: "Heavy Rain",
        61: "Light Snow",
        63: "Moderate Snow",
        65: "Heavy Snow",
        80: "Showers",
        95: "Thunderstorm",
      };
  
      dailyData.time.forEach((date, index) => {
        const minTemp = dailyData.temperature_2m_min[index];
        const maxTemp = dailyData.temperature_2m_max[index];
        const weatherCode = dailyData.weathercode[index];
        const weatherCondition = weatherConditions[weatherCode] || "Unknown";
  
        const weatherItem = document.createElement("div");
        weatherItem.className = "weather-item";
        weatherItem.innerHTML = `
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Min Temperature:</strong> ${minTemp}°C</p>
          <p><strong>Max Temperature:</strong> ${maxTemp}°C</p>
          <p><strong>Weather Condition:</strong> ${weatherCondition}</p>
        `;
        weatherDisplay.appendChild(weatherItem);
      });
    }
  });
  