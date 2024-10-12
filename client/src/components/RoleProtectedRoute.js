import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const RoleProtectedRoute = ({ element: Element, tenantPage, userPage }) => {
  const { user } = useContext(AuthContext);

  // Redirect based on role
  if (user) {
    if (user.role === 'admin') {
      return <Element />; // Admins can access the home page
    } else if (user.role === 'tenant') {
      return <Navigate to={tenantPage} />; // Redirect tenants to their page
    } else if (user.role === 'user') {
      return <Navigate to={userPage} />; // Redirect users to their page
    }
  }

  // If not authenticated, redirect to login
  return <Navigate to="/login" />;
};

export default RoleProtectedRoute;
