import type { Weather } from "../types/weather";
import { formatTemp } from "../util/weather";
import WeatherIcon from "./WeatherIcon";

interface WeatherContentProps {
  weather: Weather;
}

export default function WeatherContent({ weather }: WeatherContentProps) {
  return (
    <div className="flex flex-col md:flex-row items-center w-full md:max-w-4xl min-h-80 justify-center md:justify-between p-15">
      <div className="text-center md:text-start">
        <span className="font-bold text-5xl md:text-7xl">{formatTemp(weather.main.temp)}</span>
        <p className="font-semibold text-3xl md:text-3xl mt-2">{weather.weather[0].description}</p>
      </div>
      <div className="flex flex-col md:flex-row items-center">
        <WeatherIcon weatherMain={weather.weather[0].main} size={150} />
        <div className="flex flex-col text-md font-medium shrink-0">
          <span>체감온도: {formatTemp(weather.main.feels_like)}</span>
          <span className="my-2">습도: {weather.main.humidity} %</span>
          <span>기압: {weather.main.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
}
