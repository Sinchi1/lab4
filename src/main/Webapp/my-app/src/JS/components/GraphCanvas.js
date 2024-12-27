import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const GraphCanvas = ({ onPointClick }) => {
    const canvasRef = useRef(null);
    const { currentR, points } = useSelector((state) => state.points);

    const CANVAS_SIZE = 400;
    const CENTER = CANVAS_SIZE / 2;
    const SCALE = CANVAS_SIZE / 3;
    const DOT_SIZE = 4;

    const getRelativeCoordinates = (point) => {
        const relativeX = (point.x / point.r) * currentR;
        const relativeY = (point.y / point.r) * currentR;

        return {
            x: CENTER + relativeX * (SCALE / currentR),
            y: CENTER - relativeY * (SCALE / currentR),
        };
    };

    const drawGrid = (ctx) => {
        ctx.beginPath();
        ctx.moveTo(0, CENTER);
        ctx.lineTo(CANVAS_SIZE, CENTER);
        ctx.moveTo(CENTER, 0);
        ctx.lineTo(CENTER, CANVAS_SIZE);
        ctx.strokeStyle = 'black';
        ctx.stroke();

        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        [-currentR, -currentR / 2, currentR / 2, currentR].forEach((value) => {
            const x = CENTER + value * (SCALE / currentR);
            const y = CENTER - value * (SCALE / currentR);

            ctx.beginPath();
            ctx.moveTo(x, CENTER - 5);
            ctx.lineTo(x, CENTER + 5);
            ctx.moveTo(CENTER - 5, y);
            ctx.lineTo(CENTER + 5, y);
            ctx.stroke();

            ctx.fillText(value.toString(), x, CENTER + 20);
            ctx.fillText(value.toString(), CENTER - 20, y);
        });
    };

    const drawAreas = (ctx) => {
        const scaledR = SCALE;
        ctx.fillStyle = 'rgba(100, 149, 237, 0.5)';

        ctx.beginPath();
        ctx.moveTo(CENTER, CENTER);
        ctx.lineTo(CENTER - scaledR / 2, CENTER);
        ctx.lineTo(CENTER, CENTER + scaledR);
        ctx.closePath();
        ctx.fill();

        ctx.fillRect(CENTER - scaledR / 2, CENTER - scaledR, scaledR / 2, scaledR);

        ctx.beginPath();
        ctx.moveTo(CENTER, CENTER);
        ctx.arc(CENTER, CENTER, scaledR, 0, Math.PI / 2, false);
        ctx.closePath();
        ctx.fill();
    };

    const drawPoints = (ctx) => {
        points.forEach((point) => {
            const { x, y } = getRelativeCoordinates(point);

            ctx.beginPath();
            ctx.arc(x, y, DOT_SIZE, 0, 2 * Math.PI);
            ctx.fillStyle = point.hit ? 'green' : 'red';
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();
        });
    };

    const handleClick = (event) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const graphX = Number(((x - CENTER) * (currentR / SCALE)).toFixed(2));
        const graphY = Number(((CENTER - y) * (currentR / SCALE)).toFixed(2));

        onPointClick(graphX, graphY);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        drawGrid(ctx);
        drawAreas(ctx);
        drawPoints(ctx);
    }, [currentR, points]);

    return (
        <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            onClick={handleClick}
            className="bg-white rounded shadow-md cursor-crosshair"
        />
    );
};

export default GraphCanvas;
