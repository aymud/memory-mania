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
            if (isRunning && timeRemainingInSeconds > 0) {
                setTimeRemainingInSeconds(prevTime => prevTime - 1);
            } else {
                clearInterval(timer);
                resetTimer();
                callback();
            }
        }, timerIntervalInMilliSeconds);

        return () => clearInterval(timer);
    }, [isRunning, timeRemainingInSeconds, callback, resetTimer]);

    return { timeRemainingInSeconds, startTimer, resetTimer };
}
