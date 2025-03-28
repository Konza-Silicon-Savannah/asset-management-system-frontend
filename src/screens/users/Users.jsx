import React from 'react'
import './user.css'
import { FaPlus } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
const Users = () => {
    return (
        <div className='p-5'>
            <button className='btn btn-success float-end d-flex align-items-center gap-2' data-bs-toggle="modal" data-bs-target="#exampleModal"><FaPlus />Add</button>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">NAME</th>
                        <th scope="col">USERNAME</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">DEPARTMENT</th>
                        <th scope="col">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Ian Malenya</td>
                        <td>James</td>
                        <td>Ian@example.com</td>
                        <td>Data Center</td>
                        <td style={{

                            fontSize: "30px",
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }} >
                            <FaEye style={{ color: 'green', cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#viewUser" />
                            <RiPencilFill style={{ color: 'black', cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#editUser"/>
                            <RiDeleteBin6Line style={{ color: 'red', cursor: 'pointer' }} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td>Hello World</td>
                        <td>Mumo</td>
                        <td>jmumo@outlook.com</td>
                        <td>Business Enterprise</td>
                        <td style={{

                            fontSize: "30px",
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }} >
                            <FaEye style={{ color: 'green', cursor: 'pointer' }} />
                            <RiPencilFill style={{ color: 'black', cursor: 'pointer' }} />
                            <RiDeleteBin6Line style={{ color: 'red', cursor: 'pointer' }} />
                        </td>
                    </tr>

                </tbody>
            </table>

            {/* add form modal  */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog" style={{ maxWidth: '60%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" >
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Name:</label>
                                <input type="text" className="form-control" placeholder="Guleid Abdilatif" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Username:</label>
                                <input type="text" className="form-control" placeholder="guledabdilatif" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Email:</label>
                                <input type="text" className="form-control" placeholder="name@example.com" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Department:</label>
                                <input type="text" className="form-control" placeholder="ICM, DC" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlTextarea1" className="form-label">Bio:</label>
                                <textarea className="form-control" type='text' rows="3" placeholder='write your bio here...'></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* view user form  */}
            <div className="modal fade" id="viewUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog" style={{ maxWidth: '60%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" >
                            <div className="mb-3 d-flex gap-2 " style={{ fontSize: '18px', borderBottom: '1px solid rgba(0,0,0,0.2) ' }}>
                                <p className="">Name:</p>
                                <p style={{ fontStyle: 'italic' }}>Guleid Abdilatif</p>
                            </div>
                            <div className="mb-3 d-flex gap-2 " style={{ fontSize: '18px', borderBottom: '1px solid rgba(0,0,0,0.2) ' }}>
                                <p className="">User Name:</p>
                                <p style={{ fontStyle: 'italic' }}>guledabdilatif</p>
                            </div>
                            <div className="mb-3 d-flex gap-2 " style={{ fontSize: '18px', borderBottom: '1px solid rgba(0,0,0,0.2) ' }}>
                                <p className="">Email:</p>
                                <p style={{ fontStyle: 'italic' }}>example@example.com</p>
                            </div>
                            <div className="mb-3 d-flex gap-2 " style={{ fontSize: '18px', borderBottom: '1px solid rgba(0,0,0,0.2) ' }}>
                                <p className="">Department:</p>
                                <p style={{ fontStyle: 'italic' }}>Dc</p>
                            </div>
                            <div className="mb-3 d-flex align-items-start gap-2  " style={{ fontSize: '18px', }}>
                                <p className="">Bio:</p>
                                <p style={{ fontStyle: 'italic' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quia ratione laudantium accusantium similique ea laboriosam architecto natus ipsam. Nesciunt quia fugit cumque minus non quis debitis possimus culpa sint.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* edit user form */}
            <div className="modal fade" id="editUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog" style={{ maxWidth: '60%' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" >
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Name:</label>
                                <input type="text" className="form-control" placeholder="Guleid Abdilatif" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Username:</label>
                                <input type="text" className="form-control" placeholder="guledabdilatif" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Email:</label>
                                <input type="text" className="form-control" placeholder="name@example.com" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Department:</label>
                                <input type="text" className="form-control" placeholder="ICM, DC" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleFormControlTextarea1" className="form-label">Bio:</label>
                                <textarea className="form-control" type='text' rows="3" placeholder='write your bio here...'></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users