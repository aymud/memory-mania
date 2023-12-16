import React from 'react';
import './login.css'

export default function Login() {
    const [isTooltipDisplayed, setIsTooltipDisplayed] = React.useState(false);

    const handleTooltipToggle = () => {
        setIsTooltipDisplayed(prevIsTooltipDisplayed => !prevIsTooltipDisplayed);
    };

    return (<div className="login-container">
        <h2>Login</h2>
        <form className="login-form">
            <input type="text"
                   className="form-input"
                   placeholder="Username"
                   required
                   onFocus={handleTooltipToggle}
                   onBlur={handleTooltipToggle}/>
            <input type="password"
                   className="form-input"
                   placeholder="Password"
                   required
                   onFocus={handleTooltipToggle}
                   onBlur={handleTooltipToggle}/>
            <button type="submit" className="form-submit">Login</button>
        </form>
        {isTooltipDisplayed && (
            <div className="tooltip">
                <p>Use "username" for the username and "password" for the password.</p>
            </div>
        )}
    </div>);
}