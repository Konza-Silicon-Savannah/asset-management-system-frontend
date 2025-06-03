// import { AreaChart } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
const AreaChart1 = () => {
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
    
    const data = [
        { month: "Jan", Assets: analytics, Liabilities: analytics, Expenses:analytics, Revenue: analytics },
        { month: "Feb", Assets: 200, Liabilities: 100, Expenses: 100, Revenue: 300 },
        { month: "Mar", Assets: 100, Liabilities: 300, Expenses: 200, Revenue: 100 },
        { month: "Apr", Assets: 200, Liabilities: 100, Expenses: 100, Revenue: 300 },
        { month: "May", Assets: 100, Liabilities: 300, Expenses: 200, Revenue: 100 },
        { month: "Jun", Assets: 200, Liabilities: 100, Expenses: 100, Revenue: 300 },
        { month: "Jul", Assets: 100, Liabilities: 100, Expenses: 200, Revenue: 100 },
        { month: "Aug", Assets: 200, Liabilities: 300, Expenses: 100, Revenue: 300 },
        { month: "Sep", Assets: 100, Liabilities: 100, Expenses: 200, Revenue: 100 },
        { month: "Oct", Assets: 200, Liabilities: 300, Expenses: 100, Revenue: 300 },
        { month: "Nov", Assets: 100, Liabilities: 100, Expenses: 200, Revenue: 100 },
        { month: "Dec", Assets: 200, Liabilities: 300, Expenses: 100, Revenue: 300 },
      ];

    return (
        <div>
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }} >
                    {/* Gradient Colors */}
                    <defs>
                        <linearGradient id="assetsColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#007bff" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#007bff" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="liabilitiesColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#dc3545" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#dc3545" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="expensesColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ffc107" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#ffc107" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="revenueColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#28a745" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#28a745" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    {/* Grid & Axes */}
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="month" tick={{ fill: "#666", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#666", fontSize: 12 }} />
                    <Tooltip />
                    <Legend />

                    {/* Overlapping Area Charts */}
                    <Area type="monotone" dataKey="Assets" stroke="#007bff" fill="url(#assetsColor)" strokeWidth={1} dot={{ stroke: "white", strokeWidth: 2, r: 4 }}/>
                    <Area type="monotone" dataKey="Liabilities" stroke="#dc3545" fill="url(#liabilitiesColor)" strokeWidth={1} dot={{ stroke: "white", strokeWidth: 2, r: 4 }} />
                    <Area type="monotone" dataKey="Expenses" stroke="#ffc107" fill="url(#expensesColor)" strokeWidth={1} dot={{ stroke: "white", strokeWidth: 2, r: 4 }} />
                    <Area type="monotone" dataKey="Revenue" stroke="#18a745" fill="url(#revenueColor)" strokeWidth={1} dot={{ stroke: "white", strokeWidth: 2, r: 4 }} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default AreaChart1