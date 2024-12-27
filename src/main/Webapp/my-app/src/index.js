import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Styles/index.css';
import Registration from "./JS/Pages/Registration";
import PrivateRoute from "./JS/Navigation/PrivateRoute";
import Time from "./JS/Pages/Clocks";
import { store } from './JS/store/index';
import Graph from "./JS/Pages/Graph";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
        <Routes>
            <Route path = "/registration" element = {<Registration/>} />

            <Route path = "/clocks" element={
                <PrivateRoute>

                    <Time/>

                </PrivateRoute>}/>

            <Route path = "/graph" element={
                <PrivateRoute>

                    <Graph/>

                </PrivateRoute>}/>
        </Routes>
    </Router>
  </React.StrictMode>
);
