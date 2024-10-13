import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/homePage";
import Register from "./pages/register";
import Login from "./pages/login";
import Admin from "./pages/adminPage";
import Tenant from "./pages/tenantPage";
import User from "./pages/userPage";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      {/* Content Elements */}
      <Header />
      <Sidebar />
      <div className="relative flex-grow z-10"> {/* Ensures content is above the background */}
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
      </div>
    </div>
  );
}

export default App;
