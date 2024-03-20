import React, { CSSProperties, forwardRef } from 'react';

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
    id: string;
    withOpacity?: boolean;
    isDragging?: boolean;
    style: CSSProperties;
}

const UserCard = forwardRef<HTMLDivElement, UserCardProps>(({ withOpacity, isDragging, style, ...props }, ref) => {
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

    const inlineStyles: CSSProperties = {
        opacity: withOpacity ? '0.5' : '1',
        transformOrigin: '50% 50%',
        cursor: isDragging ? 'grabbing' : 'grab',
        boxShadow: isDragging
            ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px'
            : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        ...style
    };

    return (
        <UserCardWrapper data-testid='cypress-user-card' ref={ref} style={inlineStyles} {...props}>
            <UserImg src={props.user.picture.large} alt='User' />
            {props.isLearning ? <UserName>{props.user.name.first}</UserName> : nameInput}
            {gameResults}
        </UserCardWrapper>
    );
});

UserCard.displayName = 'UserCard';
export default UserCard;
