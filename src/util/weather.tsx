import {
  WiCloud,
  WiDayHaze,
  WiDayRainMix,
  WiDaySunny,
  WiDayWindy,
  WiFog,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiTornado,
} from "react-icons/wi";
import type { Weather5Days, WeatherMain } from "../types/weather";
import type { ReactNode } from "react";

export function formmatTemp(temp: number): string {
  return (temp - 273.15).toFixed(0) + " ℃";
}

export function getWeatherIcon(weatherMain: WeatherMain): ReactNode {
  if (["Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Ash", "Squall"].includes(weatherMain)) {
    return <WiFog />;
  }
  switch (weatherMain) {
    case "Thunderstorm":
      return <WiThunderstorm size={100} />;
    case "Clear":
      return <WiDaySunny size={100} />;
    case "Clouds":
      return <WiCloud size={100} />;
    case "Rain":
      return <WiRain size={100} />;
    case "Drizzle":
      return <WiDayRainMix size={100} />;
    case "Haze":
      return <WiDayHaze size={100} />;
    case "Snow":
      return <WiSnow size={100} />;
    case "Squall":
      return <WiDayWindy />;
    case "Tornado":
      return <WiTornado size={100} />;
  }
}

export function getBgForWeatherMain(weatherMain: WeatherMain) {
  if (["Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Ash", "Squall"].includes(weatherMain)) {
    return "bg-gradient-to-br from-gray-400 via-gray-300 to-slate-400";
  }
  switch (weatherMain) {
    case "Clear":
      return "bg-gradient-to-br from-sky-400 via-blue-300 to-yellow-200";
    case "Clouds":
      return "bg-gradient-to-br from-gray-400 via-slate-300 to-gray-500";
    case "Rain":
      return "bg-gradient-to-br from-blue-900 via-blue-600 to-gray-400";
    case "Drizzle":
      return "bg-gradient-to-br from-blue-400 via-blue-300 to-slate-300";
    case "Thunderstorm":
      return "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-700";
    case "Snow":
      return "bg-gradient-to-br from-blue-100 via-white to-slate-200";
    // case "Rain":
    //   return;
    // case "Haze":
    //   return;
    // case "Squall":
    //   return;
    // case "Tornado":
    //   return;
    default:
      return "bg-gradient-to-br from-purple-900 via-purple-500 to-violet-400";
  }
}

export function groupByDate(list: Weather5Days["list"]) {
  return list.reduce(
    (acc, item) => {
      const date = item.dt_txt.slice(0, 10);
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    },
    {} as Record<string, Weather5Days["list"]>,
  );
}
