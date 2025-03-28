import { Link } from 'react-router-dom';
import konza from '/images/konza.jpg';
import { Folders, GitPullRequest, LayoutDashboard, LayoutGrid, Users2 } from 'lucide-react';

const SideBar = () => {
    
    return (
        <div className="w-[20%]  text-white p-3" style={{backgroundColor:'#00763A', margin:0}}>
            <div className="h-[10rem] w-full">
                <img src={konza} alt="Konza" className='w-full h-full object-contain' />
            </div>

            <div className='space-y-5 text-xl mt-7'>
                <Link to='/' className='flex items-center gap-3'>
                    <LayoutDashboard />
                    <span>Dashboard</span>
                </Link>
                <Link to='/assets/view' className='flex items-center gap-3'>
                    <Folders />
                    <span>Asset management</span>
                </Link>
                <Link to='/assets/request' className='flex items-center gap-3'>
                    <GitPullRequest />
                    <span>Requested Assets</span>
                </Link>
                <Link to='/users' className='flex items-center gap-3'>
                    <Users2 />
                    <span>User Management</span>
                </Link>
            </div>
        </div>
    );
};

export default SideBar;
