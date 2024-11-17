import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { WeatherCard } from './components/WeatherCard';
import axios from 'axios';
import { useEffect } from 'react';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

type WeatherData = {
  temperature: number;
  condition: string;
  location: string;
  humidity: number;
  windSpeed: number;
};

type ForecastData = {
  temperature: number;
  condition: string;
};



const App: React.FC = () => {
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState('Paris');
  const [weatherData, setWeatherData] = useState<WeatherData | {temperature: number, condition: string, location: string, humidity: number, windSpeed: number}>({
    temperature: 0,
    condition: '',
    location: '',
    humidity: 0,
    windSpeed: 0,
  });
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(TODAY_API_URL);

      const data = response.data;

      const formattedWeatherData: WeatherData = {
        temperature: data.main.temp,
        condition: data.weather[0].main.toLowerCase(),
        location: `${data.name}, ${data.sys.country}`,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };

      setWeatherData(formattedWeatherData);

      const forecastResponse = await axios.get(FORECAST_API_URL);

      const forecastDataList = forecastResponse.data.list.map((item: any) => ({
        temperature: item.main.temp,
        condition: item.weather[0].main.toLowerCase(),
      }));

      setForecastData(forecastDataList.slice(1, 4));

    } catch (error) {
      console.error(error);
    }
  };


  const handleSearch = async () => {
    if (city.trim() === "") return; 
    console.log(`Recherche de la ville : ${city}`);
    setSearchCity(city);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(); 
    }
  };


  // Votre clé API OpenWeatherMap
  const TODAY_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric&lang=fr`;
  const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=metric&lang=fr&appid=${API_KEY}`;

  useEffect(() => {

    fetchWeather();
    console.log(weatherData);
  }, [TODAY_API_URL]);



  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-6"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1562155955-1cb2d73488d7?auto=format&fit=crop&q=80&w=2000')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              onKeyDown={handleKeyDown}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search for a city..."
              className="w-full px-6 py-4 rounded-full bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-white border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 pr-12"
            />
            <Search 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5 cursor-pointer"
              onClick={handleSearch}
            />
          </div>
        </div>

        <div className="flex items-center justify-center mb-8">
          <MapPin className="text-white mr-2" />
          <span className="text-white">Current Location</span>
        </div>

        <WeatherCard {...weatherData} />

        <div className="mt-8 grid grid-cols-3 gap-4">
          {
            forecastData.map((data, index) => (
            <div key={index} className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-4 text-white text-center">
              <p className="text-sm">{index === 0 ? 'Tomorrow' : `Day ${index + 1}`}</p>
              <div className="my-2">
                <span className="text-2xl font-bold">{Math.round(data.temperature)}°</span>
              </div>
              <p className="text-sm text-gray-200">{data.condition}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;