import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("AuthToken"));

    useEffect(() => {
        if (token) {
            localStorage.setItem("AuthToken", token);
        } else {
            localStorage.removeItem("AuthToken");
            setToken(null);
        }
    }, [token]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${api_url}/auth`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserDetails(response.data.data);
            } catch (error) {
                setToken(null);
            }
        };
        fetchUser();
    }, []);

    return <AuthContext.Provider value={{ token, setToken, userDetails, setUserDetails }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
