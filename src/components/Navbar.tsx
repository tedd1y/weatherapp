import React from "react";
import 'bulma/css/bulma.min.css';
import './App.css';
import { FaCloud } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className="navbar nav pl-6 pt-4 pb-4 has-text-centered-mobile">
            <div className="navbar-item">
                <a className="title playwrite-hr-lijeva" href="/">
                    <i className="pr-2" style={{fontSize: "2rem"}}>
                        <FaCloud />
                    </i>
                    Forecastly
                </a>
            </div>
        </nav>
    )
}

export default Navbar;