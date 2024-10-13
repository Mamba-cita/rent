import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext.jsx';
import { useLocation } from 'react-router-dom';

const RoleProtectedRoute = ({ element: Element, tenantPage, userPage }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Check if the current route is a public one (login/register)
  const isPublicRoute = location.pathname === '/login' || location.pathname === '/register';

  // If the user is authenticated
  if (user) {
    if (user.role === 'admin') {
      return <Element />; // Admins can access the protected home page
    } else if (user.role === 'tenant') {
      return <Navigate to={tenantPage} />; // Redirect tenants to their page
    } else if (user.role === 'user') {
      return <Navigate to={userPage} />; // Redirect users to their page
    }
  }

  // If not authenticated, check if it's a public route
  if (isPublicRoute) {
    return <Navigate to='/login' />; // Redirect to login if not authenticated
  }

  // Default redirection to login if user is not logged in or authorized
  return <Navigate to='/login' />;
};

export default RoleProtectedRoute;
