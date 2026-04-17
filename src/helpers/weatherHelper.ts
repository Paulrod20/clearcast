import type { WeatherData } from '../types/types';

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city: string): Promise<WeatherData> => { 
    const response = await fetch(`${BASE_URL}/?q=${city}&appid=${API_KEY}&units=imperial`);
    
    if (!response.ok) {
        throw new Error("City not found");
    }

    const data = await response.json();

    return {
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed),
        description: data.weather[0].description,
        icon: data.weather[0].icon
    }
}

