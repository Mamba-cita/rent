import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext.jsx';
import { useLocation } from 'react-router-dom';

const RoleProtectedRoute = ({ element: Element, tenantPage, userPage }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Check if the current route is public (login/register)
  const isPublicRoute = location.pathname === '/login' || location.pathname === '/register';

  // Allow access to public routes if user is not authenticated
  if (!user && isPublicRoute) {
    return <Element />; // Render the public page (login/register)
  }

  // If the user is authenticated
  if (user) {
    if (user.role === 'admin') {
      return <Element />; // Admins can access the protected route
    } else if (user.role === 'tenant') {
      return <Navigate to={tenantPage} />; // Redirect tenants to their page
    } else if (user.role === 'user') {
      return <Navigate to={userPage} />; // Redirect users to their page
    }
  }

  // If not authenticated and not on a public route, redirect to login
  return <Navigate to='/login' />;
};

export default RoleProtectedRoute;
