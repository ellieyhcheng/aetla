import React, { useState, useEffect } from "react";
import { Link, withRouter } from 'react-router-dom';

import logo from '../../assets/aetla-dark.svg';
import * as ROUTES from '../../utils/routes';
import './SignIn.scss';
import { Form, Button, Message } from 'semantic-ui-react';
import { withFirebase } from "../../Firebase";

function SignIn() {
    useEffect(() => {
        document.title = 'Sign In - Aetla'
    }, []);
    return (
        <div className="signin">
            <div className="logo">
                <Link to={ROUTES.LANDING}>
                    <img src={logo} alt="LE plan" />

                </Link>
            </div>
            <hr />

            <div className="body">
                <SignInForm />

                <Link className="password-forget" to={ROUTES.PASSWORD_FORGET}>Forgot your password?</Link>
                <hr />
                <div className="signup">
                    <p>Don't have an account?</p>
                    <Link className="signup-button" to={ROUTES.SIGN_UP}>
                        <Button basic color="orange" fluid>
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

function SignInFormBase(props) {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const [error, setError] = useState(null);

    const onSubmit = (e) => {
        const { email, password, remember } = formValues;

        props.firebase.rememberMe(remember)
            .then(() => {
                props.firebase
                .doSignInWithEmailAndPassword(email, password)
                .then(() => {
                    setFormValues({
                        email: '',
                        password: '',
                        remember: false,
                    })
    
                    props.history.push(ROUTES.DASHBOARD);
                })
                .catch(error => {
                    setError(error);
                })
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

    const toggleRemember = (e) => {
        setFormValues({
            ...formValues, 
            remember: !formValues.remember
        })
    }

    const isInvalid = formValues.password === '' || formValues.email === '';

    return (
        <Form autoComplete="new-password" error={error ? true : false}>
            <Message
                error
                header='Create Account Error'
                content={error ? error.message : ''}
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
            <div className="form-row">
                <Form.Checkbox label="Remember Me" name="remember" checked={formValues.remember} onChange={toggleRemember}/>
                <div className="signin-button">
                    <Button disabled={isInvalid} fluid primary onClick={onSubmit}>Log In</Button>

                </div>
            </div>
        </Form>
    )
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignIn;