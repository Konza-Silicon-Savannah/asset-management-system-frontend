import React, { useState } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ViewAsset = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const assets = [
    {
      name: "Laptop",
      assetTag: "DC0001",
      model: "HP",
      supplier: "Huawei",
      type: "Electronic",
      status: "Deployed",
      serialNo: "SN48392HPLP",
      location: "Main Office, Floor 3",
      purchaseCost: "$1,200.00",
    },
    {
      name: "Desktop",
      assetTag: "ICM001",
      model: "Lenovo",
      supplier: "Microsoft",
      type: "Electronic",
      status: "Pending",
      serialNo: "LEN293847DT",
      location: "IT Department",
      purchaseCost: "$850.00",
    },
    {
      name: "Laptop",
      assetTag: "Complex007",
      model: "Macbook",
      supplier: "Apple",
      type: "Electronic",
      status: "Undeployed",
      serialNo: "MAC8273PRO",
      location: "Storage Room B",
      purchaseCost: "$2,400.00",
    },
  ];

  const handleViewAsset = (asset) => {
    setSelectedAsset(asset);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedAsset(null);
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesFilter =
      selectedFilter === "All" ||
      (selectedFilter === "All deployed" && asset.status === "Deployed") ||
      (selectedFilter === "Pending" && asset.status === "Pending") ||
      (selectedFilter === "Archived" && asset.status === "Archived") ||
      (selectedFilter === "Undeployed" && asset.status === "Undeployed");

    const matchesSearch =
      searchTerm === "" ||
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.type.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

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
            <option value="All deployed">All deployed</option>
            <option value="Pending">Pending</option>
            <option value="Archived">Archived</option>
            <option value="Undeployed">Undeployed</option>
          </select>
        </div>
        <button
          onClick={() => navigate("/assets/new")}
          className="btn btn-success d-flex align-items-center gap-2"
        >
          <FaPlus />
          Add
        </button>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Asset Tag</th>
            <th scope="col">Model</th>
            <th scope="col">Supplier</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssets.map((asset, index) => (
            <tr key={index}>
              <th>{asset.name}</th>
              <td>{asset.assetTag}</td>
              <td>{asset.model}</td>
              <td>{asset.supplier}</td>
              <td>{asset.type}</td>
              <td>{asset.status}</td>
              <td
                style={{
                  fontSize: "30px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <div className="flex gap-4 text-[24px]">
                  <FaEye
                    className="text-green-500 cursor-pointer"
                    onClick={() => handleViewAsset(asset)}
                  />
                  <FaEdit className="text-green-500 cursor-pointer" />
                  <FaTrash className="text-red-500 cursor-pointer" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDetailModal && selectedAsset && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
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
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Name:</strong> {selectedAsset.name}
                    </div>
                    <div className="mb-3">
                      <strong>Asset Tag:</strong> {selectedAsset.assetTag}
                    </div>
                    <div className="mb-3">
                      <strong>Model:</strong> {selectedAsset.model}
                    </div>
                    <div className="mb-3">
                      <strong>Supplier:</strong> {selectedAsset.supplier}
                    </div>
                    <div className="mb-3">
                      <strong>Type:</strong> {selectedAsset.type}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <strong>Status:</strong> {selectedAsset.status}
                    </div>
                    <div className="mb-3">
                      <strong>Serial No:</strong> {selectedAsset.serialNo}
                    </div>
                    <div className="mb-3">
                      <strong>Location:</strong> {selectedAsset.location}
                    </div>
                    <div className="mb-3">
                      <strong>Purchase Cost:</strong>{" "}
                      {selectedAsset.purchaseCost}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAsset;
