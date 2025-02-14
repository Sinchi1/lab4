import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './Pages/StartPage';
import MainPage from './Pages/MainPage';
import Clocks from "./Pages/Clocks";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/graph" element={<MainPage />} />
                <Route path="/clocks" element={<Clocks />} />
            </Routes>
        </Router>
    );
}

export default App;