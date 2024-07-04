import React from 'react';

import styled from 'styled-components';

import Button from './Button.tsx';
import Timer from './Timer.tsx';
import useTimer from '../hooks/useTimer.ts';
import { tryFetchData } from '../utils/apiHelper.ts';

const TestCountdownContainer = styled.div`
    text-align: center;
    padding: 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 300px;
    margin: 0 auto;
    color: black;
`;

const CountdownText = styled.h2`
    font-size: 24px;
    font-weight: bold;
`;

const FunFactText = styled.p`
    font-size: 16px;
    margin-top: 10px;
`;

interface FactData {
    fact: string;
}

interface TestCountdownProps {
    handleTestCountdown: () => void;
    duration_seconds: number;
}

const RANDOM_FACT_API_URL = 'https://api.api-ninjas.com/v1/facts';

export default function TestCountdown(props: TestCountdownProps) {
    const [funFact, setFunFact] = React.useState('');
    const { timeRemainingInSeconds, startTimer, resetTimer } = useTimer(
        props.duration_seconds,
        props.handleTestCountdown
    );

    React.useEffect(() => {
        const apiKey = 'JZDgzZNFXjQ2o7glprpbPg==kRpmEoxXi5UALX0e';
        const options = {
            method: 'GET',
            headers: { 'X-Api-Key': apiKey }
        };
        tryFetchData(RANDOM_FACT_API_URL, options).then((data: FactData[]) => {
            setFunFact(data[0].fact);
            startTimer();
        });
    }, [startTimer]);

    return (
        <TestCountdownContainer data-testid='cypress-test-countdown-container'>
            <CountdownText>
                Recall begins in
                <Timer timeInSeconds={timeRemainingInSeconds} />
            </CountdownText>
            <FunFactText>Did you know ... {funFact}</FunFactText>
            <Button
                data-testid='cypress-skip-button'
                className='skip-button'
                onClick={() => {
                    resetTimer();
                    props.handleTestCountdown();
                }}>
                Skip
            </Button>
        </TestCountdownContainer>
    );
}
