import { ClipboardCheck, Gauge, MapPin } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import '../../src/App.css'
function LandingPage() {
    return (
        <div>
            <nav style={{ display: 'fixed', width:'100%', justifyContent: "space-between", alignItems: "center", backgroundColor: '#00763A', padding: "10px 30px" }}>
                <img src="images/konza.jpg" alt="" width="40px" />
                <ul>
                    <li style={{ display: "flex", gap: '30px', color: "white" }}>
                        <Link>Privacy Policy</Link>
                    </li>
                </ul>
            </nav>
            <header>
                <div className='col' >
                    <MapPin style={{ color: "" }} size={45} />
                    <h1> Asset Tracking</h1>
                    <p>Track asset location, status, and <br /> history in real-time.</p>

                </div>
                <div className='col'>
                    <ClipboardCheck size={45} />
                    <h1>Issuance & Returns</h1>
                    <p>Easily manage asset issuance and  return workflows <br /> with digital approvals.</p>

                </div>
                <div className='col'>
                    <Gauge size={45} />
                    <h1>
                        Analytics Dashboard

                    </h1>
                    <p>Visualize asset statistics, usage trends, and disposal alerts <br /> at a glance</p>
                </div>
            </header>
            <div style={{ display: 'flex', justifyContent: "center" }}>

                <Link className='getstarted-btn' to={'/signin'}>Get Started</Link>
            </div>

        </div>
    )
}

export default LandingPage