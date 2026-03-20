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
    <header className="flex justify-between items-start w-full">
      <div>
        <h2 className="font-bold text-5xl mb-2">{weather.name.toLocaleUpperCase()}</h2>
        <span>{nowTime.toLocaleString().slice(0, 20)}</span>
      </div>

      <Searchbar search={handleSearchCity} searchMine={searchMyWeather} />
    </header>
  );
}
