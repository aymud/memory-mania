import React from "react";

export default function NameInput(props) {
    return (
        <input
            disabled={props.isGameOver}
            type="text"
            placeholder="Enter Name"
            // value={nameEntered}
            onChange={(event) => {
                const name = event.target.value.trim().toLowerCase()
                props.setNameEntered(name)
                props.handleOnChange(name, props.user.id.value)
            }
            }
        />
    )
}