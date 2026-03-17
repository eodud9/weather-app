import { formmatTemp } from "../util/weather";

import { type Weather5Days } from "../types/weather";
import WeatherIcon from "./WeatherIcon";

interface NextWeatherProps {
  weather5Days: Weather5Days;
}

export default function NextWeather({ weather5Days }: NextWeatherProps) {
  return (
    <div className="flex flex-col justify-center gap-8 w-full mt-10 bg-stone-200/20 rounded-2xl p-2">
      <h1 className="font-semibold text-lg">시간별 예보</h1>
      <ul className="flex justify-between">
        {weather5Days.list.slice(0, 6).map((weather) => (
          <li key={weather.dt_txt} className="flex flex-col justify-center items-center p-2 font-bold">
            <WeatherIcon icon={weather.weather[0].icon} />
            {formmatTemp(weather.main.temp)}
            <span>{weather.dt_txt.slice(11, 16)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
