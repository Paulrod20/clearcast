import type { WeatherData } from "../types/types"

type WeatherCardProps = {
    data: WeatherData
}

export default function WeatherCard(props: WeatherCardProps) {
    const { data } = props

    return (
        <div className="weather-card">
            <p className="weather-city">
                {data.city}{data.state ? `, ${data.state}` : ""}, {data.country}
            </p>
            <p className="weather-description">{data.description}</p>
            <img
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                alt={data.description}
            />
            <div className="weather-temperature">{data.temperature}°F</div>
            <div className="weather-stats">
                <span>Feels like {data.feelsLike}°F</span>
                <span>Humidity {data.humidity}%</span>
                <span>Wind {data.windSpeed} mph</span>
            </div>
        </div>
    )
}
