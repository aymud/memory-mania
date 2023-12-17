import { Outlet, Navigate } from 'react-router-dom'
import AuthenticationService from "../utils/authentication.js";

const PrivateRoute = () => {
    return(
        // @ts-ignore
        AuthenticationService.isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute;