import React, { useEffect, useState } from 'react';
import { FaLaptop, FaBoxOpen, FaClipboardList } from "react-icons/fa";
import axios from 'axios';

const Cards = () => {
    const [analytics, setAnalytics] = useState();

    const getAnalytics = async () => {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setAnalytics(response.data.length);
        console.log(response.data.length);


    };
    useEffect(() => {
        getAnalytics()
}, [])
    return (
        <div className='my-4'>
            <h1>{analytics}</h1>
            <div className="row mx-0.-5">
                <div className="col-md-3" >
                    <div className="shadow-lg p-2" style={{ borderRadius: '10px' }}>
                        <FaClipboardList size={40} title="Inventory List" />
                        <h3 style={{ fontWeight: 'bold', margin: '10px 0' }}>Total Assets</h3>
                        <h1 style={{ fontWeight: 'bold', fontSize: '36px' }}>8196</h1>
                    </div>
                </div>
                <div className="col-md-3" >
                    <div className="shadow-lg p-2" style={{ borderRadius: '10px' }}>
                        <FaClipboardList size={40} title="Inventory List" />
                        <h3 style={{ fontWeight: 'bold', margin: '10px 0' }}>Assets Due for Disposal</h3>
                        <h1 style={{ fontWeight: 'bold', fontSize: '36px' }}>{analytics}</h1>
                    </div>
                </div>
                <div className="col-md-3" >
                    <div className="shadow-lg p-2" style={{ borderRadius: '10px' }}>
                        <FaClipboardList size={40} title="Inventory List" />
                        <h3 style={{ fontWeight: 'bold', margin: '10px 0' }}>Pending Asset Requests</h3>
                        <h1 style={{ fontWeight: 'bold', fontSize: '36px' }}>1001</h1>
                    </div>
                </div>
                <div className="col-md-3" >
                    <div className="shadow-lg p-2" style={{ borderRadius: '10px' }}>
                        <FaClipboardList size={40} title="Inventory List" />
                        <h3 style={{ fontWeight: 'bold', margin: '10px 0' }}>Approved Assets</h3>
                        <h1 style={{ fontWeight: 'bold', fontSize: '36px' }}>23</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards