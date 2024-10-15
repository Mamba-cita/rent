import { Route, Routes, useLocation } from "react-router-dom";
import { useContext } from "react";

import Sidebar from "./components/common/Sidebar";
import TenantSidebar from "./components/common/TenantSidebar"; 
import VacantPage from "./pages/VacantPage.jsx";
import UsersPage from "./pages/UsersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import TenantPage from "./pages/TenantPage";
import ViewPage from "./pages/ViewPage";
import RoleProtectedRoute from "./components/common/RoleProtectedRoute.jsx";
import Login from "./pages/login";
import Register from "./pages/register";
import NotFoundPage from "./pages/NotFoundPage";
import { AuthContext } from "./context/authContext"; 
import HousePage from "./pages/HousePage.jsx";
import RoomsPage from "./pages/RoomsPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

function App() {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isPublicRoute = location.pathname === "/login" || location.pathname === "/register";
  const backgroundClass = isPublicRoute ? "bg-white" : "bg-gray-900";

  return (
    <div className={`flex h-screen text-gray-100 overflow-hidden ${backgroundClass}`}>
      {user && !isPublicRoute && (
        <>
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
            <div className="absolute inset-0 backdrop-blur-sm" />
          </div>
          {user.role === "tenant" ? <TenantSidebar /> : <Sidebar />}
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
              element={AnalyticsPage}
              tenantPage="/tenant"
              userPage="/view"
            />
          }
        />
        <Route
          path="/vacants"
          element={
            <RoleProtectedRoute
              element={VacantPage}
              tenantPage="/tenant"
              userPage="/view"
            />
          }
        />
        <Route
          path="/tenants"
          element={
            <RoleProtectedRoute
              element={UsersPage}
              tenantPage="/tenant"
              userPage="/view"
            />
          }
        />
        <Route
          path="/houses"
          element={
            <RoleProtectedRoute
              element={HousePage}
              tenantPage="/tenant"
              userPage="/view"
            />
          }
        />
        <Route
          path="/rooms"
          element={
            <RoleProtectedRoute
              element={RoomsPage}
              tenantPage="/tenant"
              userPage="/view"
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <RoleProtectedRoute
              element={DashboardPage}
              tenantPage="/tenant"
              userPage="/view"
            />
          }
        />
        <Route
          path="/settings"
          element={
            <RoleProtectedRoute
              element={SettingsPage}
              tenantPage="/tenant"
              userPage="/view"
            />
          }
        />
        <Route
          path="/tenant"
          element={
            <RoleProtectedRoute
              element={TenantPage}
              tenantPage="/tenant"
              userPage="/view"
            />
          }
        />
        <Route
          path="/view"
          element={
            <RoleProtectedRoute
              element={ViewPage}
              tenantPage="/tenant"
              userPage="/view"
            />
          }
        />

        {/* Catch-all route for undefined routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
