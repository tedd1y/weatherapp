// Icons
import { IoMdRemove } from "react-icons/io";
import { IoWater, IoWaterOutline } from "react-icons/io5";
import { FiSunrise, FiSunset, FiWind } from "react-icons/fi";

import React from "react";
import 'bulma/css/bulma.min.css';
import { flag, name } from 'country-emoji';

type WeatherData = {
    id: any;
    city: string;
    country: string;
    temp: number;
    feels_like: number;
    humidity: number,
    rain: number;
    snow: number;
    windspeed: number,
    pressure: number,
    sunrise: number,
    sunset: number,
    units: string,
};

type Props = {
    forecasts: WeatherData[];
    setForecasts: React.Dispatch<React.SetStateAction<WeatherData[]>>;
    layout: string;
}

const Weathergrid: React.FC<Props> = ({ forecasts, setForecasts, layout }) => {
    const getTime = (timestamp: number): string => {
        const date = new Date(1000 * timestamp);
        const time = date.toTimeString();
        return time.substring(0, 8);
    };

    const removeForecast = (index: number) => {
        const updateForecasts = forecasts
            .filter((_, i) => i !== index);
        setForecasts(updateForecasts);
    }

    const renderTemperatureIcon = (forecast: WeatherData) => {
        if (forecast.units === 'metric') {
            if (forecast.temp > 4) {
                return "☀️";
            } else {
                return "❄️";
            }
        } else if (forecast.units === 'imperial') {
            if (forecast.temp > 39.2) {
                return "☀️";
            } else {
                return "❄️";
            }
        }
    };

    return (
        <div className="container">

            {forecasts.length === 0 ? (
                <div className="box">
                <p className="subtitle is-6">No forecasts added. Enter city to get current weather!</p>
                </div>
            ) : (
                <div className={`${layout === "grid" ? "fixed-grid has-2-cols has-1-cols-mobile has-3-cols-desktop" 
                    : ""}`}>
                    <div className={`${layout === "grid" ? "grid" : ""}`}>
                        {forecasts.map((forecast, index) =>
                                <div className="box" key={forecast.id}>

                                    <div className="columns is-multiline">

                                        <div className="column is-full is-flex is-align-items-center is-justify-content-space-between">
                                            <div className={layout === "list" ? "is-flex is-align-items-center" : ""}>
                                                <p className={`title is-3 ${layout === "list" ? "mb-0" : ""}`}>{forecast.city}</p>
                                                <p className={`subtitle is-6 ${layout === "list" ? "ml-2 mt-3" : ""}`}>
                                                    {flag(forecast.country)} {name(forecast.country)}
                                                </p>
                                            </div>
                                            <button
                                                className="button is-danger p-0"
                                                style={{height: 35, width: 35}}
                                                onClick={() => removeForecast(index)}
                                            >
                                                <IoMdRemove/>
                                            </button>
                                        </div>

                                        <div className={`${layout === "grid" ? "column is-half has-text-centered" : "column is-one-quarter"} is-flex is-flex-direction-column is-align-items-stretch`}>
                                            <div className="box is-flex-grow-1">
                                                <strong>Temperature: </strong>
                                                <br/>
                                                <p>
                                                    {renderTemperatureIcon(forecast)} {forecast.temp} °{forecast.units === "metric" ? "C" : "F"}
                                                </p>

                                                <strong>Feels like:</strong>
                                                <br/>
                                                <p>
                                                    {renderTemperatureIcon(forecast)} {forecast.feels_like} °{forecast.units === "metric" ? "C" : "F"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className={`${layout === "grid" ? "column is-half has-text-centered" : "column is-one-quarter"} is-flex is-flex-direction-column is-align-items-stretch`}>
                                            <div className="box is-flex-grow-1">
                                                <strong>Humidity: </strong>
                                                <br/>
                                                <p>{forecast.humidity > 50 ? <IoWater /> : <IoWaterOutline />} {forecast.humidity} %</p>

                                                <strong>Rain:</strong>
                                                <br/>
                                                <p>{forecast.rain} mm/h</p>
                                            </div>
                                        </div>

                                        <div className={`${layout === "grid" ? "column is-half has-text-centered" : "column is-one-quarter"} is-flex is-flex-direction-column is-align-items-stretch`}>

                                            <div className="box">
                                                <strong>Wind Speed: </strong>
                                                <br/>
                                                <p>
                                                   <FiWind /> {forecast.windspeed} {forecast.units === "metric" ? "meter/sec" : "miles/hour"}
                                                </p>

                                                <strong>Pressure: </strong>
                                                <br/>
                                                <p>{forecast.pressure} hPa</p>

                                            </div>

                                        </div>

                                        <div className={`${layout === "grid" ? "column is-half has-text-centered" : "column is-one-quarter"} is-flex is-flex-direction-column is-align-items-stretch`}>

                                            <div className="box">
                                                <strong>Sunrise: </strong>
                                                <br/>
                                                <p><FiSunrise /> {getTime(forecast.sunrise)}</p>

                                                <strong>Sunset: </strong>
                                                <br/>
                                                <p><FiSunset /> {getTime(forecast.sunset)}</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Weathergrid;