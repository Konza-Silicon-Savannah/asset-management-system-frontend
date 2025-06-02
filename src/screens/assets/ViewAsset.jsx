import React, { useState, useEffect } from "react";
import "./ViewAsset.css";
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

const ViewAsset = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL = "http://127.0.0.1:8000/";

  // Fetch assets from backend
  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/assets/`);
        if (response.ok) {
          const data = await response.json();
          setAssets(data.results || data); // Handle pagination if implemented
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

    fetchAssets();
  }, []);

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
        const response = await fetch(`${API_BASE_URL}/assets/${assetId}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Add CSRF token if required
            // 'X-CSRFToken': getCookie('csrftoken'),
          },
        });

        if (response.ok) {
          // Remove asset from local state
          setAssets(assets.filter((asset) => asset.id !== assetId));
          alert("Asset deleted successfully!");
        } else {
          alert("Failed to delete asset");
        }
      } catch (error) {
        console.error("Error deleting asset:", error);
        alert("Network error. Please try again.");
      }
    }
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesFilter =
      selectedFilter === "All" ||
      (selectedFilter === "New" && asset.status === "New") ||
      (selectedFilter === "Disposal" && asset.status === "Disposal") ||
      (selectedFilter === "Good" && asset.status === "Good") ||
      (selectedFilter === "Damaged" && asset.status === "Damaged");

    const matchesSearch =
      searchTerm === "" ||
      asset.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.asset_tag?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.supplier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.asset_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.location?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div
        className="p-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="text-center">
          <FaSpinner className="fa-spin" size={32} />
          <p className="mt-3">Loading assets...</p>
        </div>
      </div>
    );
  }

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
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            style={{ width: "150px" }}
          >
            <option value="All">All</option>
            <option value="New">New</option>
            <option value="Disposal">Disposal</option>
            <option value="Good">Good</option>
            <option value="Damaged">Damaged</option>
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

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Asset Tag</th>
              <th scope="col">Model</th>
              <th scope="col">Department</th>
              <th scope="col">Location</th>
              <th scope="col">Status</th>
              <th scope="col">Purchase Cost</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset) => (
              <tr key={asset.id}>
                <th>{asset.name}</th>
                <td>{asset.asset_tag || "N/A"}</td>
                <td>{asset.model || "N/A"}</td>
                <td>{asset.department || "N/A"}</td>
                <td>{asset.location || "N/A"}</td>
                <td>
                  <span
                    className={`badge ${
                      asset.status === "Deployed"
                        ? "bg-success"
                        : asset.status === "Pending"
                        ? "bg-warning"
                        : asset.status === "Undeployed"
                        ? "bg-secondary"
                        : "bg-danger"
                    }`}
                  >
                    {asset.status || "Unknown"}
                  </span>
                </td>
                <td>{formatCurrency(asset.purchase_cost)}</td>
                <td>
                  <div className="d-flex gap-2">
                    <FaEye
                      className="text-success cursor-pointer"
                      onClick={() => handleViewAsset(asset)}
                      title="View Details"
                      style={{ cursor: "pointer" }}
                    />
                    <FaEdit
                      className="text-primary cursor-pointer"
                      title="Edit Asset"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/assets/edit/${asset.id}`)}
                    />
                    <FaTrash
                      className="text-danger cursor-pointer"
                      title="Delete Asset"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteAsset(asset.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAssets.length === 0 && !loading && (
        <div className="text-center py-4">
          <p className="text-muted">No assets found matching your criteria.</p>
        </div>
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
                      {selectedAsset.serial_number || "N/A"}
                    </div>
                    <div className="mb-3">
                      <strong>Model:</strong> {selectedAsset.model || "N/A"}
                    </div>
                    <div className="mb-3">
                      <strong>Type:</strong> {selectedAsset.asset_type || "N/A"}
                    </div>
                  </div>

                  {/* Purchase & Location Information */}
                  <div className="col-md-6">
                    <h6 className="fw-bold mb-3 text-green-700">
                      Purchase & Location
                    </h6>
                    <div className="mb-3">
                      <strong>Purchase Date:</strong>{" "}
                      {formatDate(selectedAsset.purchase_date)}
                    </div>
                    <div className="mb-3">
                      <strong>Supplier:</strong>{" "}
                      {selectedAsset.supplier || "N/A"}
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
                        className={`badge ms-2 ${
                          selectedAsset.status === "Deployed"
                            ? "bg-success"
                            : selectedAsset.status === "Pending"
                            ? "bg-warning"
                            : selectedAsset.status === "Undeployed"
                            ? "bg-secondary"
                            : "bg-danger"
                        }`}
                      >
                        {selectedAsset.status || "Unknown"}
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
