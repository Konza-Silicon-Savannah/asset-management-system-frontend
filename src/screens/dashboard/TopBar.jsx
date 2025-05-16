import React from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";

const TopBar = () => {
    return (
        <div className='row p-2 d-flex align-items-center justify-content-between mb-4'>
            <div className="col-md-8">
                <form style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div className="col-md-6">
                        <input type="text" className='form-control rounded-full shadow-sm' placeholder='search' />
                    </div>
                    <button type='submit'>
                    <IoSearchOutline style={{ fontSize: '32px', cursor: 'pointer' }} className='shadow-sm' />

                    </button>               
                     </form>

            </div>
            <div className="col-md-4 d-flex justify-content-end px-3 gap-2">
                <IoMdNotificationsOutline style={{ fontSize: '36px', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '50%', padding: '5px' }} />
                <FaRegUserCircle style={{ fontSize: '36px', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '50%', padding: '5px' }} />
            </div>
        </div>
    )
}

export default TopBar