// PointForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPoint, setR } from '../store/pointsSlice';

const PointForm = () => {
    const dispatch = useDispatch();
    const { currentR, loading } = useSelector((state) => state.points);

    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const [error, setError] = useState('');

    const validateInputs = () => {
        const xNum = Number(x);
        const yNum = Number(y);
        const rNum = Number(currentR);

        if (isNaN(xNum) || isNaN(yNum) || isNaN(rNum)) {
            setError('All values must be numbers');
            return false;
        }

        if (xNum < -5 || xNum > 3) {
            setError('X must be between -5 and 3');
            return false;
        }

        if (yNum < -5 || yNum > 3) {
            setError('Y must be between -5 and 3');
            return false;
        }

        if (rNum < -5 || rNum > 3) {
            setError('R must be between -5 and 3');
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!validateInputs()) return;

        dispatch(addPoint({
            x: String(x),
            y: String(y),
            r: String(currentR)
        }));

        setX('');
        setY('');
    };

    const handleRChange = (e) => {
        const value = Number(e.target.value);
        if (!isNaN(value) && value >= -5 && value <= 3) {
            dispatch(setR(value));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label className="form-label">X:</label>
                <select
                    value={x}
                    onChange={(e) => setX(e.target.value)}
                    className="form-input"
                    required
                >
                    {['-5', '-4', '-3', '-2', '-1', '0', '1', '2', '3'].map((value) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Y:</label>
                <input
                    type="range"
                    min="-5"
                    max="5"
                    step="0.01"
                    value={y}
                    onChange={(e) => setY(e.target.value)}
                    className="form-input"
                    required
                />
                {/* Отображение выбранного значения Y */}
                <span>{y}</span>
            </div>

            <div className="form-group">
                <label className="form-label">R:</label>
                <select
                    value={currentR}
                    onChange={handleRChange}
                    className="form-input"
                    required
                >
                    {['-5', '-4', '-3', '-2', '-1', '0', '1', '2', '3'].map((value) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>

            {error && <div className="form-error">{error}</div>}

            <button
                type="submit"
                disabled={loading}
                className="form-button"
            >
                {loading ? 'Adding...' : 'Add Point'}
            </button>
        </form>
    );
};

export default PointForm;
