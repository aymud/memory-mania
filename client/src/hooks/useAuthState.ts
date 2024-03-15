import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext.tsx';

export const useAuthState = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuthState must be used within an AuthProvider.');
    }

    return context;
};
