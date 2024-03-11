import { Outlet, Navigate } from 'react-router-dom';
import AuthenticationService from '../utils/authentication.ts';

const PrivateRoute = () => {
    return AuthenticationService.isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
