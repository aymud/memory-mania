import React from "react";
import NameInput from "./NameInput.jsx";

export default function UserCard(props) {

    const [nameEntered, setNameEntered] = React.useState('')

    const nameInput = <NameInput user={props.user}
                                 isGameOver={props.isGameOver}
                                 setNameEntered={setNameEntered}
                                 handleOnChange={props.handleOnChange}
    />

    const gameResults =
        props.isGameOver
        && <div className={nameEntered === props.user.name.first.toLowerCase() ?
            "name-correct" : "name-incorrect"}>
            {props.user.name.first}
        </div>

    return (
        <div className="user-card">
            <img className="user-image" src={props.user.picture.large} alt="User"/>
            {props.isLearning ?
                <div className="user-name">{props.user.name.first}</div> :
                nameInput
            }
            {gameResults}
        </div>
    )
}