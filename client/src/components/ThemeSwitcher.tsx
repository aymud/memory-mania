import { Button } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { UseTheme } from '../hooks/useTheme.ts';
import { lightTheme } from '../themes.ts';

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = UseTheme();
    return (
        <Button aria-label='Toggle Color Mode' onClick={toggleTheme} _focus={{ boxShadow: 'none' }} w='fit-content'>
            {theme === lightTheme ? <MoonIcon color='black' /> : <SunIcon />}
        </Button>
    );
}
