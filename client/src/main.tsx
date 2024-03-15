import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App.tsx';
import StartMenu from './routes/StartMenu.tsx';
import Profile from './routes/Profile.tsx';
import Login from './routes/Login.tsx';
import PrivateRoute from './routes/PrivateRoute.tsx';
import './index.css';
import AuthProvider from './context/AuthContext.tsx';

const root: HTMLElement = document.getElementById('root') ?? document.createElement('div');

ReactDOM.createRoot(root).render(
    <React.StrictMode>
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
    </React.StrictMode>
);
