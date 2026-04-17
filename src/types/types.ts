
export type WeatherData = {
    city: string;
    state: string;
    country: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
    condition: string;
}

export type GeoLocation = {
    name: string;
    state: string;
    country: string;
    lat: number;
    lon: number;
}