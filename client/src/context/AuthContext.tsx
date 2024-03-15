import { createContext, ReactNode, useEffect, useState } from 'react';

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

    useEffect(() => {
        const token = sessionStorage.getItem('access_token');
        if (token) {
            setState(prevState => ({ ...prevState, isAuthenticated: true }));
        }
    }, []);

    const login = (username: string, password: string) => {
        if (username === 'user' && password === 'password') {
            sessionStorage.setItem('access_token', '123');
            setState({ ...state, user: username, isAuthenticated: true });
            return true;
        } else {
            return false;
        }
    };

    const logout = () => {
        sessionStorage.removeItem('access_token');
        setState(prevState => ({ ...prevState, isAuthenticated: false }));
    };

    return <AuthContext.Provider value={{ ...state, login, logout }}>{props.children}</AuthContext.Provider>;
}
