import React from "react";
import 'bulma/css/bulma.min.css';
import { TiWeatherPartlySunny } from "react-icons/ti";

// todo fix whitespace in blocks

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-item">
                <i className="navbar-item" style={{color: "yellow", fontSize: "2rem"}}><TiWeatherPartlySunny/></i>
            </div>
            <div className="navbar-item">
                <h1 className="title ml-6">Forecastly</h1>
            </div>
        </nav>
    )
}

export default Navbar;