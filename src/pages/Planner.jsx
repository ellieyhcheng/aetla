import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './Planner.scss';
import Toolbar from '../components/toolbar/Toolbar'

class Planner extends Component {
    render() {
        return (
            <div className="planner">
                <Toolbar/>

                
            </div>
        )
    }
}

export default Planner;
