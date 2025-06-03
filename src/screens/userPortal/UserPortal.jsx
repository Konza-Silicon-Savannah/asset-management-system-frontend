import {useEffect, useState} from 'react';
import {
    Search,
    Filter,
    Eye,
    Plus,
    CheckCircle,
    Clock,
    XCircle,
    Package,
} from 'lucide-react';
import axios from "axios";
import formatDate from "../helpers/DateFormat.jsx";
import Navbar from "./Navbar.jsx";
import CustomAlert from "../helpers/CustomAlert.jsx";

const api_url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("AuthToken");

const UserPortal = () => {
    const [activeTab, setActiveTab] = useState('browse');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [requestReason, setRequestReason] = useState('');
    const [userRequests, setUserRequests] = useState([]);
    const [assets, setAssets] = useState([]);
    const [availableTypes, setAvailableTypes] = useState([]);
    const [approvedRequests, setApprovedRequests] = useState([]);
    const [alertType, setAlertType] = useState('success');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);


    const handleShowAlert = (type, message) => {
        setAlertType(type);
        setAlertMessage(message);
        setShowAlert(true);
    };

    const fetchAvailableAssets = async () => {
        try {
            const response = await axios.get(`${api_url}/assets/available?type=${selectedType}&search=${searchTerm}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAssets(response.data);
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

    const fetchUserRequests = async () => {
        try {
            const response = await axios.get(`${api_url}/requests/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const allRequests = response.data;
            const approvedAssets = allRequests.filter(request => request.action === 'approved');
            const pendingOrRejectedRequests = allRequests.filter(request =>
                request.action === 'pending' || request.action === 'rejected'
            );

            setUserRequests(pendingOrRejectedRequests);
            setApprovedRequests(approvedAssets);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRequestAsset = async () => {
        try {
            if (!requestReason.trim()) return;

            const data = {
                requested_asset: selectedAsset.id,
                reason: requestReason,
            };
            await axios.post(`${api_url}/requests/`, data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTimeout(() => {
                setShowRequestModal(false);
                setRequestReason('');
                setSelectedAsset(null);
                handleShowAlert("success", "Successfully submitted your request");
                fetchUserRequests();
            },[1000]);
        }catch (e) {
            handleShowAlert("error", "An error has occurred");

        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'good': return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'new': return <CheckCircle className="w-4 h-4 text-blue-500" />;
            case 'damaged': return <XCircle className="w-4 h-4 text-red-500" />;
            case 'disposal': return <XCircle className="w-4 h-4 text-gray-500" />;
            default: return <Clock className="w-4 h-4 text-yellow-500" />;
        }
    };

    const getRequestStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800 border-green-200';
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    useEffect(() => {
        fetchAvailableAssets();
    },[selectedType, searchTerm]);

    useEffect(() => {
        fetchTypes();
        fetchUserRequests();
    },[]);

    return (
        <div className="min-h-dvh bg-gray-50">
            <Navbar/>
            {showAlert && (
                <CustomAlert
                    type={alertType}
                    message={alertMessage}
                    onClose={() => setShowAlert(false)}
                    duration={5000}
                />
            )}

            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        {[
                            { id: 'browse', label: 'Browse Assets', icon: Search },
                            { id: 'my-assets', label: 'My Assets', icon: Package },
                            { id: 'requests', label: 'My Requests', icon: Clock }
                        ].map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                        activeTab === tab.id
                                            ? 'border-green-500 text-green-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'browse' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Search assets by name, model, serial number, or asset tag..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-2/5 pl-10 pr-4 py-2 border border-green-400 rounded-lg outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Filter className="text-gray-400 w-5 h-5" />
                                    <select
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                        className="border outline-none border-gray-300 rounded-lg px-3 py-2"
                                    >
                                        <option value="all">All Types</option>
                                        {availableTypes.map((type, index) => (
                                            <option key={index} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                            {assets.map(asset => (
                                <div key={asset.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-1">
                                                {getStatusIcon(asset.status)}
                                                <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                                                    asset.status === 'good' ? 'bg-green-100 text-green-800' :
                                                        asset.status === 'new' ? 'bg-blue-100 text-blue-800' :
                                                            asset.status === 'damaged' ? 'bg-red-100 text-red-800' :
                                                                'bg-gray-100 text-gray-800'
                                                }`}>
                                                  {asset.status}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{asset.name}</h3>
                                        <p className="text-sm text-gray-600 mb-1">Model: {asset.model}</p>
                                        <p className="text-sm text-gray-600 mb-1">Asset Tag: {asset.asset_tag}</p>
                                        <p className="text-sm text-gray-600 mb-1">Serial: {asset.serial_no}</p>
                                        <p className="text-sm text-gray-600 mb-1">Department: {asset.department}</p>
                                        <p className="text-sm text-gray-600 mb-3">Location: {asset.location}</p>

                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => setSelectedAsset(asset)}
                                                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span>View Details</span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedAsset(asset);
                                                    setShowRequestModal(true);
                                                }}
                                                className="flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                                <span>Request</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'my-assets' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">My Current Assets</h2>
                            </div>
                            <div className="grid grid-cols-3 gap-4 p-4">
                                {approvedRequests.map(asset => (
                                    <div key={asset.id} className="p-6 hover:bg-gray-50 border border-gray-600 rounded-md cursor-pointer">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-medium text-gray-900">{asset.requested_asset?.name}</h3>
                                                <p className="text-sm text-gray-600 mt-1">Asset Tag: {asset.requested_asset?.asset_tag}</p>
                                                <p className="text-sm text-gray-600 mt-1">Serial: {asset.requested_asset?.serial_no}</p>
                                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                                    <span>Assigned: {formatDate(asset.check_out)}</span>
                                                    <span>Due: {formatDate(asset.check_in)}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm capitalize">
                                                  {asset.action}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'requests' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">My Asset Requests</h2>
                            </div>
                            <div className="grid grid-cols-3 gap-4 p-4">
                                {userRequests.length === 0 ? (
                                    <div className="p-6 text-center text-gray-500 col-span-3">
                                        <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                        <p>No requests yet. Browse assets to make your first request!</p>
                                    </div>
                                ) : (
                                    userRequests.map(request => (
                                        <div key={request.id} className="p-6 hover:bg-gray-50 border border-gray-600 rounded-md cursor-pointer">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-medium text-gray-900">{request.requested_asset?.name}</h3>
                                                    <p className="text-sm text-gray-600 mt-1">Reason: {request.reason}</p>
                                                    <p className="text-sm text-gray-500 mt-1">Requested: {formatDate(request.requested_date)}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-sm border ${getRequestStatusColor(request.action)}`}>
                                                  {request.action}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {selectedAsset && !showRequestModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Asset Details</h3>
                            <button
                                onClick={() => setSelectedAsset(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="text-center mb-4">
                                <h4 className="text-xl font-semibold">{selectedAsset.name}</h4>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium text-gray-700">Model:</span>
                                    <p className="text-gray-600">{selectedAsset.model}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Asset Tag:</span>
                                    <p className="text-gray-600">{selectedAsset.asset_tag}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Serial:</span>
                                    <p className="text-gray-600">{selectedAsset.serial_no}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Status:</span>
                                    <p className="text-gray-600 capitalize">{selectedAsset.status}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Department:</span>
                                    <p className="text-gray-600">{selectedAsset.department}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Location:</span>
                                    <p className="text-gray-600">{selectedAsset.location}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Purchase Cost:</span>
                                    <p className="text-gray-600">${selectedAsset.purchase_cost?.toLocaleString()}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Supplied Date:</span>
                                    <p className="text-gray-600">{new Date(selectedAsset.supplied_date).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div>
                                <span className="font-medium text-gray-700">Description:</span>
                                <p className="text-gray-600 text-sm mt-1">{selectedAsset.description}</p>
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setSelectedAsset(null)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Close
                            </button>
                            {(selectedAsset.status === 'good' || selectedAsset.status === 'new') && (
                                <button
                                    onClick={() => setShowRequestModal(true)}
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    Request Asset
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showRequestModal && selectedAsset && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-xl w-full p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Request Asset</h3>
                            <button
                                onClick={() => setShowRequestModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-600">Requesting: <span className="font-medium">{selectedAsset.name}</span></p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Reason for Request *
                            </label>
                            <textarea
                                value={requestReason}
                                onChange={(e) => setRequestReason(e.target.value)}
                                placeholder="Please provide a reason for requesting this asset..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none outline-none"
                                rows={4}
                                required
                            />
                        </div>

                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowRequestModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRequestAsset}
                                disabled={!requestReason.trim()}
                                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Submit Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserPortal;