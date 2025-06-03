import React, { useState, useEffect } from "react";
import { FaCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import formatDate from "../helpers/DateFormat.jsx";

const AssetRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:8000";

  // Get auth token from localStorage
  const getAuthToken = () => {
    // Check common token names
    const tokenNames = [
      "access_token",
      "token",
      "authToken",
      "accessToken",
      "jwt_token",
      "auth_token",
      "bearerToken",
    ];

    for (const tokenName of tokenNames) {
      const token = localStorage.getItem(tokenName);
      if (
        token &&
        token !== "null" &&
        token !== "undefined" &&
        token.trim() !== ""
      ) {
        console.log(
          `Found token in ${tokenName}:`,
          token.substring(0, 20) + "..."
        );
        return token;
      }
    }

    console.log("No valid token found in localStorage");
    console.log("Available localStorage keys:", Object.keys(localStorage));
    return null;
  };

  // Fetch requests from API
  const fetchRequests = async () => {
    try {
      setLoading(true);

      // For testing - skip authentication check
      // if (!isAuthenticated()) {
      //   throw new Error("No authentication token found. Please log in.");
      // }

      const token = getAuthToken();
      const headers = {
        "Content-Type": "application/json",
      };

      // Add authorization header only if token exists
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/requests/`, {
        method: "GET",
        headers: headers,
      });

      if (response.status === 401) {
        throw new Error("Authentication failed. Please log in again.");
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRequests(data.results || data); // Handle both paginated and non-paginated responses
      setError(null);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError(err.message || "Failed to fetch requests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update request status
  const updateRequestStatus = async (requestId, newStatus) => {
    try {
      // jaymoh add auth, For testing - skip authentication check
      // if (!isAuthenticated()) {
      //   throw new Error("No authentication token found. Please log in.");
      // }

      const token = getAuthToken();
      const headers = {
        "Content-Type": "application/json",
      };

      // Add authorization header only if token exists
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/requests/${requestId}/`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({
          action: newStatus,
        }),
      });

      if (response.status === 401) {
        throw new Error("Authentication failed. Please log in again.");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }

      // Refresh the requests list after successful update
      await fetchRequests();
    } catch (err) {
      console.error("Error updating request:", err);
      setError(
        err.message || "Failed to update request status. Please try again."
      );
    }
  };

  // Load requests on component mount
  useEffect(() => {
    fetchRequests();
  }, []);

  // Get status icon and color
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <FaCircle style={{ color: "orange", marginRight: "5px" }} />;
      case "approved":
        return <FaCheckCircle style={{ color: "green", marginRight: "5px" }} />;
      case "rejected":
        return <FaTimesCircle style={{ color: "red", marginRight: "5px" }} />;
      default:
        return <FaCircle style={{ color: "gray", marginRight: "5px" }} />;
    }
  };

  // Handle status change
  const handleStatusChange = async (requestId, currentStatus) => {
    // Create a simple status cycle: pending -> approved -> rejected -> pending
    let newStatus;
    switch (currentStatus?.toLowerCase()) {
      case "pending":
        newStatus = "approved";
        break;
      case "approved":
        newStatus = "rejected";
        break;
      case "rejected":
        newStatus = "pending";
        break;
      default:
        newStatus = "pending";
    }

    await updateRequestStatus(requestId, newStatus);
  };

  if (loading) {
    return (
      <div className="p-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5">
        <div className="alert alert-danger" role="alert">
          {error}
          <button
            className="btn btn-outline-danger ms-3"
            onClick={fetchRequests}
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
        <h2>Asset Requests</h2>
        <button className="btn btn-outline-primary" onClick={fetchRequests}>
          Refresh
        </button>
      </div>

      {requests.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No asset requests found.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Requested Date</th>
                <th scope="col">Requested Asset</th>
                <th scope="col">Requested User</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{formatDate(request.requested_date)}</td>
                  <td>
                    {request.requested_asset?.name ||
                      request.requested_asset ||
                      "N/A"}
                  </td>
                  <td>
                    {request.requested_user?.username ||
                      request.requested_user ||
                      "N/A"}
                  </td>
                  <td>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "2px 8px",
                        borderRadius: "20px",
                        backgroundColor: "#F2F4F7",
                        border: "1px solid #ddd",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        handleStatusChange(request.id, request.action)
                      }
                      title="Click to change status"
                    >
                      {getStatusIcon(request.action)}
                      <span
                        style={{
                          color: "black",
                          textTransform: "capitalize",
                        }}
                      >
                        {request.action || "pending"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-success"
                        onClick={() =>
                          updateRequestStatus(request.id, "approved")
                        }
                        disabled={request.action === "approved"}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          updateRequestStatus(request.id, "rejected")
                        }
                        disabled={request.action === "rejected"}
                      >
                        Reject
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          updateRequestStatus(request.id, "pending")
                        }
                        disabled={request.action === "pending"}
                      >
                        Pending
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssetRequest;
