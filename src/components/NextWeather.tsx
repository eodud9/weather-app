import { formmatTemp, groupByDate } from "../util/weather";

import { type Weather5Days } from "../types/weather";
import WeatherIcon from "./WeatherIcon";

interface NextWeatherProps {
  weather5Days: Weather5Days;
}

export default function NextWeather({ weather5Days }: NextWeatherProps) {
  const grouped = groupByDate(weather5Days.list);
  const dates = Object.keys(grouped);

  return (
    <div className="flex flex-col justify-center gap-8 w-full mt-10 bg-stone-200/20 rounded-2xl p-2">
      {/* <h1 className="font-semibold text-lg">시간별 예보</h1>
      <ul className="flex justify-between">
        {weather5Days.list.slice(0, 6).map((weather) => (
          <li key={weather.dt_txt} className="flex flex-col justify-center items-center p-2 font-bold">
            <WeatherIcon weatherMain={weather.weather[0].main} />
            {formmatTemp(weather.main.temp)}
            <span>{weather.dt_txt.slice(11, 16)}</span>
          </li>
        ))}
      </ul> */}
      <div className="flex flex-col">
        {dates.map((date) => (
          <div className="flex flex-col">
            <h1>{date}</h1>
            <ul className="flex justify-between">
              {grouped[date].map((g) => (
                <li>
                  <div className="flex flex-col items-center">
                    <WeatherIcon weatherMain={g.weather[0].main} />
                    <span>{formmatTemp(g.main.temp)}</span>
                    <span>{g.dt_txt.slice(11, 16)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
