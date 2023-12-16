import React from "react";
import Instructions from "./Instructions.jsx";
import {useNavigate} from "react-router-dom";

export default function StartMenu() {
    const navigate = useNavigate();
    const [showInstructions, setShowInstructions] = React.useState(false);

    function toggleInstructions() {
        setShowInstructions(prevShowInstructions => !prevShowInstructions);
    }

    function handleStartGame() {
        navigate('/login');
    }

    return (
        <div className="start-menu">
            <h1 className="game-title">Memory Mania</h1>
            <button className="menu-button" onClick={handleStartGame}>
                Start Game
            </button>
            <button className="menu-button" onClick={toggleInstructions}>
                Instructions
            </button>
            {showInstructions && <Instructions OnToggle={toggleInstructions}/>}
        </div>
    );
}