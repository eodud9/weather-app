import type { Weather5Days } from "../types/weather";
import { formatTemp } from "../util/weather";
import WeatherIcon from "./WeatherIcon";

export default function HourlyWeather({ weather5Days }: { weather5Days: Weather5Days }) {
  return (
    <div className="flex flex-col justify-start bg-stone-200/70 text-stone-950 rounded-2xl p-5 w-full">
      <span className="font-bold px-3 py-2 mb-3">시간별 기온</span>
      <ul className="flex max-w-xs sm:max-w-lg md:max-w-3xl overflow-x-scroll gap-6 no-scrollbar">
        {weather5Days.list.map((w) => (
          <li key={w.dt_txt} className="shrink-0 flex flex-col items-center">
            <span>{w.dt_txt.slice(11, 16)}</span>
            <WeatherIcon weatherMain={w.weather[0].main} />
            <span>{formatTemp(w.main.temp)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
