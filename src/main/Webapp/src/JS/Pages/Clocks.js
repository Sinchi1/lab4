import React, { useState, useEffect } from 'react';
import '../../Styles/clock.css';
import '../../Styles/App.css';
import {logout} from "../store/authSlice";
import { useDispatch, useSelector } from 'react-redux';
import {Navigate} from "react-router-dom";


function Clock() {

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timerId); // Cleanup the interval on component unmount
    }, []);

    const [time, setTime] = useState(new Date());
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    const handleLogout = () => {
        dispatch(logout());
    };

    if (!token) {
        return <Navigate to="/" replace />;
    }

    const calculateAngle = (unit, max) => (unit / max) * 360;

    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const hourAngle = calculateAngle(hours + minutes / 60, 12);
    const minuteAngle = calculateAngle(minutes + seconds / 60, 60);
    const secondAngle = calculateAngle(seconds, 60);

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            height: '100vh', // Full viewport height
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}>
            <header style={{
                backgroundColor: '#282c34',
                padding: '10px 20px',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0, // Prevent shrinking of the header
            }}>
                <h1 style={{margin: 0, fontSize: '1.5rem'}}>Времечко?</h1>
                <nav>
                    <a href="#/graph" className="nav-link">Перестрелка 😾</a>
                </nav>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                    Выйти
                </button>
            </header>

            <div style={{
                backgroundColor: '#282c34',
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
            <div style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    border: '5px solid black',
                    position: 'relative',
                }}>
                    {/* Hour hand */}
                    <div
                        style={{
                            position: 'absolute',
                            width: '6px',
                            height: '50px',
                            backgroundColor: 'black',
                            top: '50px',
                            left: '97px',
                            transformOrigin: '50% 100%',
                            transform: `rotate(${hourAngle}deg)`
                        }}
                    ></div>

                    {/* Minute hand */}
                    <div
                        style={{
                            position: 'absolute',
                            width: '4px',
                            height: '70px',
                            backgroundColor: 'gray',
                            top: '30px',
                            left: '98px',
                            transformOrigin: '50% 100%',
                            transform: `rotate(${minuteAngle}deg)`
                        }}
                    ></div>

                    {/* Second hand */}
                    <div
                        style={{
                            position: 'absolute',
                            width: '2px',
                            height: '90px',
                            backgroundColor: 'red',
                            top: '10px',
                            left: '99px',
                            transformOrigin: '50% 100%',
                            transform: `rotate(${secondAngle}deg)`
                        }}
                    ></div>

                    {/* Clock center */}
                    <div className="clock-center"></div>

                    {/* Hour labels */}
                    {[...Array(12)].map((_, index) => {
                        const angle = (index + 1) * 30; // 360 / 12 = 30 degrees per hour
                        const x = 95 + 80 * Math.sin((angle * Math.PI) / 180);
                        const y = 95 - 80 * Math.cos((angle * Math.PI) / 180);
                        return (
                            <div
                                key={index}
                                style={{
                                    position: 'absolute',
                                    top: `${y}px`,
                                    left: `${x}px`,
                                    transform: 'translate(-50%, -50%)',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                }}
                            >
                                {index + 1}
                            </div>
                        );
                    })}
                </div>
                <p></p>
                <p className="texter">Для зумеров</p>
                <p className="texter">{hours}:{minutes}:{seconds}</p>
            </div>
        </div>
    );
}

export default Clock;