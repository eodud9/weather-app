import type { Coords, Weather } from "../types/weather";

const API_KEY = "c9c9a3abed7b34ddca2b32459abb0c62";

export async function getWeather(lat: number, long: number): Promise<Weather> {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`);

  if (!res.ok) {
    throw new Error("Something went wrong! Failed to fetch weather data.");
  }
  return res.json();
}

export async function getCoords(cityName: string): Promise<Coords[]> {
  const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`);

  if (!res.ok) {
    throw new Error("Failed to fetch coords data.");
  }

  return res.json();
}
