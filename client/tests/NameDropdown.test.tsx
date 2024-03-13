// @ts-expect-error: React is needed for the App component.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import NameDropdown from '../src/components/NameDropdown.tsx';

describe('NameDropdown Component', () => {
    const mockNames = ['John', 'Jane', 'Doe'];
    const mockUser = {
        id: {
            value: '123'
        }
    };
    const mockSetCurrentName = jest.fn();
    const mockHandleOnChange = jest.fn();
    let rerender: (ui: ReactNode | null) => void;

    beforeEach(() => {
        ({ rerender } = render(
            <NameDropdown
                allNames={mockNames}
                isLevelOver={false}
                setCurrentName={mockSetCurrentName}
                handleOnChange={mockHandleOnChange}
                user={mockUser}
            />
        ));
    });

    test('renders the dropdown with options', () => {
        const dropdown = screen.getByRole('combobox');
        const options = screen.getAllByRole('option');

        expect(dropdown).toBeInTheDocument();

        // + 1 because = Options + default "Select a name" option.
        expect(options).toHaveLength(mockNames.length + 1);

        // Check if options match the provided names.
        const sortedMockNames = mockNames.slice().sort();
        sortedMockNames.forEach((name, index) => {
            // Index + 1 to skip the default option.
            expect(options[index + 1]).toHaveTextContent(name);
        });
    });

    test('handles name selection and calls callbacks', () => {
        const dropdown = screen.getByRole('combobox');

        fireEvent.change(dropdown, { target: { value: 'Jane' } });

        expect(dropdown).toHaveValue('Jane');
        expect(mockSetCurrentName).toHaveBeenCalledWith('jane');
        expect(mockHandleOnChange).toHaveBeenCalledWith('jane', '123');
    });

    test('disables the dropdown when level is over', () => {
        // Use rerender to update the component when level is over.
        rerender(
            <NameDropdown
                allNames={mockNames}
                isLevelOver={true}
                setCurrentName={mockSetCurrentName}
                handleOnChange={mockHandleOnChange}
                user={mockUser}
            />
        );

        const dropdown = screen.getByRole('combobox');
        expect(dropdown).toBeDisabled();
    });
});
