import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
// import Toolbar from '../../components/toolbar/Toolbar'
import PlanList from '../../components/PlanList/PlanList'
import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class PlanGrid extends Component {
    render() {
        return (
            <div className="planner">
                <Navbar>
                    <div className="navbar-item">
                        <FontAwesomeIcon icon="home" fixedWidth/>
                        <p>Dashboard</p>
                    </div>
                    <div className="navbar-item">
                        <FontAwesomeIcon icon="file" fixedWidth/>
                        <p>Resources</p>
                    </div>
                    <div className="navbar-item">
                        <FontAwesomeIcon icon="cog" fixedWidth/>
                        <p>Settings</p>
                    </div>
                    <div className="navbar-item">
                        <FontAwesomeIcon icon="power-off" fixedWidth/>
                        <p>Log Out</p>
                    </div>
                </Navbar>
                <PlanList />
            </div>
        )
    }
}

export default PlanGrid;