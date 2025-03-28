import React from 'react'
import './user.css'
import { FaPlus } from "react-icons/fa";
const Users = () => {
    return (
        <div className='p-5'>
            <button className='btn btn-success float-end d-flex align-items-center gap-2'><FaPlus />Add</button>
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
                        <td className='d-flex align-items-center justify-content-center'></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td colspan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Users