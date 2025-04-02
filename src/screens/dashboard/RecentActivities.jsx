import React from 'react'

const RecentActivities = () => {
  return (
    <div className='my-3'>
        <h3 className='my-4 fw-bold'>Recent Activities</h3>
         <table className="table table-hover mx-1">
                        <thead className='table-success'>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">DATE</th>
                                <th scope="col">ISSUER</th>
                                <th scope="col">ACTION</th>
                                <th scope="col">ITEM</th>
                                <th scope="col">USER</th>
                                <th scope="col">DEPARTMENT</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>01-01-2025</td>
                                <td>James</td>
                                <td>Check in</td>
                                <td>hp elitebook</td>                            
                                <td>Shueib</td>                            
                                <td>DC</td>                            
                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>02-03-2025</td>
                                <td>Mumo</td>
                                <td>new asset</td>
                                <td>Huawei metabook</td>
                                <td>Winnie </td>
                                <td>ICM</td>
                            </tr>
        
                        </tbody>
                    </table>
    </div>
  )
}

export default RecentActivities