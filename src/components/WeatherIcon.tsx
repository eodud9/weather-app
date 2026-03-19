import type { ReactNode } from "react";
import type { WeatherMain } from "../types/weather";
import { getWeatherIcon } from "../util/weather";

export default function WeatherIcon({ weatherMain }: { weatherMain: WeatherMain }) {
  let content: ReactNode = <></>;

  if (weatherMain) {
    content = getWeatherIcon(weatherMain);
  }

  return <>{content}</>;
}
