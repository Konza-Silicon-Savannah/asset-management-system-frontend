import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuGitPullRequestDraft } from "react-icons/lu";
import { HiDocumentReport } from "react-icons/hi";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import konza from '/images/konza.jpg';
import '../dashboard.css';

const SideBar = () => {
    const [visibleSections, setVisibleSections] = useState({});

    const toggleSubChild = (section) => {
        setVisibleSections((prev) => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="sidebar">
            <img src={konza} alt="Konza" style={{ width: '60px', height: 'auto', objectFit: 'cover' }} />
            <Link to={'/dashboard'} className='dashboard-link'>
                <MdOutlineDashboard /> Dashboard
            </Link>

            {/* Section 1 */}
            <div className="asset-management">
                <p onClick={() => toggleSubChild('section1')} style={{ cursor: 'pointer' }}>
                    <FaHome /> Asset management
                    <span>
                        {visibleSections.section1 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </span>
                </p>

                {visibleSections.section1 && (
                    <div className="sub-child">
                        <Link to={'/addAsset'}>Add</Link> <br />
                        <Link to={'/viewAsset'}>View</Link>
                    </div>
                )}
            </div>

            {/* section 2 */}
            <div className="asset-management">
                <p onClick={() => toggleSubChild('section2')} style={{ cursor: 'pointer' }}>
                <LuGitPullRequestDraft /> Issuance & Request
                    <span>
                        {visibleSections.section2 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </span>
                </p>

                {visibleSections.section2 && (
                    <div className="sub-child">
                        <Link to={'/AssetRequest'}>Asset Request</Link> <br />
                    </div>
                )}
            </div>
            {/* section 3 */}
            <div className="asset-management">
                <p onClick={() => toggleSubChild('section3')} style={{ cursor: 'pointer' }}>
                <FaUserAlt /> User Management
                    <span>
                        {visibleSections.section3 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </span>
                </p>

                {visibleSections.section3 && (
                    <div className="sub-child">
                        <Link to={'/users'}>Users</Link> <br />
                    </div>
                )}
            </div>
            {/* section 4*/}
            <div className="asset-management">
                <p onClick={() => toggleSubChild('section4')} style={{ cursor: 'pointer' }}>
                    <HiDocumentReport  /> Report & Analytics
                    <span>
                        {visibleSections.section4 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </span>
                </p>

                {visibleSections.section4 && (
                    <div className="sub-child">
                        <Link to={'/reports'}>generate Report</Link> <br />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SideBar;
