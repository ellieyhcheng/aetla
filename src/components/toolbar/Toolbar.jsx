import React, { Component } from 'react';
import './Toolbar.scss';
import Button from '../button/Button';

class Toolbar extends Component {
    render() {
        return (
            <div className="toolbar">
                <div className="top">
                    <div className="line-v" />
                    <ul>
                        {this.props.children.map((child, i) => (
                            <li key={i}>{child}</li>
                        ))}
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
