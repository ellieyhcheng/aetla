import React, { Component } from 'react';
import './Planner.scss';
import Toolbar from '../components/toolbar/Toolbar'
import Button from '../components/button/Button';

class Planner extends Component {
    render() {
        return (
            <div className="planner">
                <Toolbar />

                <div className="planner-content">
                    <div className="planner-header">
                        <div>
                            {/* TODO: Name should come from database */}
                            <p>my first ever plan</p>
                            <div className="save-button">
                                <Button type="icon" icon="save" />
                            </div>
                        </div>
                        <div className="line-h" />
                    </div>

                    <div className="planner-body">
                        <div className="curriculum">
                            <div className="curriculum-header">
                                <p>Curriculum</p>
                                <div className="line-h" />
                            </div>
                            <div className="curriculum-body">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Planner;
