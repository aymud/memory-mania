import '@testing-library/jest-dom/';
import { act, renderHook } from '@testing-library/react';

import { useAuthState } from '../../hooks/useAuthState.ts';
import AuthProvider from '../AuthContext.tsx';

let sessionStorageMock: Record<string, string | null> = {};

describe('AuthProvider', () => {
    beforeEach(() => {
        sessionStorageMock = {};
        Object.defineProperty(window, 'sessionStorage', {
            value: {
                getItem: jest.fn(key => sessionStorageMock[key]),
                setItem: jest.fn((key, value) => {
                    sessionStorageMock[key] = value;
                }),
                removeItem: jest.fn(key => {
                    delete sessionStorageMock[key];
                }),
                clear: jest.fn(() => {
                    Object.keys(sessionStorageMock).forEach(key => {
                        delete sessionStorageMock[key];
                    });
                })
            },
            writable: true
        });
    });

    beforeEach(() => {
        window.sessionStorage.clear();
    });

    it('logs in successfully with correct credentials and saves auth data in storage', async () => {
        const { result } = renderHook(() => useAuthState(), {
            wrapper: AuthProvider
        });

        act(() => {
            result.current.login('user', 'password');
        });

        expect(result.current.isAuthenticated).toBe(true);
        expect(result.current.user).toBe('user');

        // Check if the auth data is stored in sessionStorage after login.
        expect(window.sessionStorage.setItem).toHaveBeenCalled();
        expect(sessionStorageMock['auth_data']).toEqual(JSON.stringify({ user: 'user', token: '123' }));
    });

    it('does not log in with incorrect credentials', async () => {
        const { result } = renderHook(() => useAuthState(), {
            wrapper: AuthProvider
        });

        act(() => {
            result.current.login('wronguser', 'wrongpassword');
        });

        expect(result.current.isAuthenticated).toBe(false);
        expect(result.current.user).toBe(null);

        // Check if nothing is stored in storage failed attempt.
        expect(window.sessionStorage.setItem).not.toHaveBeenCalled();
        expect(sessionStorageMock['auth_data']).toEqual(undefined);
    });

    it('logs out successfully and removes auth data from session storage', async () => {
        const { result } = renderHook(() => useAuthState(), {
            wrapper: AuthProvider
        });

        act(() => {
            result.current.login('user', 'password');
        });

        expect(result.current.isAuthenticated).toBe(true);

        act(() => {
            result.current.logout();
        });

        expect(result.current.isAuthenticated).toBe(false);
        expect(result.current.user).toBe(null);

        // Check if the auth state is removed from sessionStorage after logout.
        expect(window.sessionStorage.removeItem).toHaveBeenCalled();
        expect(sessionStorageMock['auth_data']).toBeUndefined();
    });
});
