import {useEffect, useState} from 'react';
import {User, Eye, EyeOff, Save} from 'lucide-react';
import Navbar from "./Navbar.jsx";
import CustomAlert from "../helpers/CustomAlert.jsx";
import axios from "axios";
import formatDate from "../helpers/DateFormat.jsx";
import {redirect, useNavigate} from "react-router-dom";

const api_url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("AuthToken");

const Profile = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const handleShowAlert = (type, message) => {
        setAlertType(type);
        setAlertMessage(message);
        setShowAlert(true);
    };

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${api_url}/auth`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if (password !== confirmPassword) {
                handleShowAlert("error", "Passwords do not match");
                return;
            }
            if (password.length < 5) {
                handleShowAlert("error", "Password must be at least 5 characters long");
                return;
            }
            await axios.patch(`${api_url}/users/${user.id}/`, {password},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTimeout(()=>{
                setPassword('');
                setConfirmPassword('');
                handleShowAlert("success", "Password updated successfully");
                navigate("/user-portal")
            },[1500]);

        }catch (e){
            handleShowAlert("error", "Unable to update password!");
        }

    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="min-h-dvh bg-gray-50 grid items-center">
            <div className="absolute top-0 w-full">
                <Navbar />
            </div>

            {showAlert && (
                <CustomAlert
                    type={alertType}
                    message={alertMessage}
                    onClose={() => setShowAlert(false)}
                    duration={5000}
                />
            )}

            <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6">
                        <div className="flex items-center mb-8">
                            <div className="w-20 h-20 bg-[#00763A] rounded-full flex items-center justify-center mr-6">
                                <User className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                                <p className="text-sm text-gray-500">{user.department} • {user.location}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                            {user.email}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Employee Number
                                        </label>
                                        <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                            {user.employeeNo}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Company
                                        </label>
                                        <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                            {user.company}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Department
                                        </label>
                                        <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                            {user.department}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Created
                                        </label>
                                        <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                            {formatDate(user.created_at)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Password</h3>
                                <form className="space-y-4" onSubmit={(e)=> handleSubmit(e)}>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md border-green-400 outline-none"
                                                placeholder="Enter new password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md border-green-400 outline-none"
                                                placeholder="Confirm new password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            className="flex items-center justify-center w-full bg-[#00763A] hover:bg-green-700 hover:cursor-pointer text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            Update Password
                                        </button>
                                    </div>

                                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                                        <h4 className="text-sm font-medium text-yellow-800 mb-1">Password Requirements:</h4>
                                        <ul className="text-xs text-yellow-700 space-y-1">
                                            <li>• At least 5 characters long</li>
                                            <li>• Must match confirmation password</li>
                                        </ul>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;