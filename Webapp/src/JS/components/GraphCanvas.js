import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const GraphCanvas = ({ onPointClick }) => {
    const canvasRef = useRef(null);
    const { currentR, points } = useSelector((state) => state.points);

    const CANVAS_SIZE = 600;
    const CENTER = CANVAS_SIZE/2;
    const DOT_SIZE = 4;


    const getRelativeCoordinates = (point) => {
        const scale = CENTER / currentR;
        // Теперь point.x и point.y — логические координаты,
        // поэтому используем их напрямую для расчёта координат канвы
        const x = CENTER + (point.x * scale);
        const y = CENTER - (point.y * scale);
        return { x, y };
    };



    const drawGrid = (ctx) => {
        const scale = CENTER / currentR;

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
            const x = CENTER + value * scale;
            const y = CENTER - value * scale;

            ctx.beginPath();
            ctx.moveTo(x, CENTER - 5);
            ctx.lineTo(x, CENTER + 5);
            ctx.moveTo(CENTER - 5, y);
            ctx.lineTo(CENTER + 5, y);
            ctx.stroke();

            ctx.fillText(value.toString(), x, CENTER + 20);
            ctx.fillText((value).toString(), CENTER - 20, y);
        });
    };

    const drawAreas = (ctx) => {
        const scale = CENTER / currentR;

        ctx.fillStyle = 'rgba(100, 149, 237, 0.5)';

        if (currentR > 0) {

            // Прямоугольник (верхняя правая четверть)
            ctx.fillRect(
                CENTER,                // x: начало в точке (0,0) по математическим координатам
                CENTER,                // y: начало (низ прямоугольника)
                (currentR) * scale,      // ширина: R
                (-currentR) * scale      // высота: от 0 до R вверх
            );


            // Треугольник (левая верхняя часть)
            ctx.beginPath();
            ctx.moveTo(CENTER, CENTER); // Центр
            ctx.lineTo(CENTER - (currentR) * scale, CENTER); // Левая точка
            ctx.lineTo(CENTER, CENTER - (currentR) * scale); // Верхняя точка
            ctx.closePath();
            ctx.fill();

            // Круг(
            ctx.beginPath();
            ctx.moveTo(CENTER, CENTER);
            ctx.arc(CENTER, CENTER, (currentR / 2) * scale, 0, Math.PI / 2, false);
            ctx.closePath();
            ctx.fill();
        }
        if (currentR < 0){

            // Прямоугольник (верхняя правая четверть)
            ctx.fillRect(
                CENTER,                // x: начало в точке (0,0) по математическим координатам
                CENTER,                // y: начало (низ прямоугольника)
                (-currentR) * scale,      // ширина: R
                (currentR) * scale      // высота: от 0 до R вверх
            );


            // Треугольник, занимающий четвертую четверть (правее и ниже центра)
            ctx.beginPath();
            ctx.moveTo(CENTER, CENTER); // Центр (логическая точка (0, 0))
            ctx.lineTo(CENTER + currentR * scale, CENTER); // Точка (R, 0)
            ctx.lineTo(CENTER, CENTER + currentR * scale); // Точка (0, -R)
            ctx.closePath();
            ctx.fill();


            // Круг (сектор, занимающий вторую четверть)
            ctx.beginPath();
            ctx.moveTo(CENTER, CENTER);
            ctx.arc(CENTER, CENTER, (currentR / 2) * scale, Math.PI, 3 * Math.PI / 2, false);
            ctx.closePath();
            ctx.fill();

        }


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

        const scale = CENTER / currentR;
        const graphX = ((x - CENTER) / scale).toFixed(5);
        const graphY = ((CENTER - y) / scale).toFixed(5);

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
            style={{
                backgroundColor: "#fff",
                borderRadius: "4px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                cursor: "crosshair"
            }}

        />
    );
};

export default GraphCanvas;