
import React from 'react'
import { FaCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
const AssetRequest = () => {
    return (
        <div className='p-5'>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Requested Date</th>
                        <th scope="col">Requested Asset</th>
                        <th scope="col">Requested User</th>
                        <th scope="col">Location</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>01-01-2025</th>
                        <td>Laptop</td>
                        <td>Yussuf</td>
                        <td>DC</td>
                        <td style={{

                            fontSize: "30px",
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }} >
                            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 5px', borderRadius: '40px', backdropFilter: 'blur(5px)', border: '1px solid black',backgroundColor:'#F2F4F7', width:'100px', height:'30px',fontSize:'15px',cursor: 'pointer' }}>
    <FaCircle style={{ color: 'black', marginRight: '5px', cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#pendingUser" />
    <span style={{ color: 'black' }}>Pending</span>
</div>
                        </td>
                    </tr>
                    <tr>
                        <th>02-03-2025</th>
                        <td>Furniture</td>
                        <td>James</td>
                        <td>ICM</td>
                        <td style={{

                            fontSize: "30px",
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }} >
                                              <div style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 5px', borderRadius: '40px', backdropFilter: 'blur(5px)', border: '1px solid black',backgroundColor:'#F2F4F7', width:'100px', height:'30px',fontSize:'15px',cursor: 'pointer' }}>
    <FaCheckCircle style={{ color: 'green', marginRight: '5px', cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#pendingUser" />
    <span style={{ color: 'black' }}>Approved</span>
</div>
                        </td>
                    </tr>

                    <tr>
                        <th>01-02-2025</th>
                        <td>Vehicle</td>
                        <td>Abdi</td>
                        <td>Compplex</td>
                        <td style={{

                            fontSize: "30px",
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }} >
                           <div style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 5px', borderRadius: '40px', backdropFilter: 'blur(5px)', border: '1px solid black',backgroundColor:'#F2F4F7', width:'100px', height:'30px',fontSize:'15px', cursor: 'pointer'}}>
    <FaTimesCircle style={{ color: 'red', marginRight: '5px', cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#pendingUser" />
    <span style={{ color: 'black' }}>Rejected</span>
</div>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default AssetRequest