import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './Toolbar.scss';
import Button from '../button/Button';

class Toolbar extends Component {
    render() {
        return (
            <div className="toolbar">
                <div className="top">
                    <div className="line-v" />
                    <ul>
                        <li><Button type="icon" icon="home" tooltip="Dashboard"/></li>
                        <li><Button type="icon" icon="copy" tooltip="Copy"/></li>
                        <li><Button type="icon" icon="trash-alt" tooltip="Delete"/></li>
                        <li><Button type="icon" icon="download" tooltip="Export Plan"/></li>
                        <li><Button type="icon" icon="sliders-h" tooltip="Plan Settings"/></li>
                        <li><Button type="icon" icon="question-circle" tooltip="Help"/></li>
                    </ul>
                </div>
                <div className="bot">
                    <ul>
                        <li><Button type="icon" icon="cog" tooltip="Account Settings"/></li>
                        <li><Button type="icon" icon="power-off" tooltip="Logout"/></li>
                    </ul>
                    <div className="line-v" />
                </div>
            </div>
        )
    }
}

export default Toolbar;
