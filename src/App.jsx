import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./screens/auth/Login";
import Dashboard from "./screens/Dashboard";
import ViewAsset from "./screens/ViewAsset";
import AddAsset from "./screens/AddAsset";
import AssetRequest from "./screens/AssetRequest";
import Users from "./screens/Users";
import Reports from "./screens/Reports";



 const App = () => {

    return (
        <div className="overflow-x-hidden">
            <Routes>
                <Route path="/signin" element={<Login />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/assets/view" element={<ViewAsset />} />
                <Route path="/assets/new" element={<AddAsset />} />
                <Route path="/assets/request" element={<AssetRequest/>} />
                <Route path="/users" element={<Users/>} />
                <Route path="/reports" element={<Reports/>} />
            </Routes>
        </div>
    );
}

export default App;
