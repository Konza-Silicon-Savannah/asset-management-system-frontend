
import React from 'react'
import { FaCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ViewAsset = () => {
    return (
        <div className='p-5'>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Asset Tag</th>
                        <th scope="col">Model</th>
                        <th scope="col">Supplier</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Laptop</th>
                        <td>DC0001</td>
                        <td>HP</td>
                        <td>Huawei</td>
                        <td>Electronic</td>
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
                        <th>Desktop</th>
                        <td>ICM001</td>
                        <td>Lenovo</td>
                        <td>Microsoft</td>
                        <td>Electronic</td>
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
                        <th>Laptop</th>
                        <td>Complex007</td>
                        <td>Macbook</td>
                        <td>Apple</td>
                        <td>Electronic</td>
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

export default ViewAsset