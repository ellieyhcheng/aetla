import React, { Component } from 'react';
import './Toolbar.scss';
import Button from '../button/Button';
import { Link } from 'react-router-dom'
import * as ROUTES from '../../utils/routes';
import SignOut from '../account/SignOut/SignOut';

class Toolbar extends Component {

    render() {
        return (
            <div className="toolbar">
                <div className="top">
                    <div className="line-v" />
                    <ul>
                        <li>
                            <Button type="icon" icon="home" tooltip="Dashboard" direction="right" onClick={this.props.onExit} />
                        </li>
                        <li>
                            <Button type="icon" icon="copy" tooltip="Copy" direction="right" onClick={this.props.onCopy} />
                        </li>
                        <li>
                            <Button type="icon" icon="download" tooltip="Export Plan" direction="right" onClick={this.props.onDownload}/>
                        </li>
                        <li>
                            <Button type="icon" icon="sliders-h" tooltip="Plan Settings" direction="right" onClick={this.props.onSettings}/>
                        </li>
                        <li>
                            <Button type="icon" icon="trash-alt" tooltip="Delete" direction="right" onClick={this.props.onDelete} />
                        </li>
                        <li>
                            <Button type="icon" icon="question-circle" tooltip="Help" direction="right" onClick={this.props.onHelp}/>
                        </li>
                    </ul>
                </div>
                <div className="bot">
                    <ul>
                        <li>
                            <Link to={ROUTES.ACCOUNT}>
                                <Button type="icon" icon="cog" tooltip="Account Settings" direction="right" />
                            </Link>
                        </li>
                        <li>
                            <SignOut>
                                <Button type="icon" icon="power-off" tooltip="Logout" direction="right" />
                            </SignOut>
                        </li>
                    </ul>
                    <div className="line-v" />
                </div>
            </div>
        )
    }
}

export default Toolbar;
