import React, { useState, useEffect } from "react";
import "./ViewAsset.css";
import TopBar from '../dashboard/TopBar.jsx'
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import formatCurrency from "../helpers/Currency.jsx";
import formatDate from "../helpers/DateFormat.jsx";
import axios from "axios";
import Pagination from "../helpers/Pagination.jsx";

const api_url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("AuthToken");

const ViewAsset = () => {
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination state - fixed items per page
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 20;

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api_url}/assets?page=${currentPage}&status=${selectedStatus}&search=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();

        // Handle paginated response
        if (data.results) {
          setAssets(data.results);
          setTotalItems(data.count);

          // Calculate total pages based on fixed items per page
          setTotalPages(Math.ceil(data.count / itemsPerPage));
        } else {
          // Handle non-paginated response
          setAssets(data);
          setTotalItems(data.length);
          setTotalPages(Math.ceil(data.length / itemsPerPage));
        }
      } else {
        setError("Failed to fetch assets");
      }
    } catch (error) {
      console.error("Error fetching assets:", error);
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [searchTerm, selectedStatus, currentPage]);

  // Reset to first page when search term or status changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchTerm, selectedStatus]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
  };

  const handleViewAsset = (asset) => {
    setSelectedAsset(asset);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedAsset(null);
  };

  const handleDeleteAsset = async (assetId) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      try {
        await axios.delete(`${api_url}/assets/${assetId}/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Refresh the current page after deletion
        fetchAssets();
        alert("Asset deleted successfully!");
      } catch (error) {
        console.error("Error deleting asset:", error);
        alert("Network error. Please try again.");
      }
    }
  };

  if (error) {
    return (
      <div className="p-5">
        
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
          <button
            className="btn btn-sm btn-outline-danger ms-3"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div style={{ position: 'absolute', right: '0', top: '0' }}>

          <TopBar />
        </div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <div className="input-group me-3">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="form-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{ width: "150px" }}
          >
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="disposal">Disposal</option>
            <option value="good">Good</option>
            <option value="damaged">Damaged</option>
          </select>
        </div>
        <button
          onClick={() => navigate("/assets/new")}
          className="btn btn-success d-flex align-items-center gap-2"
        >
          <FaPlus />
          Add Asset
        </button>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <FaSpinner className="fa-spin" style={{ fontSize: "2rem" }} />
          <p className="mt-2">Loading assets...</p>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="py-3 px-3">Name</th>
                  <th scope="col" className="py-3 px-3">Asset Tag</th>
                  <th scope="col" className="py-3 px-3">Model</th>
                  <th scope="col" className="py-3 px-3">Department</th>
                  <th scope="col" className="py-3 px-3">Location</th>
                  <th scope="col" className="py-3 px-3">Status</th>
                  <th scope="col" className="py-3 px-3">Purchase Cost</th>
                  <th scope="col" className="py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr key={asset.id}>
                    <td className="py-3 px-3">{asset.name}</td>
                    <td className="py-3 px-3">{asset.asset_tag || "N/A"}</td>
                    <td className="py-3 px-3">{asset.model || "N/A"}</td>
                    <td className="py-3 px-3">{asset.department || "N/A"}</td>
                    <td className="py-3 px-3">{asset.location || "N/A"}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`badge text-white text-capitalize ${asset.status === "good" || asset.status === "new"
                            ? "bg-success"
                            : asset.status === "disposal"
                              ? "bg-secondary"
                              : "bg-danger"
                          }`}
                      >
                        {asset.status}
                      </span>
                    </td>
                    <td className="py-3 px-3">{formatCurrency(asset.purchase_cost)}</td>
                    <td className="py-3 px-3 text-center">
                      <div className="d-flex justify-content-center gap-3">
                        <FaEye
                          className="text-success"
                          onClick={() => handleViewAsset(asset)}
                          title="View Details"
                          style={{ cursor: "pointer", fontSize: "1.8rem" }}
                        />
                        <FaEdit
                          className="text-[#333]"
                          onClick={() => navigate(`/assets/edit/${asset.id}`)}
                          title="Edit Asset"
                          style={{ cursor: "pointer", fontSize: "1.8rem" }}
                        />
                        <FaTrash
                          className="text-danger"
                          onClick={() => handleDeleteAsset(asset.id)}
                          title="Delete Asset"
                          style={{ cursor: "pointer", fontSize: "1.8rem" }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {assets.length === 0 && !loading && (
            <div className="text-center py-4">
              <p className="text-muted">No assets found matching your criteria.</p>
            </div>
          )}

          {/* Pagination Component */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            showInfo={true}
          />
        </>
      )}

      {showDetailModal && selectedAsset && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Asset Details: {selectedAsset.name}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  {/* Basic Information */}
                  <div className="col-md-6">
                    <h6 className="fw-bold mb-3 text-green-700">
                      Basic Information
                    </h6>
                    <div className="mb-3">
                      <strong>Asset Name:</strong> {selectedAsset.name}
                    </div>
                    <div className="mb-3">
                      <strong>Asset Tag:</strong>{" "}
                      {selectedAsset.asset_tag || "N/A"}
                    </div>
                    <div className="mb-3">
                      <strong>Serial Number:</strong>{" "}
                      {selectedAsset.serial_no || "N/A"}
                    </div>
                    <div className="mb-3">
                      <strong>Model:</strong> {selectedAsset.model || "N/A"}
                    </div>
                    <div className="mb-3">
                      <strong>Type:</strong> {selectedAsset.type || "N/A"}
                    </div>
                  </div>

                  {/* Purchase & Location Information */}
                  <div className="col-md-6">
                    <h6 className="fw-bold mb-3 text-green-700">
                      Purchase & Location
                    </h6>
                    <div className="mb-3">
                      <strong>Purchase Date:</strong>{" "}
                      {formatDate(selectedAsset.created_at)}
                    </div>
                    <div className="mb-3">
                      <strong>Purchase Cost:</strong>{" "}
                      {formatCurrency(selectedAsset.purchase_cost)}
                    </div>
                    <div className="mb-3">
                      <strong>Location:</strong>{" "}
                      {selectedAsset.location || "N/A"}
                    </div>
                    <div className="mb-3">
                      <strong>Department:</strong>{" "}
                      {selectedAsset.department || "N/A"}
                    </div>
                  </div>

                  {/* Status & Description */}
                  <div className="col-12 mt-3">
                    <h6 className="fw-bold mb-3 text-green-700">
                      Status & Description
                    </h6>
                    <div className="mb-3">
                      <strong>Status:</strong>
                      <span
                        className={`badge text-white text-capitalize ml-2 ${selectedAsset.status === "good" || selectedAsset.status === "new"
                            ? "bg-success"
                            : selectedAsset.status === "disposal"
                              ? "bg-secondary"
                              : "bg-danger"
                          }`}
                      >
                        {selectedAsset.status}
                      </span>
                    </div>
                    <div className="mb-3">
                      <strong>Description:</strong>
                      <p className="mt-2 p-3 bg-light rounded">
                        {selectedAsset.description ||
                          "No description available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAsset;