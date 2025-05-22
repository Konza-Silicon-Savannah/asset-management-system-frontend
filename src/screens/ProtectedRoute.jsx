import { Navigate } from "react-router-dom";
import {useAuth} from "./helpers/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();

    if (!token) return <Navigate to="/signin" replace />;
    return children;
};

export default ProtectedRoute;
