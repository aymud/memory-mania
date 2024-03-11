import { useEffect, useState } from 'react'

export default function useTimer(initialTimeInSeconds: number, callback: () => void) {
    const [timeRemaining, setTimeRemaining] = useState(initialTimeInSeconds)

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined = undefined

        if (timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining((prevTime: number) => (prevTime > 0 ? prevTime - 1 : 0))
            }, 1000)
        } else {
            clearInterval(interval)
            callback()
        }

        return () => clearInterval(interval)
    }, [timeRemaining, callback])

    const resetTimer = () => {
        setTimeRemaining(initialTimeInSeconds)
    }

    return { timeRemaining, resetTimer }
}