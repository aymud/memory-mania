import React from "react";
import NameDropdown from "./NameDropdown.jsx";

export default function UserCard(props) {

    const [currentName, setCurrentName] = React.useState('')

    const nameInput = <NameDropdown user={props.user}
                                    allNames={props.allUserNames}
                                    setCurrentName={setCurrentName}
                                    handleOnChange={props.handleOnChange}
                                    isGameOver={props.isGameOver}

    />

    const gameResults =
        props.isGameOver
        && <div className={currentName === props.user.name.first.toLowerCase() ?
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