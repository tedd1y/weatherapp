import React, {useState} from "react";
import 'bulma/css/bulma.min.css';
import { IoMdRemove } from "react-icons/io";
import { IoWater } from "react-icons/io5";
import { TbTemperatureSnow, TbTemperatureSun} from "react-icons/tb";
import { flag, name } from 'country-emoji';
import {RiAddLargeFill} from "react-icons/ri";
import axios from "axios";

type WeatherData = {
    city: string;
    country: string;
    temp: number;
    humidity: number,
    windspeed: number,
    pressure: number,
    sunrise: number,
    sunset: number,
    units: string;
};

interface WeathergridProps {
    forecasts: WeatherData[];
    setForecasts: React.Dispatch<React.SetStateAction<WeatherData[]>>;
}

const Weathergrid: React.FC<WeathergridProps> = ({ forecasts, setForecasts }) => {
    const [city, setCity] = useState('');
    const [units, setUnits] = useState('metric');
    const [errorMessage, setErrorMessage] = useState("");
    const maxSize = 10;

    const getWeather = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=38ac577a02d6d3ae82b169adb831d76b`)
            .then(res => {
                console.log(res);

                const weatherData: WeatherData = {
                    city: res.data.name,
                    country: res.data.sys.country,
                    temp: res.data.main.temp,
                    humidity: res.data.main.humidity,
                    windspeed: res.data.wind.speed,
                    pressure: res.data.main.pressure,
                    sunrise: res.data.sys.sunrise,
                    sunset: res.data.sys.sunset,
                    units: units,
                }

                for (let i = 0; i < forecasts.length; ) {
                    if (weatherData.city === forecasts[i].city && weatherData.units === forecasts[i].units) {
                        setErrorMessage("This city has already been added. Please choose a different city.");
                        return;
                    }
                }

                setForecasts((prevData: WeatherData[]) => [...prevData, weatherData]);
            }).catch(error => {
                setErrorMessage("City has not been found. Please check the name.");
                console.error(error);
            });
    }

    const getTime = (timestamp: number): string => {
        const date = new Date(1000 * timestamp);
        const time = date.toTimeString();
        return time.substring(0, 8);
    };

    const removeForecast = (index: number) => {
        const updateForecasts = forecasts
            .filter((WeatherData, i) => i !== index);
        setForecasts(updateForecasts);
    }

    const renderTemperatureIcon = (forecast: WeatherData) => {
        if (forecast.units === 'metric') {
            if (forecast.temp > 4) {
                return <TbTemperatureSun />;
            } else {
                return <TbTemperatureSnow />;
            }
        } else if (forecast.units === 'imperial') {
            if (forecast.temp > 39.2) {
                return <TbTemperatureSun />;
            } else {
                return <TbTemperatureSnow />;
            }
        }
    };

    return (
        <div className="container">

            <nav className="navbar is-flex is-justify-content-left is-align-items-left">
                <div className="navbar-item" style={{height: '80px'}}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!city.trim()) {
                                setErrorMessage("Please enter a city name to proceed.");
                                return;
                            } else if (forecasts.length === maxSize) {
                                setErrorMessage("You have reached the maximum number of forecasts. Please remove one before adding a new one.");
                                return;
                            }

                            getWeather();
                        }}
                    >

                        <div className="field has-addons">
                            <div className="control">
                                <div className="select is-medium">
                                    <select value={units} onChange={(e) => setUnits(e.target.value)}>
                                        <option value="metric">Metric</option>
                                        <option value="imperial">Imperial</option>
                                    </select>
                                </div>
                            </div>


                            <div className="control">
                                <input
                                    className={`input is-medium ${errorMessage ? "is-danger" : ""}`}
                                    type="text"
                                    placeholder="Enter city"
                                    value={city}
                                    onChange={(e) => {
                                        setCity(e.target.value);
                                        if (errorMessage) {
                                            setErrorMessage("");
                                        }
                                    }}
                                />
                            </div>

                            <div className="control">
                                <button className="button is-medium is-primary" type="submit">
                                    <span className="icon"><RiAddLargeFill/></span>
                                </button>
                            </div>
                        </div>
                        <p className="help is-danger">
                            {errorMessage}
                        </p>
                    </form>
                </div>
            </nav>


            {forecasts.length === 0 ? (
                <div className="box">
                <p className="subtitle is-6">No forecasts added. Add city to get current weather!</p>
                </div>
            ) : (
                <div className="fixed-grid has-2-cols">
                    <div className="grid">

                    {forecasts.map((forecast, index) =>
                                <div className="box" style={{width: '100%'}}>

                                    <div className="columns is-multiline">

                                        <div className="column is-half">
                                            <h2 className="title is-4">{forecast.city}</h2>
                                            <p className="subtitle is-6">{flag(forecast.country)} {name(forecast.country)}</p>
                                        </div>

                                        <div className="column is-half">
                                            <div className="is-flex is-justify-content-right">
                                                <button
                                                    className="button is-danger"
                                                    style={{height: 35, width: 35, padding: 0}}
                                                    onClick={() => removeForecast(index)}
                                                >
                                                    <IoMdRemove/>
                                                </button>
                                            </div>
                                        </div>


                                        <div className="column is-half">
                                            <div className="box">
                                                <strong>Temperature: </strong>
                                                <br/>
                                                <p>
                                                    {renderTemperatureIcon(forecast)} {forecast.temp} °{forecast.units === "metric" ? "C" : "F"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="column is-half">
                                            <div className="box">
                                                <strong>Humidity: </strong>
                                                <br/>
                                                <p><IoWater/> {forecast.humidity} %</p>
                                            </div>
                                        </div>

                                        <div className="column is-half">

                                            <div className="box">
                                                <strong>Wind Speed: </strong>
                                                <br/>
                                                <p>
                                                    {forecast.windspeed} {forecast.units === "metric" ? "meter/sec" : "miles/hour"}
                                                </p>

                                                <strong>Pressure: </strong>
                                                <br/>
                                                <p>{forecast.pressure} hPa</p>

                                            </div>

                                        </div>

                                        <div className="column is-half">

                                            <div className="box">
                                                <strong>Sunrise: </strong>
                                                <br/>
                                                <p>{getTime(forecast.sunrise)}</p>

                                                <strong>Sunset: </strong>
                                                <br/>
                                                <p>{getTime(forecast.sunset)}</p>

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