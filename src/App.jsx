import React from 'react'
import './App.css'
import UserCard from "./components/UserCard.jsx";
import ScoreMessage from "./components/ScoreMessage.jsx";
import TestCountdown from "./components/TestCountdown.jsx";
import {tryFetchData} from "./utils/apiHelper.js";
import {shuffleArray} from "./utils/manipulation.js";
import StartMenu from "./components/StartMenu.jsx";

const RANDOM_USER_GENERATOR_API_URL = "https://randomuser.me/api/"
const NUM_OF_USERS_TO_SHOW = 10

export default function App() {

    /* The game is divided into a learning phase and a testing phase.
       In the learning phase, the player will memorize the faces and names.
       Then there is a small wait before the test begins.
     */
    const [isGameStarted, setIsGameStarted] = React.useState(false);
    const [randomUsers, setRandomUsers] = React.useState([])
    const [isLearningPhase, setIsLearningPhase] = React.useState(false)
    const [isWaitingTestStart, setIsWaitingTestStart] = React.useState(false)
    const [isGameOver, setIsGameOver] = React.useState(false)
    const [enteredNames, setEnteredNames] = React.useState([])
    const [correctAnswersCount, setCorrectAnswersCount] = React.useState(0)

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
                   isLearning={isLearningPhase}
                   isGameOver={isGameOver}
        />)
    )

    function handleStartGame() {
        setIsGameStarted(true);
        handleGameRestart()
    }

    function handleGameRestart() {
        setIsLearningPhase(true)
        setIsGameOver(false)
        setEnteredNames([])
    }

    function handleTestCountdown() {
        const shuffledRandomUsers = shuffleArray([...randomUsers])
        setRandomUsers(shuffledRandomUsers)
        setIsWaitingTestStart(false)
    }

    function handleTestStart() {
        setIsLearningPhase(false)
        setIsWaitingTestStart(true)
    }

    function handleTestSubmit() {
        let correctCount = 0;

        // Iterate over randomUsers and check if the entered names match, and update score.
        randomUsers.forEach((randomUser) => {
            const userId = randomUser.id.value;
            const enteredUser = enteredNames.find((enteredUser) => enteredUser.id === userId);

            if (enteredUser) {
                const isNameCorrect = enteredUser.name === randomUser.name.first.toLowerCase()
                if (isNameCorrect) {
                    correctCount++;
                }
            }
        });

        setCorrectAnswersCount(correctCount)
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

    return (
        <main>
            {!isGameStarted && <StartMenu onStartGame={handleStartGame} />}
            {isWaitingTestStart ? <TestCountdown handleTestCountdown={handleTestCountdown}/> :
                <div className="user-cards-container">
                    {randomUserElements}
                </div>
            }
            {isLearningPhase && <button className="test-button" onClick={handleTestStart}>Test</button>}
            {isGameStarted && !isLearningPhase && !isWaitingTestStart && !isGameOver &&
                <button className="submit-button" onClick={handleTestSubmit}>Finish Test</button>}
            {isGameOver && (
                <React.Fragment>
                    <ScoreMessage correctAnswersCount={correctAnswersCount} totalUsers={randomUsers.length}/>
                    <button className="restart-button" onClick={handleGameRestart}>Restart Test</button>
                </React.Fragment>
            )
            }
        </main>
    )
}