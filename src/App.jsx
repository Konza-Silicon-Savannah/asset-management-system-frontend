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

const App = () => {
    const location = useLocation();
    const hidePartials = ["/signin"].includes(location.pathname);

    return (
        <div className="overflow-x-hidden h-dvh overflow-hidden flex">
            {!hidePartials && (<SideBar />)}
            <div className="w-full h-70rem overflow-y-scroll">
                <Routes>
                    <Route path="/signin" element={<Login />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/assets/view" element={<ViewAsset />} />
                    <Route path="/assets/new" element={<AssetForm />} />
                    <Route path="/assets/request" element={<AssetRequest />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/reports" element={<Reports />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
