import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./screens/auth/Login";
import Dashboard from "./screens/dashboard/Dashboard";
import ViewAsset from "./screens/assets/ViewAsset";
import AssetForm from "./screens/assets/AssetForm";
import AssetRequest from "./screens/assets/AssetRequest";
import Users from "./screens/users/Users";
import Reports from "./screens/reports/Reports";
import SideBar from "./screens/partials/SideBar";
import "choices.js/public/assets/styles/choices.min.css";
import ProtectedRoute from "./screens/ProtectedRoute.jsx";
import LandingPage from "./screens/LandingPage.jsx";

const App = () => {
    const location = useLocation();
    const hidePartials = ["/signin", "/"].includes(location.pathname);

    return (
        <div className="overflow-x-hidden h-dvh overflow-hidden flex">
            {!hidePartials && (<SideBar />)}
            <div className="w-full h-70rem overflow-y-scroll">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signin" element={<Login />} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/assets" element={
                        <ProtectedRoute>
                            <ViewAsset />
                        </ProtectedRoute>
                    } />
                    <Route path="/assets/new" element={
                        <ProtectedRoute>
                            <AssetForm />
                        </ProtectedRoute>
                    } />
                    <Route path="/assets/request" element={
                        <ProtectedRoute>
                            <AssetRequest />
                        </ProtectedRoute>
                    } />
                    <Route path="/users" element={
                        <ProtectedRoute>
                            <Users />
                        </ProtectedRoute>
                    } />
                    <Route path="/reports" element={
                        <ProtectedRoute>
                            <Reports />
                        </ProtectedRoute>
                    } />
                </Routes>
            </div>
        </div>
    );
}

export default App;
