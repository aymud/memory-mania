import React from "react";
import Instructions from "./Instructions.jsx";
import { useState } from "react";

export default function StartMenu(props) {
  const [isStartButtonClicked, setIsStartButtonClicked] = useState(false);

  function handleStartGameInstructions() {
    props.toggleInstructions();
    setIsStartButtonClicked(true);
  }

  function handleInstructions() {
    props.toggleInstructions();
    setIsStartButtonClicked(false);
  }

  return (
    <div className="start-menu">
      <h1 className="game-title">Memory Mania</h1>
      <button className="menu-button" onClick={handleStartGameInstructions}>
        Start Game
      </button>
      <button className="menu-button" onClick={handleInstructions}>
        Instructions
      </button>
      {props.showInstructions && (
        <Instructions
          isStartButtonClicked={isStartButtonClicked}
          OnToggle={props.toggleInstructions}
          gameStart={props.onStartGame}
        />
      )}
    </div>
  );
}
