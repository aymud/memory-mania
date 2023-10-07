export default function StartMenu(props) {
    return (
        <div className="start-menu">
            <h1 className="game-title">Memory Mania</h1>
            <button className="start-button" onClick={props.onStartGame}>
                Start Game
            </button>
        </div>
    );
}