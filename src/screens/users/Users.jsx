import { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaSpinner } from "react-icons/fa";
import { LucideEdit, LucideEye, LucideTrash } from "lucide-react";
import axios from "axios";
import CustomAlert from "../helpers/CustomAlert.jsx";
import FormatErrors from "../helpers/FormatErrors.jsx";
import Pagination from "../helpers/Pagination.jsx";
import TopBar from '../dashboard/TopBar.jsx'

const api_url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("AuthToken");

const Users = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    department: "",
    bio: "",
    phone: "",
    location: "",
    company: "",
    employeeNo: "",
    website: "",
    address: "",
    city: "",
    state: "",
    country: "",
    role: "",
    status: "",
  });
  const [users, setUsers] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination state - fixed items per page
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 20;

  const handleShowAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api_url}/users/`, {
        params: {
          page: currentPage,
          status: selectedStatus !== 'all' ? selectedStatus : undefined,
          search: searchTerm || undefined
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Handle paginated response
      if (response.data.results) {
        setUsers(response.data.results);
        setTotalItems(response.data.count);
        setTotalPages(Math.ceil(response.data.count / itemsPerPage));
      } else {
        // Handle non-paginated response
        setUsers(response.data);
        setTotalItems(response.data.length);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      }
      setError("");
    } catch (error) {
      console.log(error);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUsers = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${api_url}/users/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Refresh the current page after deletion
        fetchUsers();
        handleShowAlert("success", "User deleted successfully!");
      } catch (error) {
        console.log(error);
        handleShowAlert("error", "Failed to delete user. Please try again.");
      }
    }
  };

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`${api_url}/users/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data);
      setIsEditMode(true);
    } catch (error) {
      console.log(error);
      handleShowAlert("error", "Failed to fetch user details.");
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      user.id
          ? await axios.put(`${api_url}/users/${user.id}/`, user, config)
          : await axios.post(`${api_url}/users/`, user, config);

      handleShowAlert("success", user.id ? "Successfully updated user details" : "Successfully added a new user");
      setTimeout(() => {
        fetchUsers(); // Refresh data instead of reloading page
        // Close modal programmatically
        const modal = document.getElementById('exampleModal');
        const modalInstance = bootstrap.Modal.getInstance(modal);
        if (modalInstance) {
          modalInstance.hide();
        }
        // Reset form
        setIsEditMode(false);
        setUser({
          name: "",
          username: "",
          email: "",
          department: "",
          bio: "",
          phone: "",
          location: "",
          company: "",
          employeeNo: "",
          website: "",
          address: "",
          city: "",
          state: "",
          country: "",
          role: "",
          status: "inactive",
        });
      }, 1500);

    } catch (error) {
      handleShowAlert("error", FormatErrors(error.response.data))
    }
  };

  const toggleUserStatus = async (id, currentStatus) => {
    const newStatus = !currentStatus;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.patch(`${api_url}/users/${id}/`, { is_active: newStatus }, config);

      handleShowAlert("success", `User ${newStatus ? "activated" : "deactivated"} successfully`);
      fetchUsers();

    } catch (error) {
      console.log(error);
      handleShowAlert("error", "Failed to update user status");
    }
  };

  useEffect(() => {
    fetchUsers();
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

  if (error && !loading) {
    return (
        <div className="p-5">
          
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {error}
            <button
                className="btn btn-sm btn-outline-danger ms-3"
                onClick={() => fetchUsers()}
            >
              Retry
            </button>
          </div>
        </div>
    );
  }

  return (
      <div className="p-5">
        <div style={{position:'absolute', right:'0', top:'0'}}>

      <TopBar/>
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
                  placeholder="Search users..."
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
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <button
              className="btn btn-success d-flex align-items-center gap-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
          >
            <FaPlus />
            Add User
          </button>
        </div>

        {loading ? (
            <div className="text-center py-4">
              <FaSpinner className="fa-spin" style={{ fontSize: "2rem" }} />
              <p className="mt-2">Loading users...</p>
            </div>
        ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                  <tr>
                    <th scope="col" className="py-3 px-3">#</th>
                    <th scope="col" className="py-3 px-3">Name</th>
                    <th scope="col" className="py-3 px-3">Username</th>
                    <th scope="col" className="py-3 px-3">Email</th>
                    <th scope="col" className="py-3 px-3">Location</th>
                    <th scope="col" className="py-3 px-3">Emp No.</th>
                    <th scope="col" className="py-3 px-3">Department</th>
                    <th scope="col" className="py-3 px-3">Status</th>
                    <th scope="col" className="py-3 px-3 text-center">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {users.map((user, index) => (
                      <tr key={user.id}>
                        <th scope="row" className="py-3 px-3">{((currentPage - 1) * itemsPerPage) + index + 1}</th>
                        <td className="py-3 px-3">{user.name}</td>
                        <td className="py-3 px-3">{user.username}</td>
                        <td className="py-3 px-3">{user.email}</td>
                        <td className="py-3 px-3">{user.location}</td>
                        <td className="py-3 px-3">{user.employeeNo}</td>
                        <td className="py-3 px-3">{user.department}</td>
                        <td className="py-3 px-3">
                      <span
                          className={`badge ${
                              user.is_active ? "bg-success" : "bg-danger"
                          }`}
                      >
                        {user.is_active ? "Active" : "Inactive"}
                      </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <div className="d-flex justify-content-center gap-3">
                            <LucideEye
                                style={{ color: "green", cursor: "pointer", fontSize: "1.8rem" }}
                                data-bs-toggle="modal"
                                data-bs-target="#viewUser"
                                onClick={() => fetchUser(user.id)}
                                title="View Details"
                            />
                            <LucideEdit
                                style={{ color: "black", cursor: "pointer", fontSize: "1.8rem" }}
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => fetchUser(user.id)}
                                title="Edit User"
                            />
                            <LucideTrash
                                style={{ color: "red", cursor: "pointer", fontSize: "1.8rem" }}
                                onClick={() => deleteUsers(user.id)}
                                title="Delete User"
                            />
                            <button
                                className={`btn btn-sm ${
                                    user.is_active ? "btn-danger" : "btn-success"
                                }`}
                                onClick={() => toggleUserStatus(user.id, user.is_active)}
                                title={user.is_active ? "Deactivate User" : "Activate User"}
                            >
                              {user.is_active ? "Deactivate" : "Activate"}
                            </button>
                          </div>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>

              {users.length === 0 && !loading && (
                  <div className="text-center py-4">
                    <p className="text-muted">No users found matching your criteria.</p>
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

        <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
          {showAlert && (
              <CustomAlert
                  type={alertType}
                  message={alertMessage}
                  onClose={() => setShowAlert(false)}
                  duration={2000}
              />
          )}
          <div className="modal-dialog" style={{ maxWidth: "80%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h3>{isEditMode ? "Edit user" : "New User"}</h3>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setIsEditMode(false);
                      setUser({
                        name: "",
                        username: "",
                        email: "",
                        department: "",
                        bio: "",
                        phone: "",
                        location: "",
                        company: "",
                        employeeNo: "",
                        website: "",
                        address: "",
                        city: "",
                        state: "",
                        country: "",
                        role: "",
                        status: "inactive",
                      });
                    }}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={user.name}
                            placeholder="Guleid Abdilatif"
                            onChange={handleChange}
                        />
                        <div
                            className="mb-3 d-flex gap-2"
                            style={{
                              fontSize: "18px",
                              borderBottom: "1px solid rgba(0,0,0,0.2)",
                            }}
                        >
                          <p className="fw-bold">Status:</p>
                          <p style={{ fontStyle: "italic" }}>
                          <span
                              className={`badge ${
                                  user.status === "active"
                                      ? "bg-success"
                                      : "bg-danger"
                              }`}
                          >
                            {user.status === "active" ? "Active" : "Inactive"}
                          </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                          Username:
                        </label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            value={user.username}
                            placeholder="guledabdilatif"
                            onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={user.email}
                            placeholder="name@example.com"
                            onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                          Phone:
                        </label>
                        <input
                            type="text"
                            name="phone"
                            className="form-control"
                            value={user.phone}
                            placeholder="+1 234 567 8900"
                            onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="company" className="form-label">
                          Company:
                        </label>
                        <input
                            type="text"
                            name="company"
                            className="form-control"
                            value={user.company}
                            placeholder="Company Name"
                            onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="employeeNo" className="form-label">
                          Employee No:
                        </label>
                        <input
                            type="text"
                            name="employeeNo"
                            className="form-control"
                            value={user.employeeNo}
                            placeholder="EMP001"
                            onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="department" className="form-label">
                          Department:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="department"
                            value={user.department}
                            placeholder="ICM, DC"
                            onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="role" className="form-label">
                          Role:
                        </label>
                        <input
                            type="text"
                            name="role"
                            className="form-control"
                            value={user.role}
                            placeholder="Manager, Developer, etc."
                            onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="location" className="form-label">
                          Location:
                        </label>
                        <input
                            type="text"
                            name="location"
                            className="form-control"
                            value={user.location}
                            placeholder="Office Location"
                            onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="website" className="form-label">
                          Website:
                        </label>
                        <input
                            type="url"
                            name="website"
                            className="form-control"
                            value={user.website}
                            placeholder="https://example.com"
                            onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                          Address:
                        </label>
                        <input
                            type="text"
                            name="address"
                            className="form-control"
                            value={user.address}
                            placeholder="123 Main St"
                            onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="city" className="form-label">
                          City:
                        </label>
                        <input
                            type="text"
                            name="city"
                            className="form-control"
                            value={user.city}
                            placeholder="City"
                            onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="state" className="form-label">
                          State:
                        </label>
                        <input
                            type="text"
                            name="state"
                            className="form-control"
                            value={user.state}
                            placeholder="State"
                            onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="country" className="form-label">
                          Country:
                        </label>
                        <input
                            type="text"
                            name="country"
                            className="form-control"
                            value={user.country}
                            placeholder="Country"
                            onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="bio" className="form-label">
                      Bio:
                    </label>
                    <textarea
                        className="form-control"
                        name="bio"
                        rows="3"
                        value={user.bio}
                        placeholder="Write your bio here..."
                        onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-success">
                      {isEditMode ? "Update" : "Save changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div
            className="modal fade"
            id="viewUser"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
          <div className="modal-dialog" style={{ maxWidth: "70%" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h3>User Details</h3>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div
                        className="mb-3 d-flex gap-2"
                        style={{
                          fontSize: "18px",
                          borderBottom: "1px solid rgba(0,0,0,0.2)",
                        }}
                    >
                      <p className="fw-bold">Name:</p>
                      <p style={{ fontStyle: "italic" }}>{user.name}</p>
                    </div>
                    <div
                        className="mb-3 d-flex gap-2"
                        style={{
                          fontSize: "18px",
                          borderBottom: "1px solid rgba(0,0,0,0.2)",
                        }}
                    >
                      <p className="fw-bold">User Name:</p>
                      <p style={{ fontStyle: "italic" }}>{user.username}</p>
                    </div>
                    <div
                        className="mb-3 d-flex gap-2"
                        style={{
                          fontSize: "18px",
                          borderBottom: "1px solid rgba(0,0,0,0.2)",
                        }}
                    >
                      <p className="fw-bold">Email:</p>
                      <p style={{ fontStyle: "italic" }}>{user.email}</p>
                    </div>
                    <div
                        className="mb-3 d-flex gap-2"
                        style={{
                          fontSize: "18px",
                          borderBottom: "1px solid rgba(0,0,0,0.2)",
                        }}
                    >
                      <p className="fw-bold">Phone:</p>
                      <p style={{ fontStyle: "italic" }}>{user.phone}</p>
                    </div>
                    <div
                        className="mb-3 d-flex gap-2"
                        style={{
                          fontSize: "18px",
                          borderBottom: "1px solid rgba(0,0,0,0.2)",
                        }}
                    >
                      <p className="fw-bold">Department:</p>
                      <p style={{ fontStyle: "italic" }}>{user.department}</p>
                    </div>
                    <div
                        className="mb-3 d-flex gap-2"
                        style={{
                          fontSize: "18px",
                          borderBottom: "1px solid rgba(0,0,0,0.2)",
                        }}
                    >
                      <p className="fw-bold">Role:</p>
                      <p style={{ fontStyle: "italic" }}>{user.role}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                        className="mb-3 d-flex gap-2"
                        style={{
                          fontSize: "18px",
                          borderBottom: "1px solid rgba(0,0,0,0.2)",
                        }}
                    >
                      <p className="fw-bold">Company:</p>
                      <p style={{ fontStyle: "italic" }}>{user.company}</p>
                    </div>
                    <div
                        className="mb-3 d-flex gap-2"
                        style={{
                          fontSize: "18px",
                          borderBottom: "1px solid rgba(0,0,0,0.2)",
                        }}
                    >
                      <p className="fw-bold">Employee No:</p>
                      <p style={{ fontStyle: "italic" }}>{user.employeeNo}</p>
                    </div>
                    <div
                        className="mb-3 d-flex gap-2"
                        style={{
                          fontSize: "18px",
                          borderBottom: "1px solid rgba(0,0,0,0.2)",
                        }}
                    >
                      <p className="fw-bold">Location:</p>
                      <p style={{ fontStyle: "italic" }}>{user.location}</p>
                    </div>
                    <div
                        className="mb-3 d-flex gap-2"
                        style={{
                          fontSize: "18px",
                          borderBottom: "1px solid rgba(0,0,0,0.2)",
                        }}
                    >
                      <p className="fw-bold">Website:</p>
                      <p style={{ fontStyle: "italic" }}>{user.website}</p>
                    </div>
                    <div
                        className="mb-3 d-flex gap-2"
                        style={{
                          fontSize: "18px",
                          borderBottom: "1px solid rgba(0,0,0,0.2)",
                        }}
                    >
                      <p className="fw-bold">Address:</p>
                      <p style={{ fontStyle: "italic" }}>{user.address}</p>
                    </div>
                    <div
                        className="mb-3 d-flex gap-2"
                        style={{
                          fontSize: "18px",
                          borderBottom: "1px solid rgba(0,0,0,0.2)",
                        }}
                    >
                      <p className="fw-bold">City/State/Country:</p>
                      <p style={{ fontStyle: "italic" }}>
                        {user.city}, {user.state}, {user.country}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-3" style={{ fontSize: "18px" }}>
                  <p className="fw-bold">Bio:</p>
                  <p style={{ fontStyle: "italic" }}>{user.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Users;