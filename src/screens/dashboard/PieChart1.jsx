import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const PieChart1 = () => {
    const [analytics, setAnalytics] = useState(null); // use null for better check

    const getAnalytics = async () => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            setAnalytics(response.data.length);
        } catch (error) {
            console.error("Error fetching analytics:", error);
        }
    };

    useEffect(() => {
        getAnalytics();
    }, []);

    // render the chart once data is available
    if (analytics === null) return <p>Loading chart...</p>;

    const data = [
        { name: "Pending", value: analytics, color: "#8B75FF" }, // Purple
        { name: "Asset due for disposal", value: analytics, color: "#FF9E9E" }, // Pink
        { name: "Frequently issued Assets", value: analytics, color: "#3EC6E0" }, // Cyan
    ];

    return (
        <div>
            <ResponsiveContainer width="100%" height={270} style={{ padding: '20px' }}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip wrapperStyle={{ fontSize: "12px", padding: '0' }} />
                </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", marginTop: "10px", fontSize: "12px", alignItems: 'center' }}>
                {data.map((entry, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                        <div style={{ width: "12px", height: "12px", backgroundColor: entry.color, borderRadius: "50%" }}></div>
                        <span style={{ textAlign: 'left' }}>{entry.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChart1;
