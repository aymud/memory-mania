import React, { createContext, ReactNode, useState } from 'react';

const THEME_TYPE = {
    DARK: 'DARK',
    LIGHT: 'LIGHT'
} as const;

type ThemeType = (typeof THEME_TYPE)[keyof typeof THEME_TYPE];

interface ThemeContextType {
    theme: ThemeType;
    setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
}

const DEFAULT_STATE: ThemeContextType = {
    theme: THEME_TYPE.DARK,
    setTheme: () => {}
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType>(DEFAULT_STATE);

export default function ThemeProvider(props: ThemeProviderProps) {
    const [theme, setTheme] = useState<ThemeType>('DARK');

    return <ThemeContext.Provider value={{ theme, setTheme }}>{props.children}</ThemeContext.Provider>;
}
