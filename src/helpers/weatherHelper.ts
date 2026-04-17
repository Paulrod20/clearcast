import type { WeatherData, GeoLocation } from '../types/types';
import { setFailureReason } from './failureHelper';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
    const response = await fetch(
        `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
    )

    if (!response.ok) {
        setFailureReason("Unable to fetch weather")
        throw new Error("Unable to fetch weather")
    }

    setFailureReason(undefined)

    const data = await response.json()

    return {
        city: data.name,
        state: "",
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        condition: data.weather[0].main
    }
}

export const getConditionClass = (condition: string): string => {
    switch (condition) {
        case "Clear":
            return "clear";
        case "Clouds":
            return "clouds";
        case "Rain":
        case "Drizzle":
            return "rain";
        case "Thunderstorm":
            return "thunderstorm";
        case "Snow":
            return "snow";
        case "Mist":
        case "Fog":
        case "Haze":
            return "mist";
        default:
            return "default";
    }
}

export const fetchGeoSuggestions = async (query: string): Promise<GeoLocation[]> => { 
    

    if (query.trim().length < 2) return []

    const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
    )

    if (!response.ok) return []

    const data = await response.json()

    return data.map((item: GeoLocation) => ({
        name: item.name,
        state: item.state ?? "",
        country: item.country,
        lat: item.lat,
        lon: item.lon
    }))
}