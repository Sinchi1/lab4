import React, { useEffect } from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { addPoint, fetchPoints } from '../store/pointsSlice';
import GraphCanvas from '../components/GraphCanvas';
import PointForm from '../components/PointForm';
import PointsTable from '../components/PointsTable';
import { updateToken } from '../store/authSlice';
import '../../Styles/App.css'

const MainPage = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const currentR = useSelector((state) => state.points.currentR);

    useEffect(() => {
        if (token){
            dispatch(fetchPoints());
        }
        setInterval(() => {
            if (token) {
                dispatch(fetchPoints());
            }
        }, 10000);
    });

    useEffect(() => {
        setInterval(() => {
            dispatch(updateToken());
        }, 10000); // каждые 10 секунд
    }, [dispatch]);

    useEffect(() => {
        if (!token) {
            dispatch(logout())
        }
    }, [token, dispatch]);

    // useEffect(() => {
    //     setInterval(() => {
    //         if (token) {
    //             dispatch(fetchPoints());
    //         }
    //     }, [dispatch, token]);
    // });

    if (!token) {
        return <Navigate to="/" replace/>;
    }

    const handleCanvasClick = (x, y) => {
        dispatch(addPoint({x, y, r: currentR}));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="App-header">
            <header className="header">
                <div className="header-content">
                    <h1 className="header-title">Трусковский 413818</h1>
                    <nav>
                        <a href="#/clocks" className="nav-link">
                            Часики 😾
                        </a>
                    </nav>
                    <button
                        onClick={handleLogout}
                        className="logout-button"
                    >
                        Выйти
                    </button>
                </div>
            </header>

            <main className="main-content">
                <div className="grid-container">
                    <div className="grid-layout">
                        <div className="left-column">
                            <div className="card">
                                <GraphCanvas onPointClick={handleCanvasClick}/>
                            </div>
                            <div className="card">
                                <PointForm/>
                            </div>
                        </div>
                        <div className="card">
                            <PointsTable/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainPage;
