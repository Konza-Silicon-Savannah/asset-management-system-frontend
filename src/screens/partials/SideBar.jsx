import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import konza from "/images/konza.jpg";
import { Folders, GitPullRequest, LayoutDashboard, LayoutGrid, Users2, ChevronLeft, ChevronRight } from "lucide-react";

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`${collapsed ? "w-16" : "w-64"} text-white p-3 transition-all duration-300 relative h-screen`} style={{ backgroundColor: "#00763A", margin: 0 }}>
            <button onClick={toggleCollapse} className="absolute -right-3 top-6 bg-green-200 text-green-700 rounded-full p-1 shadow-lg hover:bg-gray-100 z-10">
                {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            <div className={`${collapsed ? "h-12 w-12 mx-auto" : "h-24 w-full"} transition-all duration-300 mb-6`}>
                <img src={konza} alt="Konza" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-5 text-md mt-7">
                <Link to="/" className={`flex items-center gap-3 p-2 rounded-lg transition-all ${isActive("/") ? "bg-green-200 bg-opacity-20" : "hover:bg-green-200 hover:bg-opacity-10"}`}>
                    <LayoutDashboard className={collapsed ? "mx-auto" : ""} />
                    {!collapsed && <span>Dashboard</span>}
                </Link>

                <Link to="/assets" className={`flex items-center gap-3 p-2 rounded-lg transition-all ${isActive("/assets") && !isActive("/assets/request") ? "bg-green-200 bg-opacity-20" : "hover:bg-green-200 hover:bg-opacity-10"}`}>
                    <Folders className={collapsed ? "mx-auto" : ""} />
                    {!collapsed && <span>Asset management</span>}
                </Link>

                <Link to="/assets/request" className={`flex items-center gap-3 p-2 rounded-lg transition-all ${isActive("/assets/request") ? "bg-green-200 bg-opacity-20" : "hover:bg-green-200 hover:bg-opacity-10"}`}>
                    <GitPullRequest className={collapsed ? "mx-auto" : ""} />
                    {!collapsed && <span>Requested Assets</span>}
                </Link>

                <Link to="/users" className={`flex items-center gap-3 p-2 rounded-lg transition-all ${isActive("/users") ? "bg-green-200 bg-opacity-20" : "hover:bg-green-200 hover:bg-opacity-10"}`}>
                    <Users2 className={collapsed ? "mx-auto" : ""} />
                    {!collapsed && <span>User Management</span>}
                </Link>
            </div>
        </div>
    );
};

export default SideBar;
