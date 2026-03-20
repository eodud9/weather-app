import NextWeather from "./components/NextWeather";
import Header from "./components/Header";
import WeatherContent from "./components/WeatherContent";
import { getBgForWeatherMain } from "./util/weather";
import HourlyWeather from "./components/HourlyWeather";
import { useWeather } from "./hooks/useWeather";

function App() {
  const { weather, weather5Days, weatherLoading, weather5DaysLoading, handleSearchCity, searchMyWeather } =
    useWeather();

  let content: React.ReactNode;

  let bgImg = "";

  if (weather) {
    bgImg = getBgForWeatherMain(weather.weather[0].main);
  }

  if (weatherLoading || weather5DaysLoading) content = <p className="font-bold text-4xl text-stone-900">Loading...</p>;

  if (weather && weather5Days) {
    content = (
      <>
        <Header weather={weather} handleSearchCity={handleSearchCity} searchMyWeather={searchMyWeather} />
        <WeatherContent weather={weather} />
        <HourlyWeather weather5Days={weather5Days} />
        <NextWeather weather5Days={weather5Days} />
      </>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen flex items-center justify-center text-white p-10"
    >
      <main className="relative z-10 flex flex-col items-center justify-center p-15 rounded-4xl min-w-md sm:min-w-xl md:min-w-2xl  min-h-5/6 shadow-custom">
        {content}
      </main>
    </div>
  );
}

export default App;
