import { Route, Routes, useLocation } from "react-router-dom";
import { useContext } from "react";

import Sidebar from "./components/common/Sidebar";
import TenantSidebar from "./components/common/TenantSidebar"; // Import the tenant sidebar
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import TenantPage from "./pages/TenantPage";
import ViewPage from "./pages/ViewPage";
import RoleProtectedRoute from "./components/common/RoleProtectedRoute.jsx";
import Login from "./pages/login";
import Register from "./pages/register";
import { AuthContext } from "./context/authContext"; // Import AuthContext to check user role

function App() {
  const location = useLocation();
  const { user } = useContext(AuthContext); // Get the logged-in user and their role

  // Conditionally set background class based on the route
  const isPublicRoute = location.pathname === "/login" || location.pathname === "/register";
  const backgroundClass = isPublicRoute ? "bg-white" : "bg-gray-900";

  return (
    <div className={`flex h-screen text-gray-100 overflow-hidden ${backgroundClass}`}>
      {/* Conditionally render the appropriate sidebar */}
      {!isPublicRoute && (
        <>
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
            <div className="absolute inset-0 backdrop-blur-sm" />
          </div>
          {user?.role === "tenant" ? <TenantSidebar /> : <Sidebar />}
        </>
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Role-based Protected Routes */}
        <Route
          path="/"
          element={
            <RoleProtectedRoute
              element={OverviewPage}
              ProductsPage="/products"
              UsersPage="/user"
              OrdersPage="/orders"
              AnalyticsPage="/analytics"
              SettingsPage="/settings"
              tenantPage="/tenant"
              viewPage="/view"
            />
          }
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/tenant" element={<TenantPage />} />
        <Route path="/view" element={<ViewPage />} />
      </Routes>
    </div>
  );
}

export default App;
