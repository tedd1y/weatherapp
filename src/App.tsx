import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import Navbar from "./components/Navbar";
import Weathergrid from "./components/Weathergrid";

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

function App() {
    const [forecasts, setForecasts] = useState<WeatherData[]>([]);

    return (
        <div className="app-container">
            <Navbar/>
            <Weathergrid
                forecasts={forecasts}
                setForecasts={setForecasts}/>
        </div>
    );
}

export default App;
