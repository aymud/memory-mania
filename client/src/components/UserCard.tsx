import React from 'react';

import styled from 'styled-components';

import NameDropdown from './NameDropdown.tsx';

const UserCardWrapper = styled.div`
    grid-gap: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
`;

const UserImg = styled.img`
    max-width: 100%;
    height: auto;
    border-radius: 10px 10px 10px 10px;
`;
const UserName = styled.div`
    font-weight: bold;
    margin-top: 10px;
    font-size: 18px;
`;

const ResultText = styled.div<{ $isCorrect: boolean }>`
    color: ${props => (props.$isCorrect ? 'green' : 'red')};
`;

interface User {
    name: {
        first: string;
    };
    picture: {
        large: string;
    };
    id: {
        value: string;
    };
}

interface UserCardProps {
    user: User;
    allUserNames: string[];
    handleOnChange: (name: string, id: string) => void;
    isLevelOver: boolean;
    isLearning: boolean;
}

export default function UserCard(props: UserCardProps) {
    const [currentName, setCurrentName] = React.useState('');

    const nameInput = (
        <NameDropdown
            user={props.user}
            allNames={props.allUserNames}
            setCurrentName={setCurrentName}
            handleOnChange={props.handleOnChange}
            isLevelOver={props.isLevelOver}
        />
    );

    const gameResults = props.isLevelOver && (
        <ResultText $isCorrect={currentName === props.user.name.first.toLowerCase()} data-testid='result-text'>
            {props.user.name.first}
        </ResultText>
    );

    return (
        <UserCardWrapper data-testid='cypress-user-card'>
            <UserImg src={props.user.picture.large} alt='User' />
            {props.isLearning ? <UserName>{props.user.name.first}</UserName> : nameInput}
            {gameResults}
        </UserCardWrapper>
    );
}
