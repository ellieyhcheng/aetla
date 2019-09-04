import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import './Dashboard.scss';
import withAuthorization from "../../components/Session/withAuthorization";

function Dashboard() {
    useEffect(() => {
        document.title = 'Dashboard - Aetla'
    }, []);
    return (
        <div className="dashboard">
            <Navbar />

            <div className="content">

                <div className="header">
                    <h1>Dashboard</h1>
                    <hr />
                </div>
                <div className="grid">
                    
                </div>
            </div>
        </div>
    )
}

export default withAuthorization(Dashboard);