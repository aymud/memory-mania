// @ts-expect-error: React is needed for the App component.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from '../../App.tsx';
import AuthProvider from '../../context/AuthContext.tsx';
import Login from '../../routes/Login.tsx';
import PrivateRoute from '../../routes/PrivateRoute.tsx';
import Profile from '../../routes/Profile.tsx';
import StartMenu from '../../routes/StartMenu.tsx';

it('renders without crashing', () => {
    const root: HTMLElement = document.getElementById('root') ?? document.createElement('div');

    ReactDOM.createRoot(root).render(
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<PrivateRoute />}>
                        <Route element={<App />} path='/app' />
                    </Route>
                    <Route element={<Login />} path='/login' />
                    <Route element={<Profile />} path='/profile' />
                    <Route element={<StartMenu />} path='*' />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
});
