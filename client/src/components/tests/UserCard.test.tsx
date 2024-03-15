// @ts-expect-error: React is needed for the App component.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import UserCard from '../UserCard.tsx';

describe('UserCard Component', () => {
    const mockUser = {
        name: {
            first: 'John'
        },
        picture: {
            large: 'image.jpg'
        },
        id: {
            value: '123'
        }
    };

    const mockAllUserNames = ['John', 'Jane', 'Doe'];
    const mockHandleOnChange = jest.fn();

    test('renders UserCard with user info', () => {
        render(
            <UserCard
                user={mockUser}
                allUserNames={mockAllUserNames}
                handleOnChange={mockHandleOnChange}
                isLevelOver={false}
                isLearning={true}
            />
        );

        const userNameElement = screen.getByText('John');
        expect(userNameElement).toBeInTheDocument();
        // NameDropdown should not be present in learning mode.
        expect(screen.queryByRole('combobox')).toBeNull();
    });

    test('renders UserCard with NameDropdown in testing mode', () => {
        render(
            <UserCard
                user={mockUser}
                allUserNames={mockAllUserNames}
                handleOnChange={mockHandleOnChange}
                isLevelOver={false}
                isLearning={false}
            />
        );

        const nameDropdown = screen.getByRole('combobox');
        expect(nameDropdown).toBeInTheDocument();
    });

    test('handles name selection and calls callback in testing mode', () => {
        render(
            <UserCard
                user={mockUser}
                allUserNames={mockAllUserNames}
                handleOnChange={mockHandleOnChange}
                isLevelOver={false}
                isLearning={false}
            />
        );

        const nameDropdown = screen.getByRole('combobox');

        fireEvent.change(nameDropdown, { target: { value: 'Jane' } });

        expect(mockHandleOnChange).toHaveBeenCalledWith('jane', '123');
    });

    test('renders UserCard with game results when game is over', () => {
        render(
            <UserCard
                user={mockUser}
                allUserNames={mockAllUserNames}
                handleOnChange={mockHandleOnChange}
                isLevelOver={true}
                isLearning={false}
            />
        );

        // Simulate selecting the correct name from the dropdown.
        const nameDropdown = screen.getByRole('combobox');
        fireEvent.change(nameDropdown, { target: { value: 'John' } });

        // Verify that the game result text is present with correct styling.
        const gameResultText = screen.getByTestId('result-text');
        expect(gameResultText).toBeInTheDocument();
        expect(gameResultText).toHaveStyle('color: green');
    });

    test('incorrect name: renders UserCard with game results when game is over', () => {
        render(
            <UserCard
                user={mockUser}
                allUserNames={mockAllUserNames}
                handleOnChange={mockHandleOnChange}
                isLevelOver={true}
                isLearning={false}
            />
        );

        const nameDropdown = screen.getByRole('combobox');
        fireEvent.change(nameDropdown, { target: { value: 'Jane' } });

        const gameResultText = screen.getByTestId('result-text');
        expect(gameResultText).toBeInTheDocument();
        expect(gameResultText).toHaveStyle('color: red');
    });

    test('no name selected: renders UserCard with game results when game is over', () => {
        render(
            <UserCard
                user={mockUser}
                allUserNames={mockAllUserNames}
                handleOnChange={mockHandleOnChange}
                isLevelOver={true}
                isLearning={false}
            />
        );

        const gameResultText = screen.getByTestId('result-text');
        expect(gameResultText).toBeInTheDocument();
        expect(gameResultText).toHaveStyle('color: red');
    });
});
