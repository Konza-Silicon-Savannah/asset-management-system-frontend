import {LogOut, LucideLayoutDashboard, Settings, User} from "lucide-react";
import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

const api_url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("AuthToken");

const Navbar = () =>{
    const [user, setUser] = useState({});
    const [dropdownOpen, setDropdownOpen] = useState(false);

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

    const handleLogout = () =>{
        localStorage.removeItem("AuthToken");
        window.location.href = "/signin";
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return(
        <div className="bg-[#00763A] shadow-lg relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div>
                    <div className="absolute left-[10rem] h-full">
                        <img src="images/konza.jpg" alt="" className="w-full h-full" />
                    </div>
                    <div className="py-6">
                        <h1 className="text-3xl font-bold text-white">Konza Asset Management Portal</h1>
                        <p className="text-green-100 mt-2">Request and manage your assets</p>
                    </div>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-green-700" />
                        </div>
                        <span className="hidden sm:block">{user.name}</span>
                        <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                            <Link
                                to="/user-portal"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                                <LucideLayoutDashboard className="w-4 h-4 mr-3" />
                                Home
                            </Link>
                            <Link
                                to="/profile"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                                <Settings className="w-4 h-4 mr-3" />
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                                <LogOut className="w-4 h-4 mr-3" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar;