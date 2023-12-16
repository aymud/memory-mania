import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthenticationService from "./utils/authentication.js";
import App from './App.jsx'
import Login from "./pages/Login.jsx";
import './index.css'

const isUserAuthenticated = AuthenticationService.isAuthenticated;

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {isUserAuthenticated ? <App/> : <Login/>}
    </React.StrictMode>,
)