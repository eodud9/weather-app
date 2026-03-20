import { formatTemp, groupByDate } from "../util/weather";

import { type Weather5Days } from "../types/weather";
import WeatherIcon from "./WeatherIcon";
import Modal from "./Modal";
import { useState } from "react";

interface NextWeatherProps {
  weather5Days: Weather5Days;
}

export default function NextWeather({ weather5Days }: NextWeatherProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const grouped = groupByDate(weather5Days.list);
  const dates = Object.keys(grouped);

  function closeModal() {
    setSelectedDate("");
  }

  return (
    <div className="flex gap-5 mt-10">
      {selectedDate && (
        <Modal onClose={closeModal}>
          <div className="flex flex-col text-center">
            <div className="flex justify-between items-center mb-10">
              <h1 className="font-bold text-xl">{selectedDate}</h1>
              <button
                className="cursor-pointer bg-stone-300 px-4 py-2 rounded hover:bg-stone-300/80 text-stone-800 transition-all"
                onClick={closeModal}
              >
                닫기
              </button>
            </div>
            <ul className="flex justify-center justify-items-center gap-10 overflow-x-scroll no-scrollbar">
              {grouped[selectedDate].map((g) => (
                <li key={g.dt_txt} className="flex flex-col items-center shrink-0">
                  <span>{g.dt_txt.slice(11, 16)}</span>
                  <WeatherIcon weatherMain={g.weather[0].main} />
                  <span>최고: {formatTemp(g.main.temp_max)}</span>
                  <span>최저: {formatTemp(g.main.temp_min)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      )}
      {dates.map((date) => {
        const maxTemp = Math.max(...grouped[date].map((d) => d.main.temp_max));
        const minTemp = Math.min(...grouped[date].map((d) => d.main.temp_min));
        const maxTempWeather = grouped[date].find((d) => d.main.temp_max === maxTemp)!.weather;

        return (
          <div
            key={date}
            className="flex flex-col justify-between items-center bg-stone-200/70 text-stone-950 rounded-2xl p-5 hover:bg-stone-200/60 transition-all cursor-pointer"
            onClick={() => setSelectedDate(date)}
          >
            <span className="font-semibold">{date.slice(5).replace("-", " / ")}</span>
            <WeatherIcon weatherMain={maxTempWeather[0].main} />
            <span>최저: {formatTemp(minTemp)}</span>
            <span>최고: {formatTemp(maxTemp)}</span>
          </div>
        );
      })}
    </div>
  );
}
