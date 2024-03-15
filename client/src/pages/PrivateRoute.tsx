import { Navigate, Outlet } from 'react-router-dom';

import { useAuthState } from '../hooks/useAuthState.ts';

const PrivateRoute = () => {
    const { isAuthenticated } = useAuthState();
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
