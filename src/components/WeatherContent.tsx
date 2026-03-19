import type { Weather } from "../types/weather";
import { formmatTemp } from "../util/weather";
import WeatherIcon from "./WeatherIcon";
import { WiDayCloudy } from "react-icons/wi";

interface WeatherContentProps {
  weather: Weather;
}

// 인터페이스를 만들어서 타입 지정하는 것과 바로 타입 붙여주는것의 차이?

export default function WeatherContent({ weather }: WeatherContentProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <div>
        <span className="font-bold text-5xl">{formmatTemp(weather.main.temp)}</span>
        <p className="font-semibold text-2xl mt-2">{weather.weather[0].description}</p>
      </div>
      <div className="flex items-center">
        <WeatherIcon weatherMain={weather.weather[0].main} />
        <div className="flex flex-col font-semibold text-lg">
          <span>체감온도: {formmatTemp(weather.main.feels_like)}</span>
          <span>습도: {weather.main.humidity}%</span>
        </div>
      </div>
    </div>
  );
}
