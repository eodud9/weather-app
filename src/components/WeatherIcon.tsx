import type { WeatherMain } from "../types/weather";
import { getWeatherIcon } from "../util/weather";

export default function WeatherIcon({ weatherMain, size }: { weatherMain: WeatherMain; size?: number }) {
  return <>{getWeatherIcon(weatherMain, size)}</>;
}
