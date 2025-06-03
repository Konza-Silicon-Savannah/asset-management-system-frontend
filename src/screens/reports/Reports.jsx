import {useState, useEffect} from 'react';
import { Download, Filter, Calendar, Search } from 'lucide-react';
import axios from "axios";
import formatDate from "../helpers/DateFormat.jsx";
import 'jspdf-autotable';
import ExportCSV from "./CSV.jsx";
import ExportExcel from "./Excel.jsx";
import ExportPDF from "./PDF.jsx";

const api_url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("AuthToken");

const Reports = () => {
    const [report, setReport] = useState([]);
    const [dateRange, setDateRange] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [availableTypes, setAvailableTypes] = useState([]);

    const fetchReport = async () => {
        try {
            const response = await axios.get(`${api_url}/reports?type=${selectedType}&date_range=${dateRange}&search=${searchTerm}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            setReport(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTypes = async () => {
        try {
            const response = await axios.get(`${api_url}/assets/types`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAvailableTypes(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleExport = (format) => {
        if (format === 'pdf') {
            ExportPDF(report);
        } else if (format === 'excel') {
            ExportExcel(report);
        } else if (format === 'csv') {
            ExportCSV(report);
        }
    };

    useEffect(() => {
        fetchReport();
    }, [selectedType, dateRange, searchTerm]);

    useEffect(() => {
        fetchTypes();
    }, []);

    return (
        <div className="min-h-dvh bg-gray-50 p-6">
            <div className="mx-auto">
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold text-gray-900">Asset Management Reports</h1>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => handleExport('pdf')}
                                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export PDF
                            </button>
                            <button
                                onClick={() => handleExport('excel')}
                                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export Excel
                            </button>
                            <button
                                onClick={() => handleExport('csv')}
                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export CSV
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center space-x-2 flex-1 max-w-md">
                            <Search className="w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search assets..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border outline-none border-gray-300 rounded-lg px-3 py-2 flex-1"
                            />
                        </div>
                        <div className="flex gap-3">
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <select
                                    value={dateRange}
                                    onChange={(e) => setDateRange(e.target.value)}
                                    className="border outline-none border-gray-300 rounded-lg px-3 py-2"
                                >
                                    <option value="7">Last 7 days</option>
                                    <option value="30">Last 30 days</option>
                                    <option value="90">Last 3 months</option>
                                    <option value="365">Last year</option>
                                </select>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Filter className="w-4 h-4 text-gray-500" />
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="border outline-none border-gray-300 rounded-lg px-3 py-2"
                                >
                                    <option value="all">All Types</option>
                                    {availableTypes.map(type => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issued To</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee No.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested On</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Checkout</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Checkin</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {report.length === 0 ? (
                                    <tr>
                                        <td colSpan="10" className="px-6 py-4 text-center text-gray-500">
                                            {searchTerm ? 'No assets match your search criteria' : 'No assets found'}
                                        </td>
                                    </tr>
                                ) : (
                                    report.map((asset) => (
                                        <tr key={asset.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">{asset.name}</div>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{asset.type}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">{asset.model}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{asset.asset_tag}</td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{asset.latest_request?.requested_user.name}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">{asset.latest_request?.requested_user.employeeNo}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">{formatDate(asset.latest_request?.requested_date)}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">{formatDate(asset.latest_request?.ckeck_out)}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">{formatDate(asset.latest_request?.ckeck_in)}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">{asset.status}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;