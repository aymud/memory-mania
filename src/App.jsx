import React from 'react'
import './App.css'
import UserCard from "./components/UserCard.jsx";

const RANDOM_USER_GENERATOR_API_URL = 'https://randomuser.me/api/?format=JSON&results=10&nat=CA,US'

export default function App() {

    const [randomUsers, setRandomUsers] = React.useState([])

    React.useEffect(() => {
        fetch(RANDOM_USER_GENERATOR_API_URL)
            .then((response) => response.json())
            .then((data) => {
                setRandomUsers(data.results);
            })
            .catch((error) => {
                console.error('Error fetching random user data:', error);
            });
    }, [])

    const randomUserElements = randomUsers.map(user =>
        (<UserCard key={user.id.value}
                   user={user}/>)
    )

    return (
        <div className="user-cards-container">
            {randomUserElements}
        </div>
    )
}