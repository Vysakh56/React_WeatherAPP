import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!location) return;

    const apiKey = '8ac5c4d57ba6a4b3dfcf622700447b1e'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
      setError(null);
    } catch (err) {
      console.error(err); // Log the error for debugging
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Location not found');
      } else {
        setError('An error occurred');
      }
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <h1 className="app-title">Weather App</h1>
      <div className="search">
        <input
          type="text"
          className="search-input"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      {error && <div className="error">{error}</div>}
      {weather && (
        <div className="weather-info">
          <h2 className="weather-title">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="weather-description">{weather.weather[0].description}</p>
          <p className="weather-temp">{Math.round(weather.main.temp)}°C</p>
          <p className="weather-humidity">Humidity: {weather.main.humidity}%</p>
          <p className="weather-wind">Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
