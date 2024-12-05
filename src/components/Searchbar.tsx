import {RiAddLargeFill} from "react-icons/ri";
import {LuLayoutGrid, LuStretchHorizontal} from "react-icons/lu";
import React, {useState} from "react";
import axios from "axios";
import {v4 as uuidv4} from "uuid";

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
    setLayout: React.Dispatch<React.SetStateAction<string>>;
};

const Searchbar: React.FC<Props> = ({ forecasts, setForecasts, layout, setLayout }) => {
    const [city, setCity] = useState('');
    const [units, setUnits] = useState('metric');
    const [errorMessage, setErrorMessage] = useState("");
    const maxSize = 10;

    const getWeather = async () => {
        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=38ac577a02d6d3ae82b169adb831d76b`);

            console.log(res);

            const weatherData: WeatherData = {
                id: uuidv4(),
                city: res.data.name,
                country: res.data.sys.country,
                temp: (res.data.main.temp).toFixed(1),
                feels_like: (res.data.main.feels_like).toFixed(1),
                humidity: res.data.main.humidity,
                rain: res.data.rain?.['1h'] || 0,
                snow: res.data.snow?.['1h'] || 0,
                windspeed: res.data.wind.speed,
                pressure: res.data.main.pressure,
                sunrise: res.data.sys.sunrise,
                sunset: res.data.sys.sunset,
                units: units,
            }

            const isDuplicate = forecasts.some(
                (forecast) => forecast.city === weatherData.city && forecast.units === weatherData.units
            );

            if (isDuplicate) {
                setErrorMessage("This city has already been added. Please choose a different city.");
                return;
            }

            setForecasts((prevData: WeatherData[]) => [...prevData, weatherData]);
        } catch (error) {
            setErrorMessage("City has not been found. Please check the name.");
            console.error(error);
        }
    };

    return (
        <nav className="navbar is-flex is-align-items-center is-justify-content-space-between my-4">
            <div className="navbar-item">
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
            <div className="navbar-item">
                <div className="field has-addons pb-3">
                    <div className="control">
                        <button
                            className={`button is-medium ${layout === "grid" ? "is-primary" : ""}`}
                            onClick={() => setLayout("grid")}
                        >
                            <LuLayoutGrid/>
                        </button>
                    </div>
                    <div className="control">
                        <button
                            className={`button is-medium ${layout === "list" ? "is-primary" : ""}`}
                            onClick={() => setLayout("list")}
                        >
                            <LuStretchHorizontal/>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Searchbar;