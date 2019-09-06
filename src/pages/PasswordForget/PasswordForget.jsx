import React, { useState, useEffect } from "react";
import { Link, withRouter } from 'react-router-dom';

import './PasswordForget.scss'
import logo from '../../assets/aetla-dark.svg';
import * as ROUTES from '../../constants/routes';
import { Form, FormGroup, Input, Button, } from 'semantic-ui-react';
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
                <PasswordForgetForm/>
            </div>
        </div>
    )
}

function PasswordForgetFormBase(props) {
    const [formValues, setFormValues] = useState({
        email: '',
        error: null,
    });

    const onSubmit = (e) => {
        const { email } = formValues;

        props.firebase
            .doPasswordReset(email)
            .then(() => {
                setFormValues({
                    email: '',
                    error: null,
                })

                document.querySelector('.submitted').style.visibility = 'visible';
            })
            .catch(error => {
                setFormValues({
                    ...formValues,
                    error,
                })
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
        <Form autoComplete="new-password" onSubmit={onSubmit}>
            <FormGroup>
                <Input type="email" name="email" value={formValues.email} onChange={onChange} placeholder="Email" autoComplete="off" bsSize="lg" />
            </FormGroup>

            <div className="form-row">
                <div className="send-button">
                    <Button type="submit" block disabled={isInvalid}>Send</Button>
                </div>
            </div>

            <div className="submitted">
                <p>An email will be sent shortly.</p>
            </div>

            {formValues.error &&
                <p>{formValues.error.message}</p>
            }
        </Form>
    )
}

const PasswordForgetForm = withRouter(withFirebase(PasswordForgetFormBase));

export default PasswordForget;