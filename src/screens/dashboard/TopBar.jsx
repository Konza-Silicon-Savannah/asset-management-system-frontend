import React, { useState, useRef, useEffect } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
const api_url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("AuthToken");

const TopBar = () => {
    const [isCardVisible, setIsCardVisible] = useState(false);
    const cardRef = useRef(null);

    const toggleCard = () => {
        setIsCardVisible(!isCardVisible);
    };
    const handleLogout = () =>{
        localStorage.removeItem("AuthToken");
        window.location.href = "/signin";
    }

    // Close the card when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setIsCardVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className='p-2 d-flex align-items-center justify-content-end position-fixed top-0 right-0' >
            <div className="col-md-12 d-flex justify-content-end px-3 gap-2 position-relative">
                <IoMdNotificationsOutline
                    style={{
                        fontSize: '36px',
                        cursor: 'pointer',
                        border: '1px solid rgba(0,0,0,0.2)',
                        borderRadius: '50%',
                        padding: '5px'
                    }}
                />
                <FaRegUserCircle
                    onClick={toggleCard}
                    style={{
                        fontSize: '36px',
                        cursor: 'pointer',
                        border: '1px solid rgba(0,0,0,0.2)',
                        borderRadius: '50%',
                        padding: '5px'
                    }}
                />
                {isCardVisible && (
                    <div
                        ref={cardRef}
                        className="position-absolute end-0 mt-5"
                        style={{
                            width: '180px',
                            background: 'white',
                            border: '1px solid rgba(0,0,0,0.1)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            zIndex: 1000
                        }}
                    >
                        <ul className="list-unstyled m-0 p-2">
                            <li className="py-2 px-3 hover-bg d-flex gap-3" style={{ cursor: 'pointer' }}>
                                <User size={18} />
                                <a href="/admin-profile" style={{ textDecoration: 'none', color: '#333' }}>Profile</a>
                            </li>
                            <li className="py-2 px-3 hover-bg d-flex gap-3" style={{ cursor: 'pointer' }}>
                                <LogOut size={18} />
                                <Link style={{ textDecoration: 'none', color: '#333' }} onClick={handleLogout}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopBar;
