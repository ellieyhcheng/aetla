import React, { useState, useEffect } from "react";
import { Link, withRouter } from 'react-router-dom';

import logo from '../../assets/aetla-dark.svg';
import * as ROUTES from '../../utils/routes';
import './SignUp.scss';
import { Form, Button, Message, Header } from 'semantic-ui-react';
import { withFirebase } from "../../Firebase";
import { withApiClient } from "../../ApiClient";
import { connect } from 'react-redux';
import { setUserProfile, setAuthUser } from "../../actions/itemActions";
import { schools } from "../../utils/utils";

function SignUp() {
    useEffect(() => {
        document.title = 'Sign Up - Aetla'
    }, []);
    return (
        <div className="signup">
            <div className="logo">
                <Link to={ROUTES.LANDING}>
                    <img src={logo} alt="LE plan" />
                </Link>
            </div>
            <hr />

            <div className="body">
                <p className="email">Sign up with your email</p>
                <SignUpForm />
                <p>Already have an account? <Link className="login" to={ROUTES.SIGN_IN}>Log In</Link></p>
            </div>
        </div>
    )
}

function SignUpFormBase(props) {
    const [formValues, setFormValues] = useState({
        name: '',
        school: '',
        email: '',
        password: '',
        password2: '',
    });

    const [error, setError] = useState(null);

    const onSubmit = (e) => {
        const { name, school, email, password } = formValues;

        props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(credential => {
                credential.user.getIdToken().then((idToken) => {
                    props.apiClient.setToken(idToken);

                    props.firebase.doNameUpdate(name)
                        .then(() => {
                            setFormValues({
                                name: '',
                                school: '',
                                email: '',
                                password: '',
                                password2: '',
                            })
                            setAuthUser({
                                uid: credential.user.uid,
                                displayName: credential.user.displayName,
                                email: credential.user.email,
                                emailVerified: credential.user.emailVerified,
                            })
                        })

                    props.firebase.doSendEmailVerification();

                    props.apiClient.createUser({
                        school,
                        plans: [],
                        uid: credential.user.uid,
                    }).then(res => {
                        if (res === 'error') {
                            setError({ message: 'Something went really wrong. Please contact the Aetla Team.' })
                        }
                        else {
                            props.history.push(ROUTES.DASHBOARD);
                        }
                    })
                });


            })
            .catch(error => {
                setError(error)
            })

        e.preventDefault();
    }

    const onChange = (e) => {
        setFormValues({
            ...formValues,
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    const isInvalid = formValues.password === '' || formValues.email === '' || formValues.password !== formValues.password2 || formValues.school === '';

    return (
        <Form autoComplete="new-password" error={error ? true : false}>
            <Message
                error
                header='Create Account Error'
                content={error ? error.message : ''}
            />
            <Form.Input
                type="text"
                name="name"
                value={formValues.name}
                onChange={onChange}
                placeholder="Name"
                autoComplete="off"
                label="Your Name"
            />
            <Form.Select
                options={schools}
                name="school"
                placeholder="School"
                onChange={(e, { value }) => setFormValues(
                    {
                        ...formValues,
                        school: value,
                    }
                )}
                required
                label="School"
            />
            <Form.Input
                type="email"
                name="email"
                value={formValues.email}
                onChange={onChange}
                placeholder="Email"
                autoComplete="off"
                required
                label="Email"
            />
            <Form.Input
                type="password"
                name="password"
                value={formValues.password}
                onChange={onChange}
                placeholder="Password"
                autoComplete="new-password"
                required
                label="Password"
            />
            <Form.Input
                type="password"
                name="password2"
                value={formValues.password2}
                onChange={onChange}
                placeholder="Confirm Password"
                autoComplete="new-password"
                error={formValues.password2 !== '' && formValues.password !== formValues.password2 ? {
                    content: "Passwords must match",
                } : null}
                required
                label="Confirm Password"
            />

            <Header as="h5" content="Disclaimer" textAlign="center" />
            <p style={{
                textAlign: "center",
            }}>
                Aetla is meant as a tool to assist in course planning. It is not meant to replace actual counseling. Please refer
                to the official catalogs and university resources to get the most accurate information. By clicking "Sign Up", you
                are acknowledging this disclaimer.
            </p>

            <div className="signup-button">
                <Button disabled={isInvalid} fluid primary onClick={onSubmit}>Sign Up</Button>
            </div>


        </Form>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const SignUpForm = withRouter(withApiClient(withFirebase(connect(mapStateToProps, { setUserProfile })(SignUpFormBase))));

export default SignUp;
export { SignUpForm };