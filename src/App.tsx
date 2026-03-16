//구현 기능: 현재 위치 기반 현재 날씨 정보 제공, 앞으로 일주일 간의 날씨 정보, 다른 지역 검색 기능
import { useQuery } from "@tanstack/react-query";
import { type Coords, type Weather } from "./types/weather";
import { getCoords, getWeather } from "./api/weather";
import { useEffect, useRef, useState, type FormEvent } from "react";

function App() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const searchInput = useRef<HTMLInputElement>(null); // 왜 null을 넣어야 하는지?

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((postion) => {
      setCoords({ lat: postion.coords.latitude, lon: postion.coords.longitude });
    });
  }, []);

  const { data: weather } = useQuery<Weather>({
    queryKey: ["weather", coords],
    queryFn: () => getWeather(coords!.lat, coords!.lon),
    enabled: !!coords,
  });

  // search 함수 사용 위치, 인터페이스 설정한대로만 값을 불러올 수 있는지

  async function handleSearchCity(cityName: string) {
    const fetchCoords = await getCoords(cityName);

    setCoords({ lat: fetchCoords[0].lat, lon: fetchCoords[0].lon });
  }

  return (
    <div>
      {weather && (
        <div>
          <span>나의 위치</span>
          <p>{weather.name}</p>
          <span>{(weather.main.temp - 273.15).toFixed(2)} ℃</span>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
          <p>{weather.weather[0].main}</p>
          <form
            action=""
            onSubmit={(event: FormEvent) => {
              event.preventDefault();
              const cityName = searchInput.current?.value.trim() || "";
              if (!cityName) return;
              handleSearchCity(cityName);
            }}
          >
            <input type="text" ref={searchInput} />
            <button>Search</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
