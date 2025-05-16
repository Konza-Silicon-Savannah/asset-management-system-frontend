import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
const data = [
    { month: "January", pending: 20, disposal: 50, issued: 70 },
    { month: "February", pending: 30, disposal: 40, issued: 80 },
    { month: "March", pending: 25, disposal: 90, issued: 30 },
    { month: "April", pending: 80, disposal: 90, issued: 60 },
    { month: "May", pending: 40, disposal: 30, issued: 70 },
    { month: "June", pending: 50, disposal: 70, issued: 75 },
    { month: "July", pending: 30, disposal: 85, issued: 20 },
    { month: "August", pending: 60, disposal: 65, issued: 50 },
    { month: "September", pending: 70, disposal: 95, issued: 90 },
    { month: "October", pending: 50, disposal: 20, issued: 80 },
    { month: "November", pending: 80, disposal: 65, issued: 30 },
    { month: "December", pending: 60, disposal: 30, issued: 70 },
];
const BarChart1 = () => {
    return (
        <div>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" angle={-30} textAnchor="end" />
                    <YAxis />
                    <Tooltip />
                    <Legend
                        wrapperStyle={{ marginTop: 40 }}                    />

                    <Bar dataKey="pending" fill="#8884d8" barSize={10} />
                    <Bar dataKey="disposal" fill="#ff9999" barSize={10} />
                    <Bar dataKey="issued" fill="#42c0fb" barSize={10} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarChart1