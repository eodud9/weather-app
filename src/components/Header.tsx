import type { Weather } from "../types/weather";
import Searchbar from "./Searchbar";

interface HeaderProps {
  weather: Weather;
  handleSearchCity: (cityname: string) => void;
  searchMyWeather: () => void;
}

export default function Header({ weather, handleSearchCity, searchMyWeather }: HeaderProps) {
  const nowTime = new Date();

  return (
    <header className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start w-full">
      <div className="text-center md:text-start">
        <h2 className="font-bold text-4xl md:text-6xl my-2">{weather.name.toLocaleUpperCase()}</h2>
        <span className="text-md md:text-lg">{nowTime.toLocaleString().slice(0, 21)}</span>
      </div>

      <Searchbar search={handleSearchCity} searchMine={searchMyWeather} />
    </header>
  );
}
