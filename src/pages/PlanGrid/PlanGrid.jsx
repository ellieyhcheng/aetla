import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Toolbar from '../../components/toolbar/Toolbar'
import PlanList from '../../components/PlanList/PlanList'
import Navbar from '../../components/Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SignOut from '../../components/account/SignOut/SignOut';
import * as ROUTES from '../../constants/routes';

class PlanGrid extends Component {
    render() {
        return (
            <div className="plangrid">
                <Navbar>
                    
                </Navbar>
                <PlanList />
            </div>
        )
    }
}

export default PlanGrid;