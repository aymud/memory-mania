import { Outlet, Navigate } from 'react-router-dom'
import AuthenticationService from "../utils/authentication.js";

const PrivateRoutes = () => {
    return(
        AuthenticationService.isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes;