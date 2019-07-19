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
                        <li><Button type="icon" icon="home" tooltip="Dashboard" direction="right"/></li>
                        <li><Button type="icon" icon="copy" tooltip="Copy" direction="right"/></li>
                        <li><Button type="icon" icon="trash-alt" tooltip="Delete" direction="right"/></li>
                        <li><Button type="icon" icon="download" tooltip="Export Plan" direction="right"/></li>
                        <li><Button type="icon" icon="sliders-h" tooltip="Plan Settings" direction="right"/></li>
                        <li><Button type="icon" icon="question-circle" tooltip="Help" direction="right"/></li>
                    </ul>
                </div>
                <div className="bot">
                    <ul>
                        <li><Button type="icon" icon="cog" tooltip="Account Settings" direction="right"/></li>
                        <li><Button type="icon" icon="power-off" tooltip="Logout" direction="right"/></li>
                    </ul>
                    <div className="line-v" />
                </div>
            </div>
        )
    }
}

export default Toolbar;
