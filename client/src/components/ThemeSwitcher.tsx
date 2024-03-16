import styled from 'styled-components';

import { UseTheme } from '../hooks/useTheme.ts';
import { lightTheme, Theme } from '../themes.ts';

const StyledButton = styled.button<{
    $theme: Theme;
}>`
    background-color: ${props => props.$theme.backgroundColor};
    color: ${props => props.$theme.color};
    border: 1px solid ${props => props.$theme.buttonBorderColor};
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
        background-color: ${props => props.$theme.backgroundColor};
    }
`;

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = UseTheme();

    return (
        <StyledButton $theme={theme} onClick={toggleTheme}>
            Switch to {theme === lightTheme ? 'DARK' : 'LIGHT'} mode
        </StyledButton>
    );
}
