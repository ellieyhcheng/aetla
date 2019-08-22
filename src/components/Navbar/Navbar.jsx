import React, { Component } from 'react';
import './Navbar.scss';
import Button from '../button/Button';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <div className="top">
                    <p className="logo">LE plan</p>
                    <div className="line-h" />
                    <ul>
                        {this.props.children.map((child, i) => (
                            <li key={i}>{child}</li>
                        ))}
                    </ul>
                </div>
                <div className="bot">
                    <div className="line-h" />
                </div>
            </div>
        )
    }
}

export default Navbar;
