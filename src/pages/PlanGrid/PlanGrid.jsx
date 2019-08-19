import React, { Component } from 'react';
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
// import './Planner.scss';
import Toolbar from '../../components/toolbar/Toolbar'
import PlanList from '../../components/PlanList/PlanList'


class PlanGrid extends Component {
    render() {
        return (
            <div className="planner">
                <Toolbar/>
                <PlanList/>
            </div>
        )
    }
}

export default PlanGrid;