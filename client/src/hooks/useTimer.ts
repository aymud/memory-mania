import { useEffect, useState } from 'react'

export default function useTimer(initialTimeInSeconds: number, callback: () => void) {
    const [timeRemainingInSeconds, setTimeRemainingInSeconds] = useState(initialTimeInSeconds)

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined = undefined
        const timerIntervalInMilliSeconds = 1000

        if (timeRemainingInSeconds > 0) {
            timer = setInterval(() => {
                setTimeRemainingInSeconds((prevTime: number) => (prevTime > 0 ? prevTime - 1 : 0))
            }, timerIntervalInMilliSeconds)
        } else {
            clearInterval(timer)
            callback()
        }

        return () => clearInterval(timer)
    }, [timeRemainingInSeconds, callback])

    const resetTimer = () => {
        setTimeRemainingInSeconds(initialTimeInSeconds)
    }

    return { timeRemainingInSeconds, resetTimer }
}