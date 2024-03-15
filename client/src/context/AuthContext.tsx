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
        const storedData = sessionStorage.getItem('auth_data');
        if (storedData) {
            const { user, token } = JSON.parse(storedData);
            if (token) {
                setState(prevState => ({ ...prevState, user, isAuthenticated: true }));
            }
        }
    }, []);

    const login = (username: string, password: string) => {
        if (username === 'user' && password === 'password') {
            const token = '123';
            const authData = JSON.stringify({ user: username, token });
            sessionStorage.setItem('auth_data', authData);
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
