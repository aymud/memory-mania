import React from 'react';
import styled from 'styled-components';

import UserCard from './components/UserCard.tsx';
import ScoreMessage from './components/ScoreMessage.tsx';
import TestCountdown from './components/TestCountdown.tsx';
import Timer from './components/Timer.tsx';
import Button from './components/Button.tsx';
import Navbar from './components/Navbar.tsx';
import LoadingSpinner from './components/LoadingSpinner.tsx';
import { useGameState } from './hooks/useGameState.ts';

const UserCardsContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
    padding: 20px;
`;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin-top: 50px;
`;

const TEST_WAITING_TIME_IN_SECONDS = 10;
const MINIMUM_SCORE_FOR_NEXT_LEVEL_PERCENTAGE = 0.6;

export default function App() {
    const gameState = useGameState();
    const isTestingPhase = !gameState.isLearningPhase && !gameState.isWaitingTestStart && !gameState.isLevelOver;
    const userNames = gameState.randomUsers.map(user => user.name.first);
    const randomUserElements = gameState.randomUsers.map(user => (
        <UserCard
            key={user.id.value}
            handleOnChange={gameState.handleNameEntered}
            user={user}
            allUserNames={userNames}
            isLearning={gameState.isLearningPhase}
            isLevelOver={gameState.isLevelOver}
        />
    ));

    React.useEffect(() => {
        if (!isTestingPhase) return;
        gameState.startTestingPhaseTimer();
    }, [isTestingPhase, gameState.startTestingPhaseTimer, gameState]);

    if (gameState.isRandomUsersLoading) {
        return <LoadingSpinner />;
    }

    return (
        <React.Fragment>
            <Navbar level={gameState.currentLevel} />
            <Main>
                {gameState.isWaitingTestStart ? (
                    <TestCountdown
                        handleTestCountdown={gameState.handleTestCountdown}
                        duration_seconds={TEST_WAITING_TIME_IN_SECONDS}
                    />
                ) : (
                    <UserCardsContainer>{randomUserElements}</UserCardsContainer>
                )}
                {gameState.isLearningPhase && (
                    <React.Fragment>
                        <Timer timeInSeconds={gameState.learningPhaseTimeRemainingInSeconds} />
                        <Button onClick={gameState.handleTestStart}>Test</Button>
                    </React.Fragment>
                )}
                {isTestingPhase && (
                    <React.Fragment>
                        <Timer timeInSeconds={gameState.testingPhaseTimeRemainingInSeconds} />
                        <Button onClick={gameState.handleTestSubmit}>Finish Test</Button>
                    </React.Fragment>
                )}
                {gameState.isLevelOver && (
                    <React.Fragment>
                        <ScoreMessage
                            correctAnswersCount={gameState.getScore()}
                            totalUsers={gameState.randomUsers.length}
                            level={gameState.currentLevel}
                        />
                        {gameState.getScore() / gameState.numOfRandomUsers >=
                        MINIMUM_SCORE_FOR_NEXT_LEVEL_PERCENTAGE ? (
                            <Button onClick={gameState.handleGameNextLevel}>Next Level</Button>
                        ) : (
                            <Button onClick={gameState.handleGameRestart}>Restart Test</Button>
                        )}
                    </React.Fragment>
                )}
            </Main>
        </React.Fragment>
    );
}
