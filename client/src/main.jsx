import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import App from './App.jsx'
import Login from './pages/Login.jsx';
import PrivateRoutes from "./pages/PrivateRoute.jsx";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoutes/>}>
                    <Route element={<App/>} path="/app" exact/>
                </Route>
                <Route element={<Login/>} path="*"/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);