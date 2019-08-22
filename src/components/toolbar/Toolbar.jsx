import React, { Component } from 'react';
import './Toolbar.scss';
import Button from '../button/Button';
import { Link } from 'react-router-dom'

class Toolbar extends Component {
    render() {
        return (
            <div className="toolbar">
                <div className="top">
                    <div className="line-v" />
                    <ul>
<<<<<<< HEAD
                        <li>
                            <Link to="/">
                                <Button type="icon" icon="home" tooltip="Dashboard" direction="right" />
                            </Link>
                        </li>
                        <li>
                            <Button type="icon" icon="copy" tooltip="Copy" direction="right" />
                        </li>
                        <li>
                            <Button type="icon" icon="trash-alt" tooltip="Delete" direction="right" />
                        </li>
                        <li>
                            <Button type="icon" icon="download" tooltip="Export Plan" direction="right" />
                        </li>
                        <li>
                            <Link to="/plan-settings">
                                <Button type="icon" icon="sliders-h" tooltip="Plan Settings" direction="right" />
                            </Link>
                        </li>
                        <li>
                            <Button type="icon" icon="question-circle" tooltip="Help" direction="right" />
                        </li>
=======
                        {this.props.children.map((child, i) => (
                            <li key={i}>{child}</li>
                        ))}
>>>>>>> master
                    </ul>
                </div>
                <div className="bot">
                    <ul>
                        <li>
                            <Link to="/settings">
                                <Button type="icon" icon="cog" tooltip="Account Settings" direction="right" />
                            </Link>
                        </li>
                        <li>
                            <Button type="icon" icon="power-off" tooltip="Logout" direction="right" />
                        </li>
                    </ul>
                    <div className="line-v" />
                </div>
            </div>
        )
    }
}

export default Toolbar;
