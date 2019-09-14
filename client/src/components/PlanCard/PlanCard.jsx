import React, { Component } from "react";
import './PlanCard.scss';
import Button from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import { withApiClient } from "../../ApiClient";
import { connect } from "react-redux";
import { download } from "../../utils";
import { setUserProfile, deletePlan } from "../../actions/itemActions";

class PlanCard extends Component {

    onMouseOver = (e) => {
        e.currentTarget.querySelector('.title').style.filter = "blur(1.5px)";
        e.currentTarget.querySelector('.description').style.filter = "blur(1.5px)";
        e.currentTarget.querySelector('.buttons').style.transform = "translateY(-100%)";
    }

    onMouseLeave = (e) => {
        e.currentTarget.querySelector('.title').style.filter = "";
        e.currentTarget.querySelector('.description').style.filter = "";
        e.currentTarget.querySelector('.buttons').style.transform = "translateY(0)";

    }

    emptyMouseOver = (e) => {
        e.currentTarget.querySelector('.title').style.filter = "brightness(1.7)";
        e.currentTarget.querySelector('.button').style.filter = "brightness(1.7)";
    }

    emptyMouseLeave = (e) => {
        e.currentTarget.querySelector('.title').style.filter = "brightness(1)";
        e.currentTarget.querySelector('.button').style.filter = "brightness(1)";
    }

    onDoubleClick = (e) => {
        this.props.history.push(ROUTES.PLANNER.replace(':id', `${btoa(unescape(encodeURIComponent(this.props["_id"])))}`))
    }

    emptyClick = (e) => {
        if (this.props.onClick)
            this.props.onClick();
    }

    onDownload = () => {
        this.props.apiClient.getOnePlan(this.props["_id"])
        .then(data => {
            if (data === 'error')
                return
            else {
                download(data);
            }
        })
    }

    render() {
        return this.props.empty ? (
            <div className="plancard newcard" onMouseOver={this.emptyMouseOver} onMouseLeave={this.emptyMouseLeave} onClick={this.emptyClick} >
                <div className="button">
                    <FontAwesomeIcon icon="copy" />
                </div>
                <div className="title">
                    New Plan
                </div>
            </div>
            
        ) : (
            <div className="plancard" onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} onDoubleClick={this.onDoubleClick}>
                <div className="title">{this.props.title}</div>
                <div className="description">{this.props.description}</div>
                <div className="buttons">
                    <Button type="icon" icon="copy" dark fixedWidth tooltip="Copy" direction="top" onClick={() => this.props.onCopyClick({
                        title: this.props.title,
                        description: this.props.description,
                        id: this.props["_id"],
                    })} />
                    <Button type="icon" icon="download" dark fixedWidth tooltip="Export Plan" direction="top" onClick={this.onDownload}/>
                    <Button type="icon" icon="trash-alt" dark fixedWidth tooltip="Delete" direction="top" onClick={() => this.props.onDeleteClick(this.props["_id"])}/>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        userId: state.auth.authUser ? state.auth.authUser.uid : '',
    }
}

const actionCreator = {
    setUserProfile,
    deletePlan
}

export default withApiClient(withRouter(connect(mapStateToProps, actionCreator)(PlanCard)));
