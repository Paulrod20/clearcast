import type { WeatherData } from "../types/types";

type WeatherCardProps = {
    data: WeatherData;
}

export default function WeatherCard(props: WeatherCardProps) {
    const { data } = props;

    return (
        <div className="card shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h2 className="mb-0">{data.city}, {data.country}</h2>
                    <p className="text-muted text-capitalize mb-0">{data.description}</p>
                </div>
                <img
                    src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                    alt={data.description}
                />
            </div>
            <div className="display-4 fw-bold mb-3">
                {data.temperature}°F
            </div>
            <div className="d-flex gap-4 text-muted">
                <span>Feels like {data.feelsLike}°F</span>
                <span>Humidity: {data.humidity}%</span>
                <span>Wind: {data.windSpeed} mph</span>
            </div>
        </div>
    )
}