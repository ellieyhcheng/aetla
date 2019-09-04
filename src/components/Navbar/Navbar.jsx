import React, { Component } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SignOut from '../account/SignOut/SignOut';
import * as ROUTES from '../../constants/routes';
import logo from '../../assets/aetla-light.svg';


class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <div className="top">
                    <Link to={ROUTES.DASHBOARD}>
                        <img className="logo" src={logo} alt="LE plan" />
                    </Link>
                    <div className="line-h" />
                    <ul>
                        <Link to={ROUTES.DASHBOARD}>
                            <div className="navbar-item">
                                <FontAwesomeIcon icon="home" fixedWidth />
                                <p>Dashboard</p>
                            </div>
                        </Link>
                        {/* <div className="navbar-item">
                            <FontAwesomeIcon icon="file" fixedWidth />
                            <p>Resources</p>
                        </div> */}
                        <Link to={ROUTES.ACCOUNT}>
                            <div className="navbar-item">
                                <FontAwesomeIcon icon="cog" fixedWidth />
                                <p>Settings</p>
                            </div>
                        </Link>
                        <SignOut>
                            <div className="navbar-item">
                                <FontAwesomeIcon icon="power-off" fixedWidth />
                                <p>Log Out</p>
                            </div>
                        </SignOut>
                    </ul>
                </div>
                <div className="bot">
                    <div className="line-h" />
                </div>
            </div>
        )
    }
}

export default Navbar;
