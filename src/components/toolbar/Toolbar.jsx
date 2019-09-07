import React, { Component } from 'react';
import './Toolbar.scss';
import Button from '../button/Button';
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes';
import { withRouter } from "react-router-dom";
import { withApiClient } from "../../ApiClient";
import { connect } from "react-redux";
import { deletePlan } from "../../actions/itemActions";

class Toolbar extends Component {
    onDelete = (e) => {
        this.props.apiClient.deletePlan(this.props.id)
            .then(data => {
                if (data === 'error')
                    console.log('Error occured deleting plan ' + this.props.id);
                else {
                    this.props.deletePlan(this.props.id);
                }
            })
        this.props.history.push(ROUTES.DASHBOARD);
    }

    render() {
        return (
            <div className="toolbar">
                <div className="top">
                    <div className="line-v" />
                    <ul>
                        <li>
                            <Link to={ROUTES.DASHBOARD}>
                                <Button type="icon" icon="home" tooltip="Dashboard" direction="right" />
                            </Link>
                        </li>
                        <li>
                            <Button type="icon" icon="copy" tooltip="Copy" direction="right" />
                        </li>
                        <li>
                            <Button type="icon" icon="trash-alt" tooltip="Delete" direction="right" onClick={this.onDelete} />
                        </li>
                        <li>
                            <Button type="icon" icon="download" tooltip="Export Plan" direction="right" />
                        </li>
                        <li>
                            <Link to={ROUTES.PLAN_SETTINGS}>
                                <Button type="icon" icon="sliders-h" tooltip="Plan Settings" direction="right" />
                            </Link>
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
                            <Button type="icon" icon="power-off" tooltip="Logout" direction="right" />
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

export default connect(mapStateToProps, {deletePlan})(withApiClient(withRouter(Toolbar)));
