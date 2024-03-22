import React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Instructions from '../components/Instructions.tsx';
import Navbar from '../components/Navbar.tsx';

const StyledStartMenu = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.backgroundColor};
`;

const GameTitle = styled.h1`
    font-size: 8rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: ${props => props.theme.color};
`;

const MenuButton = styled.button`
    padding: 10px 20px;
    background-color: ${props => props.theme.menuButtonBackgroundColor};
    color: ${props => props.theme.color};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    font-size: 20px;
    transition: background-color 0.3s;
    width: 150px;

    &:hover {
        background-color: ${props => props.theme.menuButtonHoverBackgroundColor};
    }
`;

export default function StartMenu() {
    const navigate = useNavigate();
    const [showInstructions, setShowInstructions] = React.useState(false);

    function toggleInstructions() {
        setShowInstructions(prevShowInstructions => !prevShowInstructions);
    }

    function handleStartGame() {
        navigate('/app');
    }

    return (
        <React.Fragment>
            <Navbar />
            <StyledStartMenu>
                <GameTitle data-testid='cypress-main-title'>Memory Mania</GameTitle>
                <MenuButton data-testid='cypress-start-game-button' onClick={handleStartGame}>
                    Start Game
                </MenuButton>
                <MenuButton data-testid='cypress-instructions-button' onClick={toggleInstructions}>
                    Instructions
                </MenuButton>
                {showInstructions && <Instructions OnToggle={toggleInstructions} />}
            </StyledStartMenu>
        </React.Fragment>
    );
}
