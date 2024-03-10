import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import StartMenu from './components/StartMenu.tsx'
import Profile from './pages/Profile.tsx'
import Login from './pages/Login.tsx'
import PrivateRoute from './pages/PrivateRoute.tsx'
import './index.css'

const root: HTMLElement =
    document.getElementById('root') ?? document.createElement('div')

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route element={<App />} path='/app' />
                </Route>
                <Route element={<Login />} path='/login' />
                <Route element={<Profile />} path='/profile' />
                <Route element={<StartMenu />} path='*' />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)