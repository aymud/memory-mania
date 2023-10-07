import React from 'react'
import './App.css'
import UserCard from "./components/UserCard.jsx";

const RANDOM_USER_GENERATOR_API_URL = "https://randomuser.me/api/?format=JSON&results=2&nat=CA,US"

export default function App() {

    const [randomUsers, setRandomUsers] = React.useState([])
    const [isMemorizing, setIsMemorizing] = React.useState(true)
    const [enteredNames, setEnteredNames] = React.useState([])

    React.useEffect(() => {
        fetch(RANDOM_USER_GENERATOR_API_URL)
            .then((response) => response.json())
            .then((data) => {
                setRandomUsers(data.results);
            })
            .catch((error) => {
                console.error("Error fetching random user data:", error);
            });
    }, [])

    const randomUserElements = randomUsers.map(user =>
        (<UserCard key={user.id.value}
                   user={user}
                   isMemorizing={isMemorizing}
                   handleOnChange={handleNameEntered}/>)
    )

    function handleTest() {
        setIsMemorizing(false)
    }

    function handleTestSubmit() {
        let correctCount = 0;
        let totalUsers = 0;

        // Iterate over randomUsers and check if the entered names match.
        randomUsers.forEach((randomUser) => {
            const userId = randomUser.id.value;
            const enteredUser = enteredNames.find((enteredUser) => enteredUser.id === userId);

            // Check if a user with the same ID exists in enteredNames.
            if (enteredUser) {
                totalUsers++;

                // Compare entered name (case-insensitive) with actual name.
                const isNameCorrect = enteredUser.name.trim().toLowerCase() === randomUser.name.first.toLowerCase()
                if (isNameCorrect) {
                    correctCount++;
                }
            }
        });

        // TODO: CLEAN UP; Provide feedback to the player.
        alert(`You got ${correctCount} names correct out of ${totalUsers}.`);

        setIsMemorizing(true);
    }

    function handleNameEntered(name, id) {
        setEnteredNames((prevEnteredNames) => {
            // Check if the user with the same ID already exists in the array.
            // If the user exists, update their name, else add a new user to the array.
            const userIndex = prevEnteredNames.findIndex((user) => user.id === id);
            if (userIndex !== -1) {
                prevEnteredNames[userIndex].name = name;
            } else {
                prevEnteredNames.push({ id: id, name: name });
            }
            return [...prevEnteredNames];
        });
    }

    return (
        <React.Fragment>
            <div className="user-cards-container">
                {randomUserElements}
            </div>
            {isMemorizing && <button onClick={handleTest}>Test</button>}
            {!isMemorizing && <button onClick={handleTestSubmit}>Finish Test</button>}
        </React.Fragment>
    )
}