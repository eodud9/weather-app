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
import Sunny from "../assets/sunny2.jpg";
import Clouds from "../assets/clouds.jpg";
import Rain from "../assets/rain.jpg";
import Foggy from "../assets/foggy.jpg";
import Haze from "../assets/haze.jpg";
import Snow from "../assets/snow.jpg";
import ThunderStorm from "../assets/thunderstorm.jpg";
import Tornado from "../assets/tornado.jpg";

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
    return Foggy;
  }
  switch (weatherMain) {
    case "Clear":
      return Sunny;
    case "Clouds":
      return Clouds;
    case "Rain":
      return Rain;
    case "Drizzle":
      return Rain;
    case "Thunderstorm":
      return ThunderStorm;
    case "Snow":
      return Snow;
    case "Haze":
      return Haze;
    case "Tornado":
      return Tornado;
    default:
      return Sunny;
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
