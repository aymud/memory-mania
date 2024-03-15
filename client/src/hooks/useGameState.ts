import React from 'react';

import { useRandomUsers } from './useRandomUsers.ts';
import useTimer from './useTimer.ts';
import { shuffleArray } from '../utils/manipulation.ts';


interface EnteredNamesType {
    id: string;
    name: string;
    isCorrect?: boolean;
}

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

const STARTING_LEVEL = 1;
const LEARNING_PHASE_DURATION_IN_SECONDS = 180;
const TESTING_PHASE_DURATION_IN_SECONDS = 180;
const NUM_OF_USERS_TO_ADD_PER_LEVEL = 2;
const NUM_OF_USERS_TO_SHOW = NUM_OF_USERS_TO_ADD_PER_LEVEL + STARTING_LEVEL;

/* The game is divided into a learning phase and a testing phase.
   Each phase has a time limit.
   In the learning phase, the player will memorize the faces and names.
 */
export const useGameState = () => {
    const storedCurrentLevel = sessionStorage.getItem('currentLevel');
    const parsedCurrentLevel = storedCurrentLevel ? parseInt(storedCurrentLevel) : STARTING_LEVEL;
    const [currentLevel, setCurrentLevel] = React.useState(parsedCurrentLevel);
    const [numOfRandomUsers, setNumOfRandomUsers] = React.useState(2 * currentLevel + 1);
    const [enteredNames, setEnteredNames] = React.useState<EnteredNamesType[]>([]);
    const [isLevelOver, setIsLevelOver] = React.useState(false);
    const [isLearningPhase, setIsLearningPhase] = React.useState(true);
    const [isWaitingTestStart, setIsWaitingTestStart] = React.useState(false);

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
    const saveGameState = (currentLevel: number) => {
        sessionStorage.setItem('currentLevel', String(currentLevel));
    };

    const updateCurrentLevel = (level: number) => {
        setCurrentLevel(level);
        saveGameState(level);
    };

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

    function getScore() {
        return enteredNames.filter(user => user.isCorrect).length;
    }

    return {
        currentLevel,
        setCurrentLevel,
        numOfRandomUsers,
        setNumOfRandomUsers,
        enteredNames,
        setEnteredNames,
        isLevelOver,
        setIsLevelOver,
        isLearningPhase,
        setIsLearningPhase,
        isWaitingTestStart,
        setIsWaitingTestStart,
        learningPhaseTimeRemainingInSeconds,
        testingPhaseTimeRemainingInSeconds,
        startTestingPhaseTimer,
        randomUsers,
        setRandomUsers,
        isRandomUsersLoading,
        saveGameState,
        updateCurrentLevel,
        handleGameRestart,
        handleTestCountdown,
        handleTestStart,
        handleTestSubmit,
        handleNameEntered,
        handleGameNextLevel,
        getScore
    };
};
