import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyEmail from "../pages/VerifyEmail";

import Dashboard from "../pages/Dashboard";
import Income from "../pages/Income";
import Expense from "../pages/Expense";
import AIInsights from "../pages/AIInsights";
import Profile from "../pages/Profile";
import Admin from "../pages/Admin";

import NotFound from "../pages/NotFound";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* =========================
                    Authentication Routes
                ========================= */}

                <Route
                    path="/"
                    element={
                        <AuthLayout>
                            <Login />
                        </AuthLayout>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <AuthLayout>
                            <Login />
                        </AuthLayout>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <AuthLayout>
                            <Register />
                        </AuthLayout>
                    }
                />

                <Route
                    path="/verify-email"
                    element={
                        <AuthLayout>
                            <VerifyEmail />
                        </AuthLayout>
                    }
                />

                {/* =========================
                    Protected Dashboard Routes
                ========================= */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Dashboard />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/income"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Income />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/expense"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Expense />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/ai-insights"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <AIInsights />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Profile />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
    path="/admin"
    element={
        <ProtectedRoute>
            <DashboardLayout>
                <Admin />
            </DashboardLayout>
        </ProtectedRoute>
    }
/>

                {/* =========================
                    404 Page
                ========================= */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;