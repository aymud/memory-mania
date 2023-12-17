import React from 'react'
import { useNavigate } from 'react-router-dom'
import AuthenticationService from '../utils/authentication.ts'
import styled from 'styled-components'

const BodyWrapper = styled.div`
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: relative;
`

const LoginContainer = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 300px;
    text-align: center;
`

const Title = styled.h2`
    color: #333;
`

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`

const FormInput = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
`

const FormSubmit = styled.button`
    background-color: #4caf50;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #45a049;
    }
`

const Tooltip = styled.div`
    position: absolute;
    background-color: #333;
    color: #fff;
    padding: 8px;
    border-radius: 4px;
    margin-top: 5px;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default function Login() {
    const navigate = useNavigate()
    const [isTooltipDisplayed, setIsTooltipDisplayed] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleTooltipToggle = () => {
        setIsTooltipDisplayed(
            (prevIsTooltipDisplayed) => !prevIsTooltipDisplayed
        )
    }

    const handleLogin = () => {
        if (AuthenticationService.login(username, password)) {
            navigate('/app')
        }
    }

    return (
        <BodyWrapper>
            <LoginContainer>
                <Title>Login</Title>
                <LoginForm>
                    <FormInput
                        type="text"
                        className="form-input"
                        placeholder="Username"
                        required
                        autoComplete="on"
                        onFocus={handleTooltipToggle}
                        onBlur={handleTooltipToggle}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <FormInput
                        type="password"
                        className="form-input"
                        placeholder="Password"
                        required
                        autoComplete="on"
                        onFocus={handleTooltipToggle}
                        onBlur={handleTooltipToggle}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <FormSubmit
                        onClick={handleLogin}
                        type="submit"
                        className="form-submit"
                    >
                        Login
                    </FormSubmit>
                </LoginForm>
                {isTooltipDisplayed && (
                    <Tooltip>
                        <p>
                            Use &quot;user&quot; for the username and
                            &quot;password&quot; for the password.
                        </p>
                    </Tooltip>
                )}
            </LoginContainer>
        </BodyWrapper>
    )
}