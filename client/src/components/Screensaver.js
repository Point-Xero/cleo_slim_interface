// Overlay.js
import React, { useState, useEffect } from 'react';
import './Screensaver.css';

const Screensaver = ({ onClick }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [weather, setWeather] = useState({
        temp: null,
        humidity: null,
        condition: '',
        forecast: []
    });

    const API_KEY = '44d7fda3112111e8c967f8c820187688'; // Replace with your OpenWeatherMap API key
    const LAT = '34.836288';
    const LON = '32.430920'; 

    // Fetch weather data
    useEffect(() => {
      
      const fetchWeather = async (lat, lon) => {
            try {
                const response = await fetch(
                    'https://api.openweathermap.org/data/2.5/weather?lat=34.7754&lon=32.4245&appid=44d7fda3112111e8c967f8c820187688'
                );
                const data = await response.json();

                console.log(data);

                setWeather({
                    temp: data.main.temp, // Current temperature in Kelvin
                    temp_min: data.main.temp_min, // Min temperature
                    temp_max: data.main.temp_max, // Max temperature
                    feels_like: data.main.feels_like, // Feels-like temperature
                    humidity: data.main.humidity, // Humidity
                    condition: data.weather[0].main, // General weather condition
                    description: data.weather[0].description, // Detailed description
                    wind_speed: data.wind.speed, // Wind speed
                    wind_deg: data.wind.deg, // Wind direction
                    city: data.name, // City name
                    country: data.sys.country, // Country code
                    sunrise: data.sys.sunrise, // Sunrise time (UNIX timestamp)
                    sunset: data.sys.sunset, // Sunset time (UNIX timestamp)
                });
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchWeather();
    }, [API_KEY, LAT, LON]);

    // Update time every second
    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timerId);
    }, []);

    return (
        <div className="overlay" onClick={onClick}>
            <div className="clock">
            {currentTime.toLocaleTimeString()}
        </div>
        <div className="weather">
            <p>Current Temperature: {weather.temp !== null ? `${(weather.temp - 273.15).toFixed(1)}°C` : 'Loading...'}</p>
            <p>Feels Like: {weather.feels_like !== null ? `${(weather.feels_like - 273.15).toFixed(1)}°C` : 'Loading...'}</p>
            <p>Min Temperature: {weather.temp_min !== null ? `${(weather.temp_min - 273.15).toFixed(1)}°C` : 'Loading...'}</p>
            <p>Max Temperature: {weather.temp_max !== null ? `${(weather.temp_max - 273.15).toFixed(1)}°C` : 'Loading...'}</p>
            <p>Humidity: {weather.humidity !== null ? `${weather.humidity}%` : 'Loading...'}</p>
            <p>Condition: {weather.condition || 'Loading...'}</p>
            <p>Description: {weather.description || 'Loading...'}</p>
            <p>Wind Speed: {weather.wind_speed !== null ? `${weather.wind_speed} m/s` : 'Loading...'}</p>
            <p>Wind Direction: {weather.wind_deg !== null ? `${weather.wind_deg}°` : 'Loading...'}</p>
            <p>Location: {weather.city && weather.country ? `${weather.city}, ${weather.country}` : 'Loading...'}</p>
            <p>Sunrise: {weather.sunrise ? new Date(weather.sunrise * 1000).toLocaleTimeString() : 'Loading...'}</p>
            <p>Sunset: {weather.sunset ? new Date(weather.sunset * 1000).toLocaleTimeString() : 'Loading...'}</p>
        </div>
        </div>
    );
};

export default Screensaver;


