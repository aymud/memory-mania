import React from 'react'
import styled from 'styled-components'
import Instructions from './Instructions.tsx'
import { useNavigate } from 'react-router-dom'

const StyledStartMenu = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const GameTitle = styled.h1`
    font-size: 8rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: white;
`

const MenuButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    font-size: 20px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`

export default function StartMenu() {
    const navigate = useNavigate()
    const [showInstructions, setShowInstructions] = React.useState(false)

    function toggleInstructions() {
        setShowInstructions(prevShowInstructions => !prevShowInstructions)
    }

    function handleStartGame() {
        navigate('/login')
    }

    return (
        <StyledStartMenu>
            <GameTitle>Memory Mania</GameTitle>
            <MenuButton onClick={handleStartGame}>Start Game</MenuButton>
            <MenuButton onClick={toggleInstructions}>Instructions</MenuButton>
            {showInstructions && <Instructions OnToggle={toggleInstructions} />}
        </StyledStartMenu>
    )
}
