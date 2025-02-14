import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPoints } from '../store/pointsSlice';
import "../../Styles/App.css"

const PointsTable = () => {
    const dispatch = useDispatch();
    const { points, loading } = useSelector((state) => state.points);

    const handleClear = () => {
        dispatch(clearPoints());
    };

    const formatDate = (dateStr) => {
        try {
            const date = new Date(dateStr.replace('[UTC]', ''));
            return new Intl.DateTimeFormat('ru-RU', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            }).format(date);
        } catch (e) {
            console.error('Error formatting date:', dateStr, e);
            return dateStr; // Return original string if parsing fails
        }
    };

    const formatExecutionTime = (time) => {
        return time.toFixed(3);
    };

    return (
        <div className="table-container">
            <div className="table-header">
                <h2 className="header-title">Results</h2>
                <button
                    onClick={handleClear}
                    disabled={loading || points.length === 0}
                    className="clear-button"
                >
                    Clear All
                </button>
            </div>
            <div className="table-wrapper">
                <table className="custom-table">
                    <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Hit</th>
                        <th>Time</th>
                        <th>Execution (ms)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {points.map((point) => (
                        <tr key={point.id}>
                            <td>{point.x}</td>
                            <td>{point.y}</td>
                            <td>{point.r}</td>
                            <td className={point.hit ? "hit-yes" : "hit-no"}>
                                {point.hit ? "Yes" : "No"}
                            </td>
                            <td>{formatDate(point.createdAt)}</td>
                            <td>{formatExecutionTime(point.executionTime)}</td>
                        </tr>
                    ))}
                    {points.length === 0 && (
                        <tr>
                            <td colSpan={6} className="no-data">No points added yet</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default PointsTable;
