import {useEffect, useState} from "react";

export default function Time() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Format the time as a string
    const timeString = `${hours}:${minutes}:${seconds}`;

    return (
        <div>
            <h1>{timeString}</h1>
        </div>
    );
}
