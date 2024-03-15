import React from 'react';
import styled from 'styled-components';

import UserCard from './components/UserCard.tsx';
import ScoreMessage from './components/ScoreMessage.tsx';
import TestCountdown from './components/TestCountdown.tsx';
import Timer from './components/Timer.tsx';
import { shuffleArray } from './utils/manipulation.ts';
import Button from './components/Button.tsx';
import Navbar from './components/Navbar.tsx';
import useTimer from './hooks/useTimer.ts';
import LoadingSpinner from './components/LoadingSpinner.tsx';
import { useRandomUsers } from './hooks/useRandomUsers.ts';

const STARTING_LEVEL = 1;
const NUM_OF_USERS_TO_ADD_PER_LEVEL = 2;
const NUM_OF_USERS_TO_SHOW = NUM_OF_USERS_TO_ADD_PER_LEVEL + STARTING_LEVEL;
const LEARNING_PHASE_DURATION_IN_SECONDS = 180;
const TEST_WAITING_TIME_IN_SECONDS = 10;
const TESTING_PHASE_DURATION_IN_SECONDS = 180;
const MINIMUM_SCORE_FOR_NEXT_LEVEL_PERCENTAGE = 0.6;

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

interface UserType {
    name: {
        first: string;
    };
    picture: {
        large: string;
        thumbnail: string;
    };
    id: {
        value: string;
    };
}

interface EnteredNamesType {
    id: string;
    name: string;
    isCorrect?: boolean;
}

