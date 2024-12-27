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

        if (rNum < 1 || rNum > 4) {
            setError('R must be between 1 and 4');
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!validateInputs()) return;

        dispatch(addPoint({
            x: Number(x),
            y: Number(y),
            r: Number(currentR)
        }));

        setX('');
        setY('');
    };

    const handleRChange = (e) => {
        const value = Number(e.target.value);
        if (!isNaN(value) && value >= 1 && value <= 4) {
            dispatch(setR(value));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">X:</label>
                <input
                    type="number"
                    step="0.01"
                    value={x}
                    onChange={(e) => setX(e.target.value)}
                    placeholder="Enter X (-5 to 3)"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Y:</label>
                <input
                    type="number"
                    step="0.01"
                    value={y}
                    onChange={(e) => setY(e.target.value)}
                    placeholder="Enter Y (-5 to 3)"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">R:</label>
                <input
                    type="number"
                    step="0.01"
                    value={currentR}
                    onChange={handleRChange}
                    placeholder="Enter R (1 to 4)"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                />
            </div>

            {error && (
                <div className="text-red-500 text-sm">{error}</div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
            >
                {loading ? 'Adding...' : 'Add Point'}
            </button>
        </form>
    );
};

export default PointForm;
