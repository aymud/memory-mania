import { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext.tsx';

export const UseTheme = () => {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('UseTheme must be used within an ThemeProvider.');
    }

    return context;
};
