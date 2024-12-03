import React from 'react';
import 'bulma/css/bulma.min.css';
import Navbar from "./components/Navbar";
import Weathergrid from "./components/Weathergrid";

function App() {
    return (
        <div className="app-container">
            <Navbar />
            <Weathergrid />
        </div>
    );
}

export default App;
