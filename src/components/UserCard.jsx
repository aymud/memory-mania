import React from "react";

export default function UserCard(props) {
    return (
        <div className="user-card">
            <img className="user-image" src={props.user.picture.large} alt="User"/>
            {props.isMemorizing ?
                <div className="user-name">{props.user.name.first}</div> :
                <input
                    type="text"
                    placeholder="Enter Name"
                    // value={enteredName}
                    onChange={(event) => props.handleOnChange(event.target.value, props.user.id.value)}
                />
            }
        </div>
    )
}