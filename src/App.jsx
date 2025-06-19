import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';

const API_KEY = "YOUR_API_KEY"; // Replace this with your OpenWeatherMap API Key

const App = () => {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [locationAllowed, setLocationAllowed] = useState(false);

  const fetchWeather = async (query) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.list) {
        setForecast(data.list.filter((_, index) => index % 8 === 0));
      }
    } catch (error) {
      alert("Could not fetch weather data. Check city name or API key.");
    }
  };

  const fetchByCoordinates = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.list) {
        setForecast(data.list.filter((_, index) => index % 8 === 0));
      }
    } catch (error) {
      alert("Failed to get location-based weather.");
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationAllowed(true);
        fetchByCoordinates(pos.coords.latitude, pos.coords.longitude);
      },
      () => setLocationAllowed(false)
    );
  }, []);

  return (
    <div className="container">
      <h1>🌤 Weather Forecast</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => fetchWeather(city)}>Search</button>
      </div>
      <div className="weather">
        {forecast.map((item, index) => (
          <WeatherCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default App;
