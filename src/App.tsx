import React, {useState} from 'react';
import 'bulma/css/bulma.min.css';
import Navbar from "./components/Navbar";
import Weathergrid from "./components/Weathergrid";
import Searchbar from "./components/Searchbar";

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

function App() {
    const [forecasts, setForecasts] = useState<WeatherData[]>([]);
    const [layout, setLayout] = useState("grid");

    return (
        <div className="app-container">
            <Navbar />
            <div className="container">
                <Searchbar forecasts={forecasts} setForecasts={setForecasts} layout={layout} setLayout={setLayout} />
                <Weathergrid forecasts={forecasts} setForecasts={setForecasts} layout={layout} />
            </div>
        </div>
    );
}

export default App;
