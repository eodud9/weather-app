export interface Weather {
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  weather: [
    {
      description: string;
      icon: string;
      id: number;
      main: string;
    },
  ];
}

export interface Coords {
  lat: number;
  lon: number;
}
