export default function WeatherIcon({ icon }: { icon: string }) {
  return <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" className="w-30 h-30" />;
}
