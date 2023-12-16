import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import App from './App.jsx'
import Login from './pages/Login.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/app" element={<App/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<Navigate to="/login"/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);