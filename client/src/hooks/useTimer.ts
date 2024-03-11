import { useCallback, useEffect, useState } from 'react';

export default function useTimer(initialTimeInSeconds: number, callback: () => void) {
    const [timeRemainingInSeconds, setTimeRemainingInSeconds] = useState(initialTimeInSeconds);
    const [isRunning, setIsRunning] = useState(false);

    const startTimer = useCallback(() => {
        setIsRunning(true);
    }, []);

    const resetTimer = useCallback(() => {
        setIsRunning(false);
        setTimeRemainingInSeconds(initialTimeInSeconds);
    }, [initialTimeInSeconds]);

    useEffect(() => {
        if (!isRunning) return;

        const timerIntervalInMilliSeconds = 1000;
        const timer = setInterval(() => {
            if (timeRemainingInSeconds > 0) {
                setTimeRemainingInSeconds(prevTime => prevTime - 1);
            } else {
                clearInterval(timer);
                callback();
            }
        }, timerIntervalInMilliSeconds);

        return () => clearInterval(timer);
    }, [isRunning, timeRemainingInSeconds, callback]);

    return { timeRemainingInSeconds, startTimer, resetTimer };
}