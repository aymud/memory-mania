import { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext.tsx';

export const UseThemeState = () => {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('UseThemeState must be used within an ThemeProvider.');
    }

    return context;
};
