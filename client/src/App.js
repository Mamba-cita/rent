import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/homePage';
import Register from './pages/register';
import Login from './pages/login';
import Admin from './pages/adminPage'; 
import Tenant from './pages/tenantPage';
import User from './pages/userPage';
import RoleProtectedRoute from './components/RoleProtectedRoute';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Role-based Protected Routes */}
        <Route
          path="/"
          element={
            <RoleProtectedRoute
              element={Home}
              tenantPage="/tenant"
              userPage="/user"
            />
          }
        />
        {/* Admin, Tenant, and User Pages */}
        <Route path="/tenant" element={<Tenant />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
