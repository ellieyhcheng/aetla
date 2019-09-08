import React from "react";
import { withFirebase } from '../../../Firebase';
import './SignOut.scss';
import { withRouter } from "react-router-dom";
import * as ROUTES from '../../../constants/routes';
import { connect } from "react-redux";
import { setUserProfile, setAuthUser } from "../../../actions/itemActions";

function SignOut(props) {
    return (
        <div className="signout" onClick={() => {
            setTimeout(() => {
                props.firebase.doSignOut().then(() => {
                    props.setAuthUser(null);
                    props.setUserProfile(null);
                    props.history.push(ROUTES.LANDING);
                })
            }, 500)
        }}>
            {props.children}
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

export default withRouter(withFirebase(connect(mapStateToProps, { setUserProfile, setAuthUser })(SignOut)));