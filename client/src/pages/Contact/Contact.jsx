import React, { useEffect } from "react";
import './Contact.scss';
import logo from '../../assets/aetla-dark.svg';
import * as ROUTES from '../../utils/routes';
import { Link } from 'react-router-dom';

function Contact() {
    useEffect(() => {
        document.title = 'Contact Us - Aetla'
    }, []);
    return (
        <div className="contact">
            <div className="logo">
                <Link to={ROUTES.LANDING}>
                    <img src={logo} alt="LE plan" />

                </Link>
            </div>
            <hr />

            <div className="contact-form">                    
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfaf_CA_eie67IRCKHtM3B6oaxfZjf9SiTtJ-R8vo3NZAxUHw/viewform?embedded=true" 
                    width="640" height="996" frameBorder="0" marginHeight="0" marginWidth="0" title="Contact-Form">Loading…</iframe>
            </div>
        </div>
    )
}

export default Contact;