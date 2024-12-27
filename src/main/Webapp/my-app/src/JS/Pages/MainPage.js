import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { addPoint, fetchPoints } from '../store/pointsSlice';
import GraphCanvas from '../components/GraphCanvas';
import PointForm from '../components/PointForm';
import PointsTable from '../components/PointsTable';

const MainPage = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const currentR = useSelector((state) => state.points.currentR);

    useEffect(() => {
        if (token) {
            dispatch(fetchPoints());
        }
    }, [dispatch, token]);

    if (!token) {
        return <Navigate to="/" replace />;
    }

    const handleCanvasClick = (x, y) => {
        dispatch(addPoint({ x, y, r: currentR }));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Web Lab 4</h1>
                    <nav>
                        <a
                            href="/clocks">
                            Перестрелка 😾
                        </a>
                    </nav>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                        Выйти
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <div className="bg-white shadow rounded-lg p-6">
                            <GraphCanvas onPointClick={handleCanvasClick} />
                        </div>
                        <div className="bg-white shadow rounded-lg p-6">
                            <PointForm />
                        </div>
                    </div>
                    <div className="bg-white shadow rounded-lg p-6">
                        <PointsTable />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainPage;
