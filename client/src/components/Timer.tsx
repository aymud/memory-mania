import styled from 'styled-components'

const TimerContainer = styled.div`
    font-family: Arial, sans-serif;
    text-align: center;
    margin: 20px;
    padding: 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 300px;
`

const Time = styled.div`
    font-size: 2rem;
`

interface ITimerProps {
    timeInSeconds: number
}

export default function Timer(props: ITimerProps) {
    const duration = {
        minutes: Math.floor(props.timeInSeconds / 60),
        seconds: props.timeInSeconds % 60,
    }

    const formatTime = (value: number) => (value < 10 ? `0${value}` : value)

    return (
        <TimerContainer>
            <Time>
                {formatTime(duration.minutes)}:{formatTime(duration.seconds)}
            </Time>
        </TimerContainer>
    )
}