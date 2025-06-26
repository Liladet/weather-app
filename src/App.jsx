import React, { useState } from "react";
import { WiDaySunny } from "react-icons/wi";


const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setError(data.message || "City not found");
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-tr from-blue-500 via-sky-400 to-cyan-300">
      <div className="bg-white/30 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-md border border-white/20">
        <h1 className="text-3xl font-extrabold text-center text-white mb-6 drop-shadow">
          🌤️ Weather Now
        </h1>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-white/50 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white shadow"
          />
          <button
            onClick={fetchWeather}
            className="bg-white text-blue-600 font-bold px-5 py-3 rounded-xl hover:bg-gray-100 transition shadow"
          >
            Search
          </button>
        </div>

        {loading && (
          <p className="text-center text-white font-medium animate-pulse">
            Loading...
          </p>
        )}

        {error && (
          <p className="text-center text-red-100 bg-red-500/30 rounded-md py-2">
            {error}
          </p>
        )}

        {weather && (
          <div className="text-center mt-6 text-white">
            <h2 className="text-2xl font-bold drop-shadow">
              {weather.name}, {weather.sys?.country}
            </h2>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`}
              alt="icon"
              className="mx-auto my-2"
            />
            <p className="text-4xl font-extrabold drop-shadow">
              {weather.main?.temp}°C
            </p>
            <p className="capitalize text-lg text-white/90">
              {weather.weather?.[0]?.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
