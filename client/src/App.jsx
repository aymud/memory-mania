import React from 'react'
import './App.css'
import UserCard from "./components/UserCard.jsx";
import ScoreMessage from "./components/ScoreMessage.jsx";
import TestCountdown from "./components/TestCountdown.jsx";
import StartMenu from "./components/StartMenu.jsx";
// import Leaderboard from "./components/Leaderboard.jsx";
import {tryFetchData} from "./utils/apiHelper.js";
import {shuffleArray} from "./utils/manipulation.js";

const RANDOM_USER_GENERATOR_API_URL = "https://randomuser.me/api/"
const NUM_OF_USERS_TO_SHOW = 3
const LEARNING_PHASE_DURATION_IN_SECONDS = 180
const MINIMUM_SCORE_FOR_NEXT_LEVEL_PERCENTAGE = 0.6
const NUM_OF_USERS_TO_ADD_PER_LEVEL = 2

export default function App() {

    /* The game is divided into a learning phase and a testing phase.
       In the learning phase, the player will memorize the faces and names.
       Then there is a small wait before the test begins.
     */
    const [numOfRandomUsers, setNumOfRandomUsers] = React.useState(NUM_OF_USERS_TO_SHOW)
    const [currentLevel, setCurrentLevel] = React.useState(1)
    const [isLevelOver, setIsLevelOver] = React.useState(false)
    const [randomUsers, setRandomUsers] = React.useState([])
    const [isGameStarted, setIsGameStarted] = React.useState(false)
    const [isLearningPhase, setIsLearningPhase] = React.useState(false)
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

        // BUG: SOMETIMES THERE ARE DUPLICATES!!!!!!!!!
        // Filtered on nationality because then the names get too hard :p
        
        
        const apiParams = "?format=JSON&nat=CA,US&results=" + (numOfRandomUsers * 2)
        tryFetchData(RANDOM_USER_GENERATOR_API_URL + apiParams)
            .then((data) => {
                console.log(data.results)
                const randomUsers = checkImageDuplicates(data.results)
                setRandomUsers(randomUsers);
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

    function handleStartGame() {
        setIsGameStarted(true);
        handleGameRestart()
    }

   

    function checkImageDuplicates(data){
        const picList = {}
        const result = []

        data.every((x,i) => {
            if(result.length==numOfRandomUsers){
                return false
            }
            if (x.picture.large in picList){
                console.log("dup found")
            }else{
            result.push(x)
            picList[x.picture.large] = 1
            }

            return true

        })
        
        return result
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
        const correctCount = enteredNames.filter((user) => user.isCorrect).length
        return correctCount
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
            {!isGameStarted && <StartMenu onStartGame={handleStartGame}/>}
            {isWaitingTestStart ? <TestCountdown handleTestCountdown={handleTestCountdown}/> :
                <div className="user-cards-container">
                    {randomUserElements}
                </div>}
            {isLearningPhase &&
                <p className="test-countdown-container"> {learningPhaseTimeRemainingInSeconds} seconds remaining</p>
            }
            {isLearningPhase && <button className="test-button" onClick={handleTestStart}>Test</button>}
            {isGameStarted && !isLearningPhase && !isWaitingTestStart && !isLevelOver &&
                <button className="submit-button" onClick={handleTestSubmit}>Finish Test</button>
            }
            {isLevelOver && <ScoreMessage correctAnswersCount={getScore()} totalUsers={randomUsers.length} level={currentLevel}/>}
            {isLevelOver && getScore() / numOfRandomUsers >= MINIMUM_SCORE_FOR_NEXT_LEVEL_PERCENTAGE &&
                <button className="next-button" onClick={handleGameNextLevel}>Next Level</button>
            }
            {isLevelOver && getScore() / numOfRandomUsers < MINIMUM_SCORE_FOR_NEXT_LEVEL_PERCENTAGE &&
                <React.Fragment>
                    <button className="restart-button" onClick={handleGameRestart}>Restart Test</button>
                    {/*<button className="highscore-button" onClick={toggleHighScores}>View/Submit High Scores</button>*/}
                    {/*{showHighScore && <Leaderboard toggleHighScores={toggleHighScores} userScore={getScore()} />}*/}
                </React.Fragment>
            }
        </main>
    )
}