import React, {useEffect} from "react";
import { Link, Redirect } from 'react-router-dom';
import './Landing.scss';
import logo from '../../assets/aetla-light.svg';
import example from '../../assets/example-medium.jpg';
import {Button} from 'semantic-ui-react';
import * as ROUTES from '../../constants/routes';
import { connect } from 'react-redux';
import { SignUpForm } from "../SignUp/SignUp";

function Landing(props) {
    useEffect(() => {
        document.title = 'Aetla'
    }, []);
    const authLanding = (<Redirect to={ROUTES.DASHBOARD} />);
    const noAuthLanding = (
        <div className="landing page">
            <div className="links">
                <Link to={ROUTES.LANDING}>
                    <img className="logo" src={logo} alt="LE plan" />
                </Link>
                <div className="right">
                    <Link to={ROUTES.SIGN_IN}>
                        <Button primary>Sign In</Button>
                    </Link>
                    <Link to={ROUTES.SIGN_UP}>
                        <Button basic secondary>Sign Up</Button>
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
                        <h3>Forget pen and paper. <br/> Plan your college years the modern way.</h3>
                        <Link to={ROUTES.GET_STARTED}>
                            <Button color="yellow">Get Started</Button>
                        </Link>
                        <p>*Anyone can make a plan, but only registered users can save plans.</p>

                    </div>
                </div>
                <div className="section">
                    <h1>Major Customized</h1>
                    <h3>All the classes you need for you major, filtered just for you.</h3>
                </div>
                <div className="section">
                    <h1>Drag and Drop</h1>
                    <h3>Intuitive interface to make life simple.</h3>
                </div>
                <div className="section">
                    <h1>Accessible Information</h1>
                    <h3>Everything you need to know about a class, right here in the planner.</h3>
                </div>
                <div className="section five">
                    <h3>Studying for classes is already hard enough. Plan your courses the easy way. <br/>
                        Sign up now for FREE.</h3>
                    <div className="signupform">
                        <SignUpForm/>
                    </div>
                </div>
            </div>
        </div>
    )

    return props.authUser ? authLanding : noAuthLanding;
    // return noAuthLanding;
}

const mapStateToProps = (state) => {
    return {
        authUser: state.auth.authUser,
    }
}

export default connect(mapStateToProps, {})(Landing);