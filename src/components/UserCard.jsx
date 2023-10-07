import React from "react";


export default function UserCard(props) {
    return (
        <div className="user-card">
            <img className="user-image" src={props.user.picture.large} alt="User" />
            <div className="user-name">{props.user.name.first}</div>
        </div>
    )
}