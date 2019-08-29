import React from "react";
import { Link, Redirect } from 'react-router-dom';
import './Landing.scss';
import logo from '../../logo-light.svg';
import example from '../../example-medium.jpg';
import {Button} from 'reactstrap';
import * as ROUTES from '../../constants/routes';
import { connect } from 'react-redux';

function Landing(props) {
    const authLanding = (<Redirect to={ROUTES.DASHBOARD} />);
    const noAuthLanding = (
        <div className="landing page">
            <div className="links">
                <Link to={ROUTES.LANDING}>
                    <img className="logo" src={logo} alt="LE plan" />
                </Link>
                <div className="right">
                    <Link to={ROUTES.SIGN_IN}>
                        <p className="link">Sign In</p>
                    </Link>
                    <Link to={ROUTES.SIGN_UP}>
                        <Button outline color="primary">Sign Up</Button>
                    </Link>
                </div>
            </div>

            <div className="content">
                <div className="section one">
                    <div className="eg-border">
                        <img className="example" src={example} alt="Planner example"/>
                    </div>
                    <div className="description">
                        <h1>Course planning made simple</h1>
                        <h5>Forget pen and paper. <br/> Plan your college years the modern way.</h5>
                        <Link to={ROUTES.GET_STARTED}>
                            <Button size="lg" color="yellow">Get Started</Button>
                        </Link>
                    </div>
                </div>
                <div className="section">
                    <h2>Start</h2>
                    <h5>No accounts necessary to make a plan! Just</h5>
                    <Link to={ROUTES.GET_STARTED}>
                        <Button size="lg" color="yellow">Get Started</Button>
                    </Link>
                </div>
                <div className="section">
                    <h2>Drag</h2>
                </div>
                <div className="section">
                    <h2>Drop</h2>
                </div>
                <div className="section">
                    <h2>Save</h2>
                    <h5>Make an account to save your plan!</h5>
                </div>
                <div className="section">
                    <h3>Studying for classes is already hard enough. Plan your courses the easy way.</h3> 
                    <h3>Sign up now for free.</h3>
                    {/* Insert sign up form */}
                </div>
            </div>
        </div>
    )

    return props.authUser ? authLanding : noAuthLanding;    
}

const mapStateToProps = (state) => {
    return {
        authUser: state.auth.authUser,
    }
}

export default connect(mapStateToProps, {})(Landing);