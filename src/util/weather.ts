export function formmatTemp(temp: number): string {
  return (temp - 273.15).toFixed(2) + " ℃";
}

export function getWeatherIcon() {}
