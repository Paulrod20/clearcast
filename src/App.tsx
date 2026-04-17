import { useState } from "react"
import type { WeatherData, GeoLocation } from "./types/types"
import { fetchWeather, getConditionClass } from "./helpers/weatherHelper"
import { setFailureReason } from "./helpers/failureHelper"
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import "./styles/weather.scss"

export default function App() {
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const conditionClass = weather ? getConditionClass(weather.condition) : "default"

    const handleSelect = async (location: GeoLocation) => {
        setLoading(true)
        setError(null)
        setFailureReason(undefined)

        try {
            const data = await fetchWeather(location.lat, location.lon)
            setWeather({ ...data, state: location.state })
        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred"
            setError(message)
            setFailureReason(message)
            setWeather(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={`weather-wrapper ${conditionClass}`}>
            <div className="app-shell">
                <header className="app-header">
                    <h1 className="app-title">Clearcast</h1>
                    <p className="app-subtitle">Current weather for any city</p>
                </header>

                <SearchBar onSelect={handleSelect} />

                {loading && (
                    <div className="app-center">
                        <div className="spinner-border text-light" role="status" />
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {weather && !loading && <WeatherCard data={weather} />}
            </div>
        </div>
    )
}