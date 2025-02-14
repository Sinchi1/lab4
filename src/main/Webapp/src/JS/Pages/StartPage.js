import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { LoginForm } from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import logo from '../../Images/logo.svg';
import '../../Styles/App.css';
import {login, updateToken} from "JS/store/authSlice";

const StartPage = () => {
    const token = useSelector((state) => state.auth.token);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const dispatch = useDispatch();


    useEffect(() => {
        setInterval(() => {
            dispatch(updateToken());
        }, 10000); // каждые 10 секунд
    }, [dispatch]);

    useEffect(() => {
        if (!token) {
            dispatch(login())
        }
    }, [token, dispatch]);

    if (token) {
        return <Navigate to="/graph" replace />;
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <button className="App-button" onClick={() => setIsModalOpen(true)}>
                    Login
                </button>
            </header>

            {isModalOpen && (
                <div className="Modal-overlay">
                    <div className="Modal-container">
                        <button className="Modal-close" style={{color: 'red'}} onClick={() => setIsModalOpen(false)}>
                            X
                        </button>
                        <h2>{isLogin ? 'Login' : 'Register'}</h2>
                        {isLogin ? <LoginForm /> : <RegisterForm />}
                        <button className="Modal-button" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? "Don't have an account?" : 'Already have an account?'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StartPage;
