import React from "react";

export default function UserCard(props) {

    const [nameEntered, setNameEntered] = React.useState('')

    const nameInput =
        <input
            disabled={props.isGameOver}
            type="text"
            placeholder="Enter Name"
            // value={nameEntered}
            onChange={(event) => {
                const name = event.target.value.trim().toLowerCase()
                setNameEntered(name)
                props.handleOnChange(name, props.user.id.value)
            }
            }
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