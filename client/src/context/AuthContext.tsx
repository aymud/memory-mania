import { createContext, ReactNode, useState } from 'react';

import AuthenticationService from '../utils/authentication.ts';

interface AuthContextType {
    isAuthenticated: boolean;
    user: string | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const DEFAULT_STATE: AuthContextType = {
    isAuthenticated: false,
    user: null,
    login: () => false,
    logout: () => {}
};

export const AuthContext = createContext(DEFAULT_STATE);

export default function AuthProvider(props: AuthProviderProps) {
    const [state, setState] = useState<AuthContextType>({ ...DEFAULT_STATE });

    const login = (username: string, password: string) => {
        if (AuthenticationService.login(username, password)) {
            setState({ ...state, user: username, isAuthenticated: true });
            return true;
        } else {
            return false;
        }
    };

    const logout = () => {
        AuthenticationService.logout();
        setState(prevState => ({ ...prevState, isAuthenticated: false }));
    };

    return <AuthContext.Provider value={{ ...state, login, logout }}>{props.children}</AuthContext.Provider>;
}
