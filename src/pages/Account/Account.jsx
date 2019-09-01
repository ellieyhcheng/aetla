import React from "react";
import { Link } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import PasswordChange from "../../components/account/PasswordChange/PasswordChange";
import './Account.scss';
import EmailChange from "../../components/account/EmailChange/EmailChange";
import NameChange from "../../components/account/NameChange/NameChange";
import withAuthorization from "../../components/Session/withAuthorization";

function Account() {
    return (
        <div className="account">
            <Navbar />

            <div className="content">

                <div className="header">
                    <h1>Account Settings</h1>
                    <hr />
                </div>
                <div className="grid">
                    <NameChange />
                    <EmailChange />
                    <PasswordChange />
                </div>
            </div>
        </div>
    )
}

export default withAuthorization(Account);