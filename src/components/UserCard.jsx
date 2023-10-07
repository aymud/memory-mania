export default function UserCard(props) {

    return (
        <div className="user-card">
            <img className="user-image" src={props.user.picture.large} alt="User"/>
            {props.isLearning ?
                <div className="user-name">{props.user.name.first}</div> :
                <input
                    disabled={props.isGameOver}
                    type="text"
                    placeholder="Enter Name"
                    // value={nameEntered}
                    onChange={(event) => props.handleOnChange(event.target.value, props.user.id.value)}
                />
            }
        </div>
    )
}