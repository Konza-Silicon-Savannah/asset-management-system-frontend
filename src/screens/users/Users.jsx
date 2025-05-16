import React, { useEffect, useState } from "react";
import "./user.css";
import { FaPlus } from "react-icons/fa";
import { LucideDelete, LucideEdit, LucideEye, LucideTrash } from "lucide-react";
import axios from "axios";

const Users = () => {
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
    status: "inactive",
  });
  const [users, setUsers] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/users/`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUsers = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/users/${id}/`);
      // setUsers(response.data);
      location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/users/${id}/`);
      setUser(response.data);
      setIsEditMode(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //
      const res = user.id
        ? await axios.put(`http://127.0.0.1:8000/users/${user.id}/`, user)
        : await axios.post("http://127.0.0.1:8000/users/", user);

      location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleUserStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      const response = await axios.patch(`http://127.0.0.1:8000/users/${id}/`, {
        status: newStatus,
      });

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-5">
      <button
        className="btn btn-success float-end d-flex align-items-center gap-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <FaPlus />
        Add
      </button>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Location</th>
            <th scope="col">Emp No.</th>
            <th scope="col">Department</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.location}</td>
              <td>{user.employeeNo}</td>
              <td>{user.department}</td>
              <td>
                <span
                  className={`badge ${
                    user.status === "active" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {user.status === "active" ? "Active" : "Inactive"}
                </span>
              </td>
              <td
                style={{
                  fontSize: "30px",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <LucideEye
                  style={{ color: "green", cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target="#viewUser"
                  onClick={() => fetchUser(user.id)}
                />
                <LucideEdit
                  style={{ color: "black", cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => fetchUser(user.id)}
                />
                <LucideTrash
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => deleteUsers(user.id)}
                />
                <button
                  className={`btn btn-sm ${
                    user.status === "active" ? "btn-danger" : "btn-success"
                  }`}
                  onClick={() => toggleUserStatus(user.id, user.status)}
                >
                  {user.status === "active" ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
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
