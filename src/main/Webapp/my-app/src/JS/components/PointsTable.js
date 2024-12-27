import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPoints } from '../store/pointsSlice';

const PointsTable = () => {
    const dispatch = useDispatch();
    const { points, loading } = useSelector((state) => state.points);

    const handleClear = () => {
        dispatch(clearPoints());
    };

    const formatDate = (dateStr) => {
        // Parse the backend date format (assuming ISO format from LocalDateTime)
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
        <div className="overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Results</h2>
                <button
                    onClick={handleClear}
                    disabled={loading || points.length === 0}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 disabled:opacity-50"
                >
                    Clear All
                </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">X</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Y</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">R</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Execution (ms)
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {points.map((point) => (
                    <tr key={point.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{point.x}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{point.y}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{point.r}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`${point.hit ? 'text-green-600' : 'text-red-600'}`}>
                                    {point.hit ? 'Yes' : 'No'}
                                </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatDate(point.createdAt)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatExecutionTime(point.executionTime)}</td>
                    </tr>
                ))}
                {points.length === 0 && (
                    <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                            No points added yet
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default PointsTable;
