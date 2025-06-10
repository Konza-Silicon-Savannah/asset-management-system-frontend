import {useState, useEffect} from 'react';
import { Download, Filter, Calendar, Search } from 'lucide-react';
import axios from "axios";
import formatDate from "../helpers/DateFormat.jsx";
import 'jspdf-autotable';
import ExportCSV from "./CSV.jsx";
import ExportExcel from "./Excel.jsx";
import ExportPDF from "./PDF.jsx";
import Pagination from "../helpers/Pagination.jsx";
import TopBar from '../dashboard/TopBar.jsx'


const api_url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("AuthToken");


const Reports = () => {
    const [report, setReport] = useState([]);
    const [dateRange, setDateRange] = useState('7');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [availableTypes, setAvailableTypes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Pagination state - fixed items per page
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 20;

    const fetchReport = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${api_url}/reports?page=${currentPage}`, {
                params: {
                    page: currentPage,
                    type: selectedType,
                    date_range: dateRange,
                    search: searchTerm
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Handle paginated response
            if (response.data.results) {
                setReport(response.data.results);
                setTotalItems(response.data.count);
                // Calculate total pages based on fixed items per page
                setTotalPages(Math.ceil(response.data.count / itemsPerPage));
            } else {
                // Handle non-paginated response (fallback)
                setReport(response.data);
                setTotalItems(response.data.length);
                setTotalPages(Math.ceil(response.data.length / itemsPerPage));
            }
            setError('');
        } catch (error) {
            console.error("Error fetching reports:", error);
            setError("Failed to fetch reports. Please try again.");
            setReport([]);
        } finally {
            setLoading(false);
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

    // Reset to first page when search term, type, or date range changes
    useEffect(() => {
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [searchTerm, selectedType, dateRange]);

    // Fetch reports when dependencies change
    useEffect(() => {
        fetchReport();
    }, [selectedType, dateRange, searchTerm, currentPage]);

    useEffect(() => {
        fetchTypes();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
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

    if (error) {
        return (
            <div className="min-h-dvh bg-gray-50 p-6">
                <div className="mx-auto">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        <strong>Error:</strong> {error}
                        <button
                            className="ml-3 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                            onClick={() => window.location.reload()}
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-dvh bg-gray-50 p-6">
            <div style={{position:'absolute', right:'0', top:'0'}}>

      <TopBar/>

        </div>
            <div className="mt-4">
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
                    {loading ? (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-gray-600">Loading reports...</p>
                        </div>
                    ) : (
                        <>
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
                                            <td colSpan="10" className="px-6 py-8 text-center text-gray-500">
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

                            {/* Only show pagination if there are results */}
                            {report.length > 0 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    totalItems={totalItems}
                                    itemsPerPage={itemsPerPage}
                                    onPageChange={handlePageChange}
                                    showInfo={true}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reports;