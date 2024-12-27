import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../Images/logo.svg';
import '../../Styles/App.css';

function Registration() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setIsRegister(false);
    };

    const toggleRegister = () => setIsRegister(!isRegister);

    const handleRegister = (event) => {
        event.preventDefault();
        console.log('User registered');
        navigate('/clocks');
    };

    return (
        <div className="App">
            <header className="App-header">
                <header style={{
                    backgroundColor: '#282c34',
                    padding: '10px 20px',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                </header>
                <img src={logo} className="App-logo" alt="logo"/>
                <button className="App-button" onClick={openModal}>Login</button>
            </header>

            {isModalOpen && (
                <div className="Modal-overlay">
                    <div className="Modal-content">
                        <button className="Modal-close" onClick={closeModal}>Close</button>
                        {isRegister ? (
                            <>
                                <h2>Register</h2>
                                <form onSubmit={handleRegister}>
                                    <div className="Form-group">
                                        <label htmlFor="username">Username:</label>
                                        <input type="text" id="username" name="username" required />
                                    </div>
                                    <div className="Form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" id="password" name="password" required />
                                    </div>
                                    <div className="Form-group">
                                        <label htmlFor="confirmPassword">Confirm Password:</label>
                                        <input type="password" id="confirmPassword" name="confirmPassword" required />
                                    </div>
                                    <button type="submit" className="Form-submit">Register</button>
                                </form>
                                <p></p>
                                <button className="Modal-button" onClick={toggleRegister}>Already have an account?</button>
                            </>
                        ) : (
                            <>
                                <h2>Login</h2>
                                <form>
                                    <div className="Form-group">
                                        <label htmlFor="username">Username:</label>
                                        <input type="text" id="username" name="username" required />
                                    </div>
                                    <div className="Form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" id="password" name="password" required />
                                    </div>
                                    <button type="submit" className="Form-submit">Login</button>
                                </form>
                                <p></p>
                                <button className="Modal-button" onClick={toggleRegister}>Don't have an account?</button>
                            </>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
}

export default Registration;
