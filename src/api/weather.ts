import type { Coords, Weather, Weather5Days } from "../types/weather";

// https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY} 5day per 3hours weather

const API_KEY = "c9c9a3abed7b34ddca2b32459abb0c62";

export async function getWeather(lat: number, lon: number): Promise<Weather> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr`,
  );

  if (!res.ok) {
    throw new Error("Something went wrong! Failed to fetch weather data.");
  }
  return res.json();
}

export async function get5DayWeather(lat: number, lon: number): Promise<Weather5Days> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch 5days weather data.");
  }

  return res.json();
}

export async function getCoords(cityName: string): Promise<Coords[]> {
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}&lang=kr`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch coords data.");
  }

  return res.json();
}
