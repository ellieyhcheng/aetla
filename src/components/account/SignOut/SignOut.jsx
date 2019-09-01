import React from "react";
import { withFirebase } from '../../../Firebase';
import './SignOut.scss';
import { withRouter } from "react-router-dom";
import * as ROUTES from '../../../constants/routes';

function SignOut(props) {
    return(
        <div className="signout" onClick={() => {
            props.firebase.doSignOut().then(() => {
                setTimeout(() => {
                    props.history.push(ROUTES.LANDING);
                }, 600);
            })
        }}>
            {props.children}
        </div>
    )
}

export default withRouter(withFirebase(SignOut));