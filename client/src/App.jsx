import React from 'react'
import styled from "styled-components";
import './App.css'
import UserCard from "./components/UserCard.jsx";
import ScoreMessage from "./components/ScoreMessage.jsx";
import TestCountdown from "./components/TestCountdown.jsx";
// import Leaderboard from "./components/Leaderboard.jsx";
import {tryFetchData} from "./utils/apiHelper.js";
import {shuffleArray} from "./utils/manipulation.js";
import Button from "./components/Button.jsx";

const RANDOM_USER_GENERATOR_API_URL = "https://randomuser.me/api/"
const NUM_OF_USERS_TO_SHOW = 3
const LEARNING_PHASE_DURATION_IN_SECONDS = 180
const MINIMUM_SCORE_FOR_NEXT_LEVEL_PERCENTAGE = 0.6
const NUM_OF_USERS_TO_ADD_PER_LEVEL = 2

const TestCountdownText = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  margin: 0 auto;
`

const UserCardsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  padding: 20px;
`

export default function App() {

    /* The game is divided into a learning phase and a testing phase.
       In the learning phase, the player will memorize the faces and names.
       Then there is a small wait before the test begins.
     */
    const [numOfRandomUsers, setNumOfRandomUsers] = React.useState(NUM_OF_USERS_TO_SHOW)
    const [currentLevel, setCurrentLevel] = React.useState(1)
    const [isLevelOver, setIsLevelOver] = React.useState(false)
    const [randomUsers, setRandomUsers] = React.useState([])
    const [isLearningPhase, setIsLearningPhase] = React.useState(true)
    const [isWaitingTestStart, setIsWaitingTestStart] = React.useState(false)
    // const [showHighScore, setShowHighScore] = React.useState(false)
    const [enteredNames, setEnteredNames] = React.useState([])
    const userNames = randomUsers.map(user => user.name.first)
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

        // Note: The api can sometimes return duplicate images in a set.
        // To only show unique users, we get more users than needed.
        // then we remove any duplicates and return the correct amount of unique users needed.
        const apiParams = "?format=JSON&nat=CA,US&results=" + (numOfRandomUsers * 2)
        tryFetchData(RANDOM_USER_GENERATOR_API_URL + apiParams)
            .then((data) => {
                setRandomUsers(getDistinctUsers(data.results))
            })
    }, [isLearningPhase, numOfRandomUsers])

    const randomUserElements = randomUsers.map(user =>
        (<UserCard key={user.id.value}
                   handleOnChange={handleNameEntered}
                   user={user}
                   allUserNames={userNames}
                   isLearning={isLearningPhase}
                   isLevelOver={isLevelOver}
        />)
    )

    function handleGameRestart() {
        setIsLearningPhase(true)
        setEnteredNames([])
        setLearningPhaseTimeRemainingInSeconds(LEARNING_PHASE_DURATION_IN_SECONDS)
        setNumOfRandomUsers(NUM_OF_USERS_TO_SHOW)
        setIsLevelOver(false)
        setCurrentLevel(1)
    }

    function getDistinctUsers(data) {
        // Distinct user := unique user picture.

        const userPictures = new Set()
        const distinctUsers = []

        for (const user of data) {
            const picture = user.picture.thumbnail

            // Only add a user to the list if there isn't already a user with that picture.
            if (userPictures.has(picture)) {
                continue;
            }
            distinctUsers.push(user)
            userPictures.add(picture)

            if (distinctUsers.length === numOfRandomUsers) {
                break;
            }
        }
        return distinctUsers
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
        setEnteredNames(namesValidated)
        setIsLevelOver(true)
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
        return enteredNames.filter((user) => user.isCorrect).length
    }

    // function toggleHighScores() {
    //     setShowHighScore(prevShowHighScore => !prevShowHighScore);
    // }

    function handleGameNextLevel() {
        setIsLearningPhase(true)
        setEnteredNames([])
        setLearningPhaseTimeRemainingInSeconds(LEARNING_PHASE_DURATION_IN_SECONDS)
        setIsLevelOver(false)
        setNumOfRandomUsers(prevNumOfRandomUsers => prevNumOfRandomUsers + NUM_OF_USERS_TO_ADD_PER_LEVEL)
        setCurrentLevel(prevLevel => prevLevel + 1)
    }

    return (
        <main>
            {isWaitingTestStart ? <TestCountdown handleTestCountdown={handleTestCountdown}/> :
                <UserCardsContainer>
                    {randomUserElements}
                </UserCardsContainer>}
            {isLearningPhase &&
                <TestCountdownText> {learningPhaseTimeRemainingInSeconds} seconds remaining</TestCountdownText>
            }
            {isLearningPhase && <Button onClick={handleTestStart}>Test</Button>}
            {!isLearningPhase && !isWaitingTestStart && !isLevelOver &&
                <Button onClick={handleTestSubmit}>Finish Test</Button>
            }
            {isLevelOver &&
                <ScoreMessage correctAnswersCount={getScore()} totalUsers={randomUsers.length} level={currentLevel}/>}
            {isLevelOver && getScore() / numOfRandomUsers >= MINIMUM_SCORE_FOR_NEXT_LEVEL_PERCENTAGE &&
                <Button onClick={handleGameNextLevel}>Next Level</Button>
            }
            {isLevelOver && getScore() / numOfRandomUsers < MINIMUM_SCORE_FOR_NEXT_LEVEL_PERCENTAGE &&
                <React.Fragment>
                    <Button onClick={handleGameRestart}>Restart Test</Button>
                    {/*<button className="highscore-button" onClick={toggleHighScores}>View/Submit High Scores</button>*/}
                    {/*{showHighScore && <Leaderboard toggleHighScores={toggleHighScores} userScore={getScore()} />}*/}
                </React.Fragment>
            }
        </main>
    )
}