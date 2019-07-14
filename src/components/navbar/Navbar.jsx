import React, { Component } from 'react';
import './Navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <div className="top">
                    <div className="line-v" />
                    <ul>
                        <li><FontAwesomeIcon icon="home" fixedWidth className="icons" /></li>
                        <li><FontAwesomeIcon icon="copy" fixedWidth className="icons" /></li>
                        <li><FontAwesomeIcon icon="trash-alt" fixedWidth className="icons" /></li>
                        <li><FontAwesomeIcon icon="download" fixedWidth className="icons" /></li>
                        <li><FontAwesomeIcon icon="sliders-h" fixedWidth className="icons" /></li>
                        <li><FontAwesomeIcon icon="question-circle" fixedWidth className="icons" /></li>
                    </ul>
                </div>
                <div className="bot">
                    <ul>
                        <li><FontAwesomeIcon icon="cog" fixedWidth className="icons" /></li>
                        <li><FontAwesomeIcon icon="power-off" fixedWidth className="icons" /></li>
                    </ul>
                    <div className="line-v" />
                </div>
            </div>
        )
    }
}

export default Navbar;
