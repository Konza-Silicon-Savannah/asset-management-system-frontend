import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
const api_url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("AuthToken");

const RecentActivities = () => {
    const [assets, setAssets] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchAssets = async () => {

            try {
                const response = await axios.get(`${api_url}/assets/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const result = response.data;
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
            <h3 className='my-4 fw-bold'>Recent Activities</h3>
           <table className="table table-hover mx-1">
                <thead className='table-success'>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">DATE</th>
                        <th scope="col">ISSUER</th>
                        <th scope="col">Serial_no
</th>
                        <th scope="col">ITEM</th>
                        <th scope="col">USER</th>
                        <th scope="col">DEPARTMENT</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset, index) => (
                        <tr key={asset.id || index}>
                            <th scope="row">{index + 1}</th>
                            <td>{asset.created_at || '—'}</td>
                            <td>{asset.issuer || '—'}</td>
                            <td>{asset.serial_no || '—'}</td>
                            <td>{asset.item || '—'}</td>
                            <td>{asset.name || '—'}</td>
                            <td>{asset.department || '—'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RecentActivities