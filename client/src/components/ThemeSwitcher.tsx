import { useContext } from 'react';

import styled from 'styled-components';

import { ThemeContext } from '../context/ThemeContext.tsx';

const StyledButton = styled.button<{ $theme: string }>`
    background-color: ${props => (props.$theme === 'DARK' ? '#333' : '#eee')};
    color: ${props => (props.$theme === 'DARK' ? '#fff' : '#333')};
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    transition:
        background-color 0.3s,
        color 0.3s;
    position: relative;
    overflow: hidden;
    display: inline-block;
    white-space: nowrap;

    &:hover {
        background-color: ${props => (props.$theme === 'DARK' ? '#444' : '#ddd')};
    }
`;

export default function ThemeSwitcher() {
    const { theme, setTheme } = useContext(ThemeContext);
    const toggleTheme = () => {
        setTheme(theme === 'DARK' ? 'LIGHT' : 'DARK');
    };

    return (
        <StyledButton $theme={theme} onClick={toggleTheme}>
            Switch to {theme === 'DARK' ? 'LIGHT' : 'DARK'} mode
        </StyledButton>
    );
}
