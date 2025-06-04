import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import formatDate from "../helpers/DateFormat.jsx";
const api_url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("AuthToken");

const RecentActivities = () => {
    const [assets, setAssets] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchAssets = async () => {

            try {
                const response = await axios.get(`${api_url}/requests/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const result = response.data.results;
                console.log(result);

                 setAssets(result); // Handle pagination if implemented

            } catch (error) {
                console.error("Error fetching assets:", error);
                setError("Network error. Please check your connection.");
            }
        };

        fetchAssets();
    }, []);
    return (


        <div className='my-3'>
            <h3 className='my-4 fw-bold'>Recent Requests</h3>
           <table className="table table-hover mx-1">
                <thead className='table-success'>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">DATE</th>
                        <th scope="col">ASSET NAME</th>
                        <th scope="col">ASSET TYPE</th>
                        <th scope="col">USER</th>
                        <th scope="col">DEPARTMENT</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.slice(0, 10).map((asset, index) => (
                        <tr key={asset.id || index}>
                            <th scope="row">{index + 1}</th>
                            <td>{formatDate(asset.requested_date)}</td>
                            <td>{asset.requested_asset?.name}</td>
                            <td>{asset.requested_asset?.type}</td>
                            <td>{asset.requested_user?.name}</td>
                            <td>{asset.requested_user?.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RecentActivities