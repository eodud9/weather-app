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

export function formatTemp(temp: number): string {
  return (temp - 273.15).toFixed(0) + " ℃";
}

export function getWeatherIcon(weatherMain: WeatherMain, size = 50): ReactNode {
  if (["Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Ash", "Squall"].includes(weatherMain)) {
    return <WiFog size={size} />;
  }
  switch (weatherMain) {
    case "Thunderstorm":
      return <WiThunderstorm size={size} />;
    case "Clear":
      return <WiDaySunny size={size} />;
    case "Clouds":
      return <WiCloud size={size} />;
    case "Rain":
      return <WiRain size={size} />;
    case "Drizzle":
      return <WiDayRainMix size={size} />;
    case "Haze":
      return <WiDayHaze size={size} />;
    case "Snow":
      return <WiSnow size={size} />;
    case "Squall":
      return <WiDayWindy size={size} />;
    case "Tornado":
      return <WiTornado size={size} />;
  }
}

export function getBgForWeatherMain(weatherMain: WeatherMain) {
  if (["Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Ash", "Squall"].includes(weatherMain)) {
    return "/src/assets/Foggy.jpg";
  }
  switch (weatherMain) {
    case "Clear":
      return "/src/assets/Sunny2.jpg";
    case "Clouds":
      return "/src/assets/Clouds.jpg";
    case "Rain":
      return "/src/assets/Rain.jpg";
    case "Drizzle":
      return "/src/assets/Rain.jpg";
    case "Thunderstorm":
      return "/src/assets/ThunderStorm.jpg";
    case "Snow":
      return "/src/assets/Snow.jpg";
    case "Haze":
      return "/src/assets/Haze.jpg";
    case "Tornado":
      return "/src/assets/Tornado.jpg";
    default:
      return "/src/assets/Sunny2.jpg";
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
