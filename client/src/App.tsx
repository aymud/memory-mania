import React from 'react';

import styled from 'styled-components';

import Button from './components/Button.tsx';
import LoadingSpinner from './components/LoadingSpinner.tsx';
import Navbar from './components/Navbar.tsx';
import ScoreMessage from './components/ScoreMessage.tsx';
import TestCountdown from './components/TestCountdown.tsx';
import Timer from './components/Timer.tsx';
import { useGameState } from './hooks/useGameState.ts';
import { ThemedAppContainer } from './components/ThemedAppContainer.tsx';
import DragDropUserCardContainer from './components/DragDropUserCardContainer.tsx';
import SortableCard from './components/SortableCard.tsx';

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
    const randomUserElements = gameState.randomUsers.map(user => (
        <SortableCard
            key={user.id.value}
            id={user.id.value}
            handleOnChange={gameState.handleNameEntered}
            user={user}
            allUserNames={gameState.userNames}
            isLearning={gameState.isLearningPhase}
            isLevelOver={gameState.isLevelOver}
        />
    ));

    if (gameState.isRandomUsersLoading) {
        return <LoadingSpinner />;
    }

    return (
        <ThemedAppContainer>
            <Navbar level={gameState.currentLevel} />
            <Main>
                {gameState.isWaitingTestStart ? (
                    <TestCountdown
                        handleTestCountdown={gameState.handleTestCountdown}
                        duration_seconds={TEST_WAITING_TIME_IN_SECONDS}
                    />
                ) : (
                    <DragDropUserCardContainer>{randomUserElements}</DragDropUserCardContainer>
                )}
                {gameState.isLearningPhase && (
                    <React.Fragment>
                        <Timer timeInSeconds={gameState.learningPhaseTimeRemainingInSeconds} />
                        <Button data-testid='cypress-test-button' onClick={gameState.handleTestStart}>
                            Test
                        </Button>
                    </React.Fragment>
                )}
                {gameState.isTestingPhase && (
                    <React.Fragment>
                        <Timer timeInSeconds={gameState.testingPhaseTimeRemainingInSeconds} />
                        <Button data-testid='cypress-finish-test-button' onClick={gameState.handleTestSubmit}>
                            Finish Test
                        </Button>
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
                            <Button data-testid='cypress-next-level-button' onClick={gameState.handleGameNextLevel}>
                                Next Level
                            </Button>
                        ) : (
                            <Button onClick={gameState.handleGameRestart}>Restart Test</Button>
                        )}
                    </React.Fragment>
                )}
            </Main>
        </ThemedAppContainer>
    );
}
