import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Toolbar from '../../components/toolbar/Toolbar'
import PlanList from '../../components/PlanList/PlanList'
import Navbar from '../../components/Navbar/Navbar';
import withAuthorization from '../../components/Session/withAuthorization';

class PlanGrid extends Component {
    componentDidMount() {
        document.title = 'Dashboard - Aetla'
    }

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


export default withAuthorization(PlanGrid);