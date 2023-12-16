import React from 'react';
import {useNavigate} from 'react-router-dom';
import AuthenticationService from "../utils/authentication.js";
import './login.css'

export default function Login() {
    const navigate = useNavigate();
    const [isTooltipDisplayed, setIsTooltipDisplayed] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleTooltipToggle = () => {
        setIsTooltipDisplayed(prevIsTooltipDisplayed => !prevIsTooltipDisplayed);
    };

    const handleLogin = () => {
        if (AuthenticationService.login(username, password)) {
            navigate('/app');
        }
    };

    return (<div className="login-container">
        <h2>Login</h2>
        <form className="login-form">
            <input type="text"
                   className="form-input"
                   placeholder="Username"
                   required
                   autoComplete="on"
                   onFocus={handleTooltipToggle}
                   onBlur={handleTooltipToggle}
                   onChange={(event) => setUsername(event.target.value)}
            />
            <input type="password"
                   className="form-input"
                   placeholder="Password"
                   required
                   autoComplete="on"
                   onFocus={handleTooltipToggle}
                   onBlur={handleTooltipToggle}
                   onChange={(event) => setPassword(event.target.value)}
            />
            <button onClick={handleLogin} type="submit" className="form-submit">Login</button>
        </form>
        {isTooltipDisplayed && (
            <div className="tooltip">
                <p>Use "user" for the username and "password" for the password.</p>
            </div>
        )}
    </div>);
}