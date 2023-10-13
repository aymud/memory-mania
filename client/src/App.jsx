import React from 'react'
import './App.css'
import UserCard from "./components/UserCard.jsx";
import ScoreMessage from "./components/ScoreMessage.jsx";
import TestCountdown from "./components/TestCountdown.jsx";
import StartMenu from "./components/StartMenu.jsx";
import {tryFetchData} from "./utils/apiHelper.js";
import {shuffleArray} from "./utils/manipulation.js";

const RANDOM_USER_GENERATOR_API_URL = "https://randomuser.me/api/"
const NUM_OF_USERS_TO_SHOW = 10
const LEARNING_PHASE_DURATION_IN_SECONDS = 180

export default function App() {

    /* The game is divided into a learning phase and a testing phase.
       In the learning phase, the player will memorize the faces and names.
       Then there is a small wait before the test begins.
     */
    const [randomUsers, setRandomUsers] = React.useState([])
    const userNames = randomUsers.map(user => user.name.first);
    const [isGameStarted, setIsGameStarted] = React.useState(false);
    const [isLearningPhase, setIsLearningPhase] = React.useState(false)
    const [isWaitingTestStart, setIsWaitingTestStart] = React.useState(false)
    const [isGameOver, setIsGameOver] = React.useState(false)
    const [enteredNames, setEnteredNames] = React.useState([])
    const [learningPhaseTimeRemainingInSeconds, setLearningPhaseTimeRemainingInSeconds] = React.useState(LEARNING_PHASE_DURATION_IN_SECONDS)

    React.useEffect(() => {
        if (!isLearningPhase) return

        const timerIntervalInMilliSeconds = 1000
        const interval = setInterval(() => {
            if (learningPhaseTimeRemainingInSeconds > 0) {
                const newTime = learningPhaseTimeRemainingInSeconds - 1
                setLearningPhaseTimeRemainingInSeconds(newTime)
            } else {
                clearInterval(interval)
                handleTestStart()
            }
        }, timerIntervalInMilliSeconds);
        return () => clearInterval(interval);
    }, [isLearningPhase, learningPhaseTimeRemainingInSeconds])

    React.useEffect(() => {
        if (!isLearningPhase) return

        // BUG: SOMETIMES THERE ARE DUPLICATES!!!!!!!!!
        // Filtered on nationality because then the names get too hard :p
        const apiParams = "?format=JSON&nat=CA,US&results=" + NUM_OF_USERS_TO_SHOW
        tryFetchData(RANDOM_USER_GENERATOR_API_URL + apiParams)
            .then((data) => {
                setRandomUsers(data.results);
            })
    }, [isLearningPhase])

    const randomUserElements = randomUsers.map(user =>
        (<UserCard key={user.id.value}
                   handleOnChange={handleNameEntered}
                   user={user}
                   allUserNames={userNames}
                   isLearning={isLearningPhase}
                   isGameOver={isGameOver}
        />)
    )

    function handleGameRestart() {
        setIsLearningPhase(true)
        setIsGameOver(false)
        setEnteredNames([])
        setLearningPhaseTimeRemainingInSeconds(LEARNING_PHASE_DURATION_IN_SECONDS)
    }

    function handleStartGame() {
        setIsGameStarted(true);
        handleGameRestart()
    }

    function handleTestCountdown() {
        // Shuffling the array, to make the test harder and display the users is a random order.
        const shuffledRandomUsers = shuffleArray([...randomUsers])
        setRandomUsers(shuffledRandomUsers)
        setIsWaitingTestStart(false)
    }

    function handleTestStart() {
        setIsLearningPhase(false)
        setIsWaitingTestStart(true)
    }

    function handleTestSubmit() {
        // Iterate over randomUsers and check if the entered names match, and update score.
        const namesValidated = enteredNames.map((actualUser) => {
            const expectedUser = randomUsers.find((user) => user.id.value === actualUser.id);
            if (expectedUser) {
                const isNameCorrect = actualUser.name === expectedUser.name.first.toLowerCase();
                return {
                    ...actualUser,
                    isCorrect: isNameCorrect,
                }
            } else {
                // User did not enter a name for this person.
                return {actualUser, isCorrect: false}
            }
        })
        setEnteredNames(namesValidated);
        setIsGameOver(true)
    }

    function handleNameEntered(name, id) {
        setEnteredNames((prevEnteredNames) => {
            // Check if the user with the same ID already exists in the array.
            // If the user exists, update their name, else add a new user to the array.
            const userIndex = prevEnteredNames.findIndex((user) => user.id === id);
            if (userIndex !== -1) {
                prevEnteredNames[userIndex].name = name;
            } else {
                prevEnteredNames.push({id: id, name: name});
            }
            return [...prevEnteredNames];
        });
    }

    function getScore() {
        const correctCount = enteredNames.filter((user) => user.isCorrect).length
        return correctCount
    }


    return (
        <main>
            {!isGameStarted && <StartMenu onStartGame={handleStartGame}/>}
            {isWaitingTestStart ? <TestCountdown handleTestCountdown={handleTestCountdown}/> :
                <div className="user-cards-container">
                    {randomUserElements}
                </div>}
            {isLearningPhase &&
                <p className="test-countdown-container"> {learningPhaseTimeRemainingInSeconds} seconds remaining</p>
            }
            {isLearningPhase && <button className="test-button" onClick={handleTestStart}>Test</button>}
            {isGameStarted && !isLearningPhase && !isWaitingTestStart && !isGameOver &&
                <button className="submit-button" onClick={handleTestSubmit}>Finish Test</button>
            }
            {isGameOver && (
                <React.Fragment>
                    <ScoreMessage correctAnswersCount={getScore()} totalUsers={randomUsers.length}/>
                    <button className="restart-button" onClick={handleGameRestart}>Restart Test</button>

                </React.Fragment>
            )
            }
        </main>
    )
}