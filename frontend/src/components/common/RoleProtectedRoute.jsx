import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext.jsx';
import { useLocation } from 'react-router-dom';

const RoleProtectedRoute = ({ element: Element, tenantPage, userPage }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    const isPublicRoute = location.pathname === '/login' || location.pathname === '/register';

    if (!user && isPublicRoute) {
        return <Element />;
    }

    if (user) {
        console.log('Current User:', user);

        if (user.role === 'admin') {
            return <Element />;
        } else if (user.role === 'tenant') {
            if (!user.id) {
                console.error("User ID is undefined");
                return <Navigate to='/login' />;
            }
            return <Navigate to={tenantPage} />;
        } else if (user.role === 'user') {
            return <Navigate to={userPage} />;
        }
    }

    return <Navigate to='/login' />;
};

export default RoleProtectedRoute;
