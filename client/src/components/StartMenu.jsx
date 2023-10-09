import React from "react";
import Instructions from "./Instructions.jsx";

export default function StartMenu(props) {

    const [showInstructions, setShowInstructions] = React.useState(false);

    function toggleInstructions() {
        setShowInstructions(prevShowInstructions => !prevShowInstructions);
    }

    return (
        <div className="start-menu">
            <h1 className="game-title">Memory Mania</h1>
            <button className="menu-button" onClick={props.onStartGame}>
                Start Game
            </button>
            <button className="menu-button" onClick={toggleInstructions}>
                Instructions
            </button>
            {showInstructions && <Instructions OnToggle={toggleInstructions}/>}
        </div>
    );
}