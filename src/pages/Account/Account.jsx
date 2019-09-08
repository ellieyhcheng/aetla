import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordChange from "../../components/account/PasswordChange/PasswordChange";
import './Account.scss';
import EmailChange from "../../components/account/EmailChange/EmailChange";
import NameChange from "../../components/account/NameChange/NameChange";
import withAuthorization from "../../components/Session/withAuthorization";

function Account() {
    useEffect(() => {
        document.title = 'Settings - Aetla'
    }, []);
    return (
        <div className="account">
            <Navbar />


                <div className="header">
                    <h2>Account Settings</h2>
                    <hr />
                </div>
                <div className="grid">
                    <NameChange />
                    <EmailChange />
                    <PasswordChange />
                </div>
        </div>
    )
}

export default withAuthorization(Account);