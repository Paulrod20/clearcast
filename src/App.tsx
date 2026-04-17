import { useState } from "react";
import type { WeatherData } from "./types/types";
import { setFailureReason } from "./helpers/failureHelper";
import { fetchWeather } from "./helpers/weatherHelper";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

export default function App() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setFailureReason(undefined);

    try {
        const data = await fetchWeather(city);
        setWeather(data);
    } catch (error) { 
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        setError(message);
        setFailureReason(message);
        setWeather(null);
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="mb-4">
        <h1 className="fw-bold">Clearcast</h1>
        <p className="text-muted">Current weather for any city</p>
      </div>
      <SearchBar
        value={city}
        onChange={setCity}
        onSearch={handleSearch}
      />
      {loading && (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}
      {error && (
        <div className="alert alert-danger mt-4" role="alert">
          {error}
        </div>
      )}
      {weather && !loading && (
        <WeatherCard data={weather} />
      )}
    </div>
  );
}