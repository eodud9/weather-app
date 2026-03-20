export interface Main {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface WeatherCondition {
  description: string;
  icon: string;
  id: number;
  main: WeatherMain;
}

export interface Weather {
  main: Main;
  name: string;
  weather: [WeatherCondition];
}

export interface Weather5Days {
  list: {
    dt_txt: string;
    main: Main;
    name: string;
    weather: [WeatherCondition];
  }[];
}

export interface Coords {
  lat: number;
  lon: number;
}

export type WeatherMain =
  | "Thunderstorm" // 뇌우
  | "Drizzle" // 이슬비
  | "Rain" // 비
  | "Snow" // 눈
  | "Mist" // 안개 (옅은)
  | "Smoke" // 연기
  | "Haze" // 실안개
  | "Dust" // 먼지
  | "Fog" // 안개 (짙은)
  | "Sand" // 모래
  | "Ash" // 화산재
  | "Squall" // 돌풍
  | "Tornado" // 토네이도
  | "Clear" // 맑음
  | "Clouds"; // 구름
