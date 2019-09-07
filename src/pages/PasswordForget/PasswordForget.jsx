import React, { useState, useEffect } from "react";
import { Link, withRouter } from 'react-router-dom';

import './PasswordForget.scss'
import logo from '../../assets/aetla-dark.svg';
import * as ROUTES from '../../constants/routes';
import { Form, Button, Message, } from 'semantic-ui-react';
import { withFirebase } from "../../Firebase";

function PasswordForget() {
    useEffect(() => {
        document.title = 'Password Reset - Aetla'
    }, []);
    return (
        <div className="passwordforget">
            <div className="logo">
                <Link to={ROUTES.LANDING}>
                    <img src={logo} alt="LE plan" />

                </Link>
            </div>
            <hr />

            <div className="content">
                <div className="info">
                    <h1>Password Reset</h1>
                    <p>Enter the email address that you used to register. We will send you an
                        email to reset your password.
                    </p>
                </div>
                <PasswordForgetForm />
            </div>
        </div>
    )
}

function PasswordForgetFormBase(props) {
    const [formValues, setFormValues] = useState({
        email: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const onSubmit = (e) => {
        const { email } = formValues;

        props.firebase
            .doPasswordReset(email)
            .then(() => {
                setFormValues({
                    email: '',
                })

                setSuccess(true);
            })
            .catch(error => {
                setError(error);
            })

        e.preventDefault();
    }

    const onChange = (e) => {
        setFormValues({
            ...formValues,
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    const isInvalid = formValues.email === '';

    return (
        <Form autoComplete="new-password" error={error ? true : false} onSubmit={onSubmit} success={success}>

            <Form.Input
                type="email"
                name="email"
                value={formValues.email}
                onChange={onChange}
                placeholder="Email"
                autoComplete="off"
                required
                fluid
            />
            <div className="form-row">
                <div className="update-button">
                    <Form.Button type="submit" color="brown" disabled={isInvalid}>Update Email</Form.Button>
                </div>
            </div>
            <Message
                success
                content="An email will be sent shortly with instructions."
            />
            <Message
                error
                content={error ? error.message : ''}
                color="yellow"
            />
        </Form>
    )
}

const PasswordForgetForm = withRouter(withFirebase(PasswordForgetFormBase));

export default PasswordForget;