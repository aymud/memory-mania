import { createContext, ReactNode, useState } from 'react';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { darkTheme, lightTheme, Theme } from '../themes.ts';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const DEFAULT_STATE: ThemeContextType = {
    theme: darkTheme,
    toggleTheme: () => {}
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType>({ ...DEFAULT_STATE });

export default function ThemeProvider(props: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(DEFAULT_STATE.theme);

    const toggleTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <StyledThemeProvider theme={theme}>{props.children}</StyledThemeProvider>
        </ThemeContext.Provider>
    );
}
