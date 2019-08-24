import React from "react";
import { Link } from 'react-router-dom';
import './Landing.scss';
import logo from '../../logo-light.svg';
import example from '../../example-medium.jpg';
import {Button} from 'reactstrap';

function Landing() {
    return(
        <div className="landing page">
            <div className="links">
                <img className="logo" src={logo} />
                <div className="right">
                    <p className="link">Sign In</p>
                    <Button outline color="primary">Sign Up</Button>
                </div>
            </div>

            <div className="content">
                <div className="section one">
                    <div className="eg-border">
                        <img className="example" src={example} />
                    </div>
                    <div className="description">
                        <h1>Course planning made simple</h1>
                        <h5>Forget pen and paper. <br/> Plan your college years the modern way.</h5>
                        <Button size="lg" color="yellow">Get Started</Button>
                    </div>
                </div>
                <div className="section">
                    <h2>Find</h2>
                </div>
                <div className="section">
                    <h2>Plan</h2>
                </div>
                <div className="section">
                    <h2>There is no step there. It's that easy</h2>
                </div>
                <div className="section">
                    <h3>Studying for classes is already hard enough.</h3> 
                    <h3>Plan your courses the easy way.</h3>
                    <h3>Sign up now for free.</h3>
                    {/* Insert sign up form */}
                </div>
            </div>
        </div>
    )
}

export default Landing;