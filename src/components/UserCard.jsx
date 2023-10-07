import React from "react";

export default function UserCard(props) {
    return (
        <div>
            <img src={props.user.picture.large} alt="User" />
            <p>Name: {`${props.user.name.first} ${props.user.name.last}`}</p>
        </div>
    )
}