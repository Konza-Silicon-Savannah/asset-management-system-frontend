import { useState } from 'react';
import axios from "axios";
import CustomAlert from "../helpers/CustomAlert.jsx";

const api_url = import.meta.env.VITE_API_URL;

const Login = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleShowAlert = (type, message) => {
        setAlertType(type);
        setAlertMessage(message);
        setShowAlert(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${api_url}/auth`, credentials);
            handleShowAlert("success", "Logged in successfully. Redirecting...");
            localStorage.setItem('AuthToken', res.data.token);
            setTimeout(() => {
                location.href = "/dashboard"
            }, 1500);
        } catch (error) {
            handleShowAlert("error", error.response.data.message)
        }
    };

    return (
        <div className="min-h-vdh bg-white">

            {showAlert && (
                <CustomAlert
                    type={alertType}
                    message={alertMessage}
                    onClose={() => setShowAlert(false)}
                    duration={2000}
                />
            )}

            <div className="w-full bg-[#22763A] pl-10 flex items-center">
                <div className="text-white flex items-center">
                    <img src="/images/konza.jpg" alt="konza" className="h-14 mr-5" />
                    <span className="text-xl font-medium">Asset Management System</span>
                </div>
            </div>

            <div className="flex justify-center items-center py-12">
                <div className="w-full max-w-md bg-[#22763A] rounded-lg p-8">
                    <div className="flex flex-col items-center mb-8">
                        <img src="/images/konza.jpg" alt="konza" className="h-32 mb-2"/>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-white text-md mb-1 font-bold">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-3xl outline-none"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-white text-md mb-1 font-bold">Password:</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-3xl outline-none"
                                    required
                                />
                                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)} >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-left mb-4">
                            <button type="submit" className="bg-white text-[#22763A] px-8 py-1 rounded-3xl text-md font-medium hover:bg-gray-100">
                                Login
                            </button>
                        </div>

                        <div className="text-white text-xs">
                            <a href="#" className="hover:underline">Forgot Password?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;