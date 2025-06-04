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
import UserPortal from "./screens/userPortal/UserPortal.jsx";
import Profile from "./screens/userPortal/Profile.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import AdminProfile from "./screens/adminProfile/AdminProfile.jsx";

const api_url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("AuthToken");

const App = () => {
    const location = useLocation();
    const hidePartials = ["/signin", "/", "/user-portal", "/profile"].includes(location.pathname);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${api_url}/auth`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(["/", "/signin"].includes(location.pathname)){
                if(response.data.is_admin || response.data.is_superuser){
                    window.location.href = "/dashboard"
                }else{
                    window.location.href = "/user-portal"
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if(token){
            fetchUser();
        }
    }, []);

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
                    <Route path="/assets/edit/:id" element={
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
                    <Route path="/user-portal" element={
                        <ProtectedRoute>
                            <UserPortal/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <Profile/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/admin-profile" element={
                        <ProtectedRoute>
                            <AdminProfile/>
                        </ProtectedRoute>
                    }/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
