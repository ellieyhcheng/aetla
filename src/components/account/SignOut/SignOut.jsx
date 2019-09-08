import React from "react";
import { withFirebase } from '../../../Firebase';
import './SignOut.scss';
import { withRouter } from "react-router-dom";
import * as ROUTES from '../../../constants/routes';
import { connect } from "react-redux";
import { setUserProfile } from "../../../actions/itemActions";

function SignOut(props) {
    return(
        <div className="signout" onClick={() => {
            setTimeout(() => {
            props.firebase.doSignOut().then(() => {
                props.setUserProfile(null);
                props.history.push(ROUTES.LANDING);
            })}, 1000)
        }}>
            {props.children}
        </div>
    )
}


export default withRouter(withFirebase(connect(() => {}, {setUserProfile})(SignOut)));