import React from 'react'
import Timer from './Timer.tsx'
import { tryFetchData } from '../utils/apiHelper.ts'
import styled from 'styled-components'
import Button from './Button.tsx'

const TestCountdownContainer = styled.div`
    text-align: center;
    padding: 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 300px;
    margin: 0 auto;
`

const CountdownText = styled.h2`
    font-size: 24px;
    font-weight: bold;
`

const FunFactText = styled.p`
    font-size: 16px;
    margin-top: 10px;
`

interface TestCountdownProps {
    handleTestCountdown: () => void
}

const RANDOM_FACT_API_URL =
    'https://api.api-ninjas.com/v1/facts?limit=1'

export default function TestCountdown(
    props: TestCountdownProps
) {
    const [
        countdownTimeInSeconds,
        setCountdownTimeInSeconds,
    ] = React.useState(10)
    const [funFact, setFunFact] = React.useState('')

    React.useEffect(() => {
        const apiKey =
            'JZDgzZNFXjQ2o7glprpbPg==kRpmEoxXi5UALX0e'
        const options = {
            method: 'GET',
            headers: { 'X-Api-Key': apiKey },
        }
        tryFetchData(RANDOM_FACT_API_URL, options).then(
            data => {
                setFunFact(data[0].fact)
            }
        )
    }, [])

    React.useEffect(() => {
        const timerIntervalInMilliSeconds = 1000
        const timer = setInterval(() => {
            if (countdownTimeInSeconds > 0) {
                setCountdownTimeInSeconds(
                    prevCountdownTime =>
                        prevCountdownTime - 1
                )
            } else {
                clearInterval(timer)
                props.handleTestCountdown() // Notify the parent component that the rest phase is complete.
            }
        }, timerIntervalInMilliSeconds)

        return () => {
            clearInterval(timer)
        }
    }, [countdownTimeInSeconds, props])

    return (
        <TestCountdownContainer>
            <CountdownText>
                Recall begins in
                <Timer
                    timeInSeconds={countdownTimeInSeconds}
                />
            </CountdownText>
            <FunFactText>
                Did you know ... {funFact}
            </FunFactText>
            <Button
                className='skip-button'
                onClick={props.handleTestCountdown}
            >
                Skip
            </Button>
        </TestCountdownContainer>
    )
}
