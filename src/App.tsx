//구현 기능: 현재 위치 기반 현재 날씨 정보 제공, 앞으로 일주일 간의 날씨 정보, 다른 지역 검색 기능
//설계가 필요함을 느낌. 주먹구구식으로는 진행 정도 파악, 완료 작업 확인이 어려움
//날씨에 따른 아이콘, 배경 변경

import { useQuery } from "@tanstack/react-query";
import { type Coords, type Weather, type Weather5Days } from "./types/weather";
import { get5DayWeather, getCoords, getWeather } from "./api/weather";
import { useEffect, useState } from "react";
import NextWeather from "./components/NextWeather";
import Header from "./components/Header";
import WeatherContent from "./components/WeatherContent";
import { getBgForWeatherMain } from "./util/weather";

function App() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [myCoords, setMyCoords] = useState<Coords | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((postion) => {
      const c = { lat: postion.coords.latitude, lon: postion.coords.longitude };
      setCoords(c);
      setMyCoords(c);
    });
  }, []);

  function searchMyWeather() {
    setCoords(myCoords);
  }

  const { data: weather, isLoading: weatherLoading } = useQuery<Weather>({
    queryKey: ["weather", coords],
    queryFn: () => getWeather(coords!.lat, coords!.lon),
    enabled: !!coords,
  });

  const { data: weather5Days, isLoading: weather5DaysLoading } = useQuery<Weather5Days>({
    queryKey: ["weather5Days", coords],
    queryFn: () => get5DayWeather(coords!.lat, coords!.lon),
    enabled: !!coords,
  });

  async function handleSearchCity(cityName: string) {
    const fetchCoords = await getCoords(cityName);
    if (!fetchCoords.length) return;
    setCoords({ lat: fetchCoords[0].lat, lon: fetchCoords[0].lon });
  }

  let content: React.ReactNode;

  let bgGradient = "bg-linear-to-br from-sky-400 via-blue-300 to-yellow-200";

  if (weather) {
    bgGradient = getBgForWeatherMain(weather.weather[0].main);
  }

  if (weatherLoading || weather5DaysLoading) content = <p className="font-bold text-2xl">Loading...</p>;

  if (weather && weather5Days) {
    content = (
      <>
        <Header weather={weather} handleSearchCity={handleSearchCity} searchMyWeather={searchMyWeather} />
        <WeatherContent weather={weather} />
        <NextWeather weather5Days={weather5Days} />
      </>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <main
        className={`flex flex-col items-center justify-center py-10 px-10 rounded-4xl min-w-5xl min-h-5/6 shadow-2xl ${bgGradient}`}
      >
        {content}
      </main>
    </div>
  );
}

export default App;
