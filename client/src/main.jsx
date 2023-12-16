import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from './App.jsx'
import StartMenu from "./components/StartMenu.jsx";
import Login from "./pages/Login.jsx";
import PrivateRoute from "./pages/PrivateRoute.jsx";
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