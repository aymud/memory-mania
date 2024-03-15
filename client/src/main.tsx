import React from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App.tsx';
import AuthProvider from './context/AuthContext.tsx';
import Login from './routes/Login.tsx';
import PrivateRoute from './routes/PrivateRoute.tsx';
import Profile from './routes/Profile.tsx';
import StartMenu from './routes/StartMenu.tsx';
import './index.css';
import ThemeProvider from './context/ThemeContext.tsx';

const root: HTMLElement = document.getElementById('root') ?? document.createElement('div');

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ThemeProvider>
                    <Routes>
                        <Route element={<StartMenu />} path='/' />
                        <Route element={<Login />} path='/login' />
                        <Route element={<PrivateRoute />}>
                            <Route element={<App />} path='/app' />
                            <Route element={<Profile />} path='/profile' />
                        </Route>
                        <Route element={<StartMenu />} path='*' />
                    </Routes>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