export default function App() {
    /* The game is divided into a learning phase and a testing phase.
       Each phase has a time limit.
       In the learning phase, the player will memorize the faces and names.
     */
    const storedCurrentLevel = sessionStorage.getItem('currentLevel');
    const parsedCurrentLevel = storedCurrentLevel ? parseInt(storedCurrentLevel) : STARTING_LEVEL;
    const [currentLevel, setCurrentLevel] = React.useState(parsedCurrentLevel);
    const [numOfRandomUsers, setNumOfRandomUsers] = React.useState(2 * currentLevel + 1);
    const [isLevelOver, setIsLevelOver] = React.useState(false);
    const [isLearningPhase, setIsLearningPhase] = React.useState(true);
    const [isWaitingTestStart, setIsWaitingTestStart] = React.useState(false);
    const isTestingPhase = !isLearningPhase && !isWaitingTestStart && !isLevelOver;
    const [enteredNames, setEnteredNames] = React.useState<EnteredNamesType[]>([]);
    const {
        timeRemainingInSeconds: learningPhaseTimeRemainingInSeconds,
        startTimer: startLearningPhaseTimer,
        resetTimer: resetLearningPhaseTimer
    } = useTimer(LEARNING_PHASE_DURATION_IN_SECONDS, handleTestStart);
    const {
        timeRemainingInSeconds: testingPhaseTimeRemainingInSeconds,
        startTimer: startTestingPhaseTimer,
        resetTimer: resetTestingPhaseTimer
    } = useTimer(TESTING_PHASE_DURATION_IN_SECONDS, handleTestSubmit);
    const {
        randomUsers,
        setRandomUsers,
        isLoading: isRandomUsersLoading,
        setIsLoading
    } = useRandomUsers(numOfRandomUsers, isLearningPhase, startLearningPhaseTimer);
    const userNames = randomUsers.map(user => user.name.first);
    const randomUserElements = randomUsers.map((user: UserType) => (
        <UserCard
            key={user.id.value}
            handleOnChange={handleNameEntered}
            user={user}
            allUserNames={userNames}
            isLearning={isLearningPhase}
            isLevelOver={isLevelOver}
        />
    ));

    const saveGameState = (currentLevel: number) => {
        sessionStorage.setItem('currentLevel', String(currentLevel));
    };

    const updateCurrentLevel = (level: number) => {
        setCurrentLevel(level);
        saveGameState(level);
    };

    React.useEffect(() => {
        if (!isTestingPhase) return;
        startTestingPhaseTimer();
    }, [isTestingPhase, startTestingPhaseTimer]);

    function handleGameRestart() {
        setIsLearningPhase(true);
        setIsLoading(true);
        setEnteredNames([]);
        resetLearningPhaseTimer();
        resetTestingPhaseTimer();
        setNumOfRandomUsers(NUM_OF_USERS_TO_SHOW);
        setIsLevelOver(false);
        updateCurrentLevel(1);
    }

    function handleTestCountdown() {
        // Shuffling the array, to make the test harder and display the users in a random order.
        const shuffledRandomUsers = shuffleArray([...randomUsers]);
        setRandomUsers(shuffledRandomUsers);
        setIsWaitingTestStart(false);
    }

    function handleTestStart() {
        setIsLearningPhase(false);
        setIsWaitingTestStart(true);
    }

    function handleTestSubmit() {
        // Iterate over randomUsers and check if the entered names match, and update score.
        const namesValidated: EnteredNamesType[] = enteredNames.map(actualUser => {
            const expectedUser = randomUsers.find((user: UserType) => user.id.value === actualUser.id);
            if (expectedUser) {
                const isNameCorrect = actualUser.name === expectedUser.name.first.toLowerCase();
                return {
                    ...actualUser,
                    isCorrect: isNameCorrect
                };
            } else {
                // User did not enter a name for this person.
                return {
                    ...actualUser,
                    isCorrect: false
                };
            }
        });
        setEnteredNames(namesValidated);
        setIsLevelOver(true);
    }

    function handleNameEntered(name: string, id: string) {
        setEnteredNames(prevEnteredNames => {
            // Check if the user with the same ID already exists in the array.
            // If the user exists, update their name, else add a new user to the array.
            const userIndex = prevEnteredNames.findIndex(user => user.id === id);
            if (userIndex !== -1) {
                prevEnteredNames[userIndex].name = name;
            } else {
                prevEnteredNames.push({ id, name });
            }
            return [...prevEnteredNames];
        });
    }

    function getScore() {
        return enteredNames.filter(user => user.isCorrect).length;
    }

    function handleGameNextLevel() {
        setIsLearningPhase(true);
        setIsLoading(true);
        setEnteredNames([]);
        resetLearningPhaseTimer();
        resetTestingPhaseTimer();
        setIsLevelOver(false);
        setNumOfRandomUsers(prevNumOfRandomUsers => prevNumOfRandomUsers + NUM_OF_USERS_TO_ADD_PER_LEVEL);
        updateCurrentLevel(currentLevel + 1);
    }

    if (isRandomUsersLoading) {
        return <LoadingSpinner />;
    }

    return (
        <React.Fragment>
            <Navbar level={currentLevel} />
            <Main>
                {isWaitingTestStart ? (
                    <TestCountdown
                        handleTestCountdown={handleTestCountdown}
                        duration_seconds={TEST_WAITING_TIME_IN_SECONDS}
                    />
                ) : (
                    <UserCardsContainer>{randomUserElements}</UserCardsContainer>
                )}
                {isLearningPhase && (
                    <React.Fragment>
                        <Timer timeInSeconds={learningPhaseTimeRemainingInSeconds} />
                        <Button onClick={handleTestStart}>Test</Button>
                    </React.Fragment>
                )}
                {isTestingPhase && (
                    <React.Fragment>
                        <Timer timeInSeconds={testingPhaseTimeRemainingInSeconds} />
                        <Button onClick={handleTestSubmit}>Finish Test</Button>
                    </React.Fragment>
                )}
                {isLevelOver && (
                    <React.Fragment>
                        <ScoreMessage
                            correctAnswersCount={getScore()}
                            totalUsers={randomUsers.length}
                            level={currentLevel}
                        />
                        {getScore() / numOfRandomUsers >= MINIMUM_SCORE_FOR_NEXT_LEVEL_PERCENTAGE ? (
                            <Button onClick={handleGameNextLevel}>Next Level</Button>
                        ) : (
                            <Button onClick={handleGameRestart}>Restart Test</Button>
                        )}
                    </React.Fragment>
                )}
            </Main>
        </React.Fragment>
    );
}
