import type { WeatherData } from '../types/types';
import { setFailureReason } from './failureHelper';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city: string): Promise<WeatherData> => { 
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=imperial`);
    
    if (!response.ok) {
        setFailureReason("City not found");
        throw new Error("City not found");
    }

    setFailureReason(undefined);

    const data = await response.json();

    return {
        city: data.name,
        state: data.sys.state ?? "",
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
