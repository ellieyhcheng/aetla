import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import * as ROUTES from '../../constants/routes';

function PrivateRoute({ component: Component, authUser, ...rest }) {
    return (
        <Route
            {...rest}
            render={routeProps => 
                authUser ? (
                    <Component {...routeProps} />
                ) : (
                        <Redirect
                            to={{
                                pathname: ROUTES.SIGN_IN,
                                state: { from: routeProps.location }
                            }}
                        />
                    )
            }
        />
    )
}

const mapStateToProps = state => {
    return {
        authUser: state.auth.authUser
    }
}

export default connect(mapStateToProps, {})(PrivateRoute)