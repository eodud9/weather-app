import type { WeatherMain } from "../types/weather";
import { getWeatherIcon } from "../util/weather";

export default function WeatherIcon({ weatherMain, size }: { weatherMain: WeatherMain; size?: number }) {
  return <div className="shrink-0">{getWeatherIcon(weatherMain, size)}</div>;
}
