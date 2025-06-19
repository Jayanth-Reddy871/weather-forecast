import React from 'react';

const WeatherCard = ({ data }) => {
  const date = new Date(data.dt_txt).toLocaleDateString();
  const time = new Date(data.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="card">
      <h4>{date} - {time}</h4>
      <p>{data.weather[0].description}</p>
      <p>🌡 Temp: {data.main.temp}°C</p>
      <p>💧 Humidity: {data.main.humidity}%</p>
      <p>💨 Wind: {data.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherCard;
