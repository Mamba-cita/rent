import { Route, Routes, useLocation } from "react-router-dom";
import { useContext } from "react";
import Sidebar from "./components/common/Sidebar";
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
    const isTenantPage = location.pathname.startsWith("/tenant");

    // Set the background class based on route and user role
    const backgroundClass = isTenantPage ? "" : (isPublicRoute ? "bg-white" : "bg-gray-900");

    return (
        <div className={`flex h-screen text-gray-100 overflow-hidden ${backgroundClass}`}>
            {user && !isPublicRoute && (
                <>
                    <div className="fixed inset-0 z-0">
                        {/* Apply gradient background only if the route is not the TenantPage */}
                        {!isTenantPage && (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
                                <div className="absolute inset-0 backdrop-blur-sm" />
                            </>
                        )}
                    </div>
                    {/* Render Sidebar only if not on TenantPage */}
                    {!isTenantPage && <Sidebar />}
                </>
            )}

            <Routes>
                {/* Public Routes */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Role-based Protected Routes */}
                <Route path="/" element={<RoleProtectedRoute element={AnalyticsPage} />} />
                <Route path="/vacants" element={<RoleProtectedRoute element={VacantPage} />} />
                <Route path="/tenants" element={<RoleProtectedRoute element={UsersPage} />} />
                <Route path="/houses" element={<RoleProtectedRoute element={HousePage} />} />
                <Route path="/rooms" element={<RoleProtectedRoute element={RoomsPage} />} />
                <Route path="/dashboard" element={<RoleProtectedRoute element={DashboardPage} />} />
                <Route path="/settings" element={<RoleProtectedRoute element={SettingsPage} />} />
                <Route path="/tenant/:tenant_id" element={<RoleProtectedRoute element={TenantPage} />} />
                <Route path="/view" element={<RoleProtectedRoute element={ViewPage} />} />

                {/* Catch-all route for undefined routes */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;
