import React, { useEffect } from "react";
import { Link, Redirect } from 'react-router-dom';
import './Landing.scss';
import logo from '../../assets/aetla-light.svg';
import courselist from '../../assets/courselist.jpg';
import stack from '../../assets/stack.png';
import drag from '../../assets/drop.png';
import darkLogo from '../../assets/aetla-dark.svg';
import example from '../../assets/example-medium.jpg';
import { Button } from 'semantic-ui-react';
import * as ROUTES from '../../utils/routes';
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
                    <img className="logo" src={logo} alt="Aetla" />
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
                        <img className="example" src={example} alt="Planner example" />
                    </div>
                    <div className="description">
                        <h1>Course planning made simple</h1>
                        <h3>Forget pen and paper. <br /> Plan your college years the modern way.</h3>
                        <Link to={ROUTES.SIGN_UP}>
                            <Button color="yellow">Get Started</Button>
                        </Link>
                        {/* <p>*Anyone can make a plan, but only registered users can save plans.</p> */}

                    </div>
                </div>
                <div className="section two">
                    <div className="vertical">
                        <h1>Major Customized</h1>
                        <h3>All the classes you need for you major, filtered just for you.</h3>
                    </div>
                    <div className="image">
                        <img src={courselist} alt="Course List" />
                    </div>
                </div>
                <div className="section three">
                    <div className="image">
                        <img src={drag} alt="Course List" />
                    </div>
                    <div className="vertical">
                        <h1>Drag and Drop</h1>
                        <h3>Intuitive interface to make life simple.</h3>
                    </div>
                    
                </div>
                <div className="section four">
                    <div className="vertical">
                        <h1>Accessible Information</h1>
                        <h3>Everything you need to know about a class, right here in the planner.</h3>
                    </div>
                    <div className="image">
                        <img src={stack} alt="Course Details" />
                    </div>
                </div>
                <div className="section five">
                    <div className="vertical">
                        <h3>Studying for classes is already hard enough. Plan your courses the easy way. <br />
                            Sign up now for FREE.</h3>
                        <div className="signupform">
                            <SignUpForm />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="logo">
                        <Link to={ROUTES.LANDING}>
                            <img src={darkLogo} alt="" />
                        </Link>
                    </div>

                    <hr />

                    <Link to={ROUTES.CONTACT} >
                        <Button primary>Contact Us</Button>
                    </Link>
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