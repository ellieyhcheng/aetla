import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Toolbar from '../../components/toolbar/Toolbar'
import PlanList from '../../components/PlanList/PlanList'
import Navbar from '../../components/Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SignOut from '../../components/auth/SignOut/SignOut';


class PlanGrid extends Component {
    render() {
        return (
            <div className="plangrid">
                <Navbar>
                    <Link to="/dashboard">
                        <div className="navbar-item">
                            <FontAwesomeIcon icon="home" fixedWidth />
                            <p>Dashboard</p>
                        </div>
                    </Link>
                    <div className="navbar-item">
                        <FontAwesomeIcon icon="file" fixedWidth />
                        <p>Resources</p>
                    </div>
                    <div className="navbar-item">
                        <FontAwesomeIcon icon="cog" fixedWidth />
                        <p>Settings</p>
                    </div>
                    <SignOut>
                        <div className="navbar-item">
                            <FontAwesomeIcon icon="power-off" fixedWidth />
                            <p>Log Out</p>
                        </div>
                    </SignOut>

                </Navbar>
                <PlanList />
            </div>
        )
    }
}

export default PlanGrid;