import { useEffect, useState } from "react";
import type { Coords, Weather, Weather5Days } from "../types/weather";
import { useQuery } from "@tanstack/react-query";
import { get5DayWeather, getCoords, getWeather } from "../api/weather";

export function useWeather() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [myCoords, setMyCoords] = useState<Coords | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const c = { lat: position.coords.latitude, lon: position.coords.longitude };
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
    try {
      const fetchCoords = await getCoords(cityName);
      if (!fetchCoords.length) {
        alert("도시를 찾을 수 없습니다!");
        return;
      }
      setCoords({ lat: fetchCoords[0].lat, lon: fetchCoords[0].lon });
    } catch (error) {
      alert("검색 중 오류가 발생했습니다!");
    }
  }
  return { weather, weatherLoading, weather5Days, weather5DaysLoading, searchMyWeather, handleSearchCity };
}
