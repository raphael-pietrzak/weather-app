import React from 'react';
import { Cloud, CloudRain, Sun, Thermometer } from 'lucide-react';

interface WeatherCardProps {
  temperature: number;
  condition: string
  location: string;
  humidity: number;
  windSpeed: number;
}

const WeatherIcon = ({ condition }: { condition: string }) => {
  switch (condition) {
    case 'sun':
      return <Sun className="w-16 h-16 text-yellow-400" />;
    case 'clouds':
      return <Cloud className="w-16 h-16 text-gray-400" />;
    case 'rain':
      return <CloudRain className="w-16 h-16 text-blue-400" />;
    default:
      return <Sun className="w-16 h-16 text-yellow-400" />;
  }
};

export const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  condition,
  location,
  humidity,
  windSpeed,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md mx-auto backdrop-blur-lg bg-opacity-90">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold text-gray-800">{location}</h2>
          <p className="text-gray-500 mt-1">Today's Weather</p>
        </div>
        <WeatherIcon condition={condition} />
      </div>

      <div className="flex items-center justify-center my-8">
        <Thermometer className="w-8 h-8 text-red-500 mr-2" />
        <span className="text-6xl font-bold text-gray-800">{temperature}°</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-gray-500">Humidity</p>
          <p className="text-2xl font-semibold text-gray-800">{humidity}%</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-gray-500">Wind Speed</p>
          <p className="text-2xl font-semibold text-gray-800">{windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
};