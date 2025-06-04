import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from 'axios';

const api_url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("AuthToken");

const BarChart1 = () => {
    const [analytics, setAnalytics] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBargraphData = async () => {
            try {
                const response = await axios.get(`${api_url}/analytics/graph/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const result = response.data;

                // Map API keys to match chart keys
                const formattedData = result.map(item => ({
                    month: item.month,
                    pending: item.pending_requests,
                    approved: item.approved_assets,
                    disposal: item.disposal
                }));

                setAnalytics(formattedData);
            } catch (error) {
                console.error("Error fetching analytics:", error);
                setError("Network error. Please check your connection.");
            }
        };

        fetchBargraphData();
    }, []);

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analytics} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" angle={-30} textAnchor="end" />
                    <YAxis />
                    <Tooltip />
                    <Legend wrapperStyle={{ marginTop: 40 }} />
                    <Bar dataKey="pending" fill="#8884d8" barSize={10} />
                    <Bar dataKey="approved" fill="#ff9999" barSize={10} />
                    <Bar dataKey="disposal" fill="#42c0fb" barSize={10} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChart1;
