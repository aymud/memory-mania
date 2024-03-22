import React, { forwardRef } from 'react';

import styled from 'styled-components';

import NameDropdown from './NameDropdown.tsx';
import { IUserCard } from '../types.ts';

const UserCardWrapper = styled.div<{ $withOpacity: boolean; $isDragging: boolean }>`
    grid-gap: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    opacity: ${props => (props.$withOpacity ? '0.5' : '1')};
    cursor: ${props => (props.$isDragging ? 'grabbing' : 'grab')};
    box-shadow: ${({ $isDragging }) =>
        $isDragging
            ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px'
            : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px'};
    transform: ${({ $isDragging }) => ($isDragging ? 'scale(1.05)' : 'scale(1)')};
    transform-origin: 50% 50%;
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
    color: ${props => props.theme.cardTextColor};
`;

const ResultText = styled.div<{ $isCorrect: boolean }>`
    color: ${props => (props.$isCorrect ? 'green' : 'red')};
`;

const UserCard = forwardRef<HTMLDivElement, IUserCard>((props, ref) => {
    const {
        withOpacity,
        isDragging,
        cardTransformStyle,
        handleOnChange,
        isLearning,
        isLevelOver,
        user,
        allUserNames,
        ...restProps
    } = props;
    const [currentName, setCurrentName] = React.useState('');

    const nameInput = (
        <NameDropdown
            user={user}
            allNames={allUserNames}
            setCurrentName={setCurrentName}
            handleOnChange={handleOnChange}
            isLevelOver={isLevelOver}
        />
    );

    const gameResults = isLevelOver && (
        <ResultText $isCorrect={currentName === user.firstName.toLowerCase()} data-testid='result-text'>
            {user.firstName}
        </ResultText>
    );

    return (
        <UserCardWrapper
            data-testid='cypress-user-card'
            $withOpacity={withOpacity}
            $isDragging={isDragging}
            style={cardTransformStyle}
            ref={ref}
            {...restProps}>
            <UserImg src={user.pictureURL} alt='User' />
            {isLearning ? <UserName>{user.firstName}</UserName> : nameInput}
            {gameResults}
        </UserCardWrapper>
    );
});

UserCard.displayName = 'UserCard';
export default UserCard;
