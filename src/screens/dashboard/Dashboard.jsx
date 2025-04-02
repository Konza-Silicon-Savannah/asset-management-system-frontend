
import './dashboard.css';
import AreaChart1 from './AreaChart1';
import PieChart1 from './PieChart1';
import BarChart1 from './BarChart1';
import TopBar from './TopBar';

const Dashboard = () => {
    return (
        <div className="main-panel">
            <TopBar/>
            <div className="row">
                <div className="col-md-8">
                    <AreaChart1 />
                </div>
                <div className="col-md-4">
                    <PieChart1 />
                </div>
                <div className="col-md-12">
                    <BarChart1 />
                </div>
            </div>

        </div>
    )
}

export default Dashboard;