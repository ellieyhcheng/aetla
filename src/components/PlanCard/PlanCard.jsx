import React, { useEffect } from "react";
import './PlanCard.scss';
import Button from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import * as ROUTES from '../../constants/routes';

function PlanCard(props) {
    const onMouseOver = (e) => {
        e.currentTarget.querySelector('.title').style.filter = "blur(1.5px)";
        e.currentTarget.querySelector('.description').style.filter = "blur(1.5px)";
        e.currentTarget.querySelector('.buttons').style.transform = "translateY(-100%)";
    }

    const onMouseLeave = (e) => {
        e.currentTarget.querySelector('.title').style.filter = "";
        e.currentTarget.querySelector('.description').style.filter = "";
        e.currentTarget.querySelector('.buttons').style.transform = "translateY(0)";

    }

    const emptyMouseOver = (e) => {
        e.currentTarget.querySelector('.title').style.filter = "brightness(1.7)";
        e.currentTarget.querySelector('.button').style.filter = "brightness(1.7)";
    }

    const emptyMouseLeave = (e) => {
        e.currentTarget.querySelector('.title').style.filter = "brightness(1)";
        e.currentTarget.querySelector('.button').style.filter = "brightness(1)";
    }

    const onDoubleClick = (e) => {
        props.history.push(ROUTES.PLANNER.replace(':id', `${btoa(unescape(encodeURIComponent(props["_id"])))}`))
    }

    return props.empty ? (
        <div className="plancard newcard" onMouseOver={emptyMouseOver} onMouseLeave={emptyMouseLeave}>
            <div className="button">
                <FontAwesomeIcon icon="copy" />
            </div>
            <div className="title">
                New Plan
            </div>
        </div>
    ) : (
        <div className="plancard" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} onDoubleClick={onDoubleClick}>
            <div className="title">{props.title}</div>
            <div className="description">{props.description}</div>
            <div className="buttons">
                <Button type="icon" icon="copy" dark fixedWidth tooltip="Copy" direction="top"/>
                <Button type="icon" icon="download" dark fixedWidth tooltip="Download" direction="top"/>
                <Button type="icon" icon="trash-alt" dark fixedWidth tooltip="Delete" direction="top"/>
            </div>
        </div>
    )
}

export default withRouter(PlanCard);
