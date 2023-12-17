import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from './App.tsx'
import StartMenu from "./components/StartMenu.tsx";
import Login from "./pages/Login.tsx";
import PrivateRoute from "./pages/PrivateRoute.tsx";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoute/>}>
                    <Route element={<App/>} path="/app" exact/>
                </Route>
                <Route element={<Login/>} path="/login"/>
                <Route element={<StartMenu/>} path="*"/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);