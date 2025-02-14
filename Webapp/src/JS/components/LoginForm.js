import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../store/authSlice';
import '../../Styles/AuthForms.css';

export const RegisterForm = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError('');

        if (password !== confirmPassword) {
            setValidationError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setValidationError('Password must be at least 6 characters long');
            return;
        }

        dispatch(register({ username, password }));
    };

    const displayError = validationError || error;

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
                <label className="form-label">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input"
                    required
                />
            </div>

            {displayError && <div className="error-message">{displayError}</div>}

            <button type="submit" disabled={loading} className="submit-button register-button">
                {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
};
