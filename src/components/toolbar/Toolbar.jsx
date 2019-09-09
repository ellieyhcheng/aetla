import React, { Component } from 'react';
import './Toolbar.scss';
import Button from '../button/Button';
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes';
import { withRouter } from "react-router-dom";
import { withApiClient } from "../../ApiClient";
import { connect } from "react-redux";
import SignOut from '../account/SignOut/SignOut';
import { download } from "../../utils";

class Toolbar extends Component {

    onDownload = () => {
        this.props.apiClient.getOnePlan(this.props.id)
        .then(data => {
            if (data === 'error')
                return
            else {
                download(data);
            }
        })
    }

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
                            <Button type="icon" icon="trash-alt" tooltip="Delete" direction="right" onClick={this.props.onDelete} />
                        </li>
                        <li>
                            <Button type="icon" icon="download" tooltip="Export Plan" direction="right" onClick={this.onDownload}/>
                        </li>
                        <li>
                            <Button type="icon" icon="sliders-h" tooltip="Plan Settings" direction="right" onClick={this.props.onSettings}/>
                        </li>
                        <li>
                            <Button type="icon" icon="question-circle" tooltip="Help" direction="right" />
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

const mapStateToProps = state => {
    return {
        id: state.planner.id,
    }
}

export default connect(mapStateToProps, {})(withApiClient(withRouter(Toolbar)));
