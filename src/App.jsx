import React from 'react'
import './App.css'
import UserCard from "./components/UserCard.jsx";
import ScoreMessage from "./components/ScoreMessage.jsx";

const RANDOM_USER_GENERATOR_API_URL = "https://randomuser.me/api/"
const NUM_OF_USERS_TO_SHOW = 10

export default function App() {

    const [randomUsers, setRandomUsers] = React.useState([])
    const [isLearning, setIsLearning] = React.useState(true)
    const [enteredNames, setEnteredNames] = React.useState([])
    const [isGameOver, setIsGameOver] = React.useState(false)
    const [correctAnswersCount, setCorrectAnswersCount] = React.useState(0)

    function fetchRandomUserData(numOfResults = NUM_OF_USERS_TO_SHOW) {
        const apiParams = "?format=JSON&nat=CA,US&results=" + numOfResults
        fetch(RANDOM_USER_GENERATOR_API_URL + apiParams)
            .then((response) => response.json())
            .then((data) => {
                setRandomUsers(data.results);
            })
            .catch((error) => {
                console.error("Error fetching random user data:", error);
            });
    }

    React.useEffect(() => {
        fetchRandomUserData();
    }, [])

    const randomUserElements = randomUsers.map(user =>
        (<UserCard key={user.id.value}
                   handleOnChange={handleNameEntered}
                   user={user}
                   isLearning={isLearning}
                   isGameOver={isGameOver}
        />)
    )

    function handleTest() {
        setIsLearning(false)
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

    function handleGameRestart() {
        setIsLearning(true)
        setIsGameOver(false)
        setEnteredNames([])
        fetchRandomUserData();
    }

    return (
        <main>
            <div className="user-cards-container">
                {randomUserElements}
            </div>
            {isLearning && <button className="test-button" onClick={handleTest}>Test</button>}
            {!isLearning && !isGameOver &&
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