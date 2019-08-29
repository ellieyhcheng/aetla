import React, { useState } from "react";
import { Link, withRouter } from 'react-router-dom';

import logo from '../../logo-dark.svg';
import * as ROUTES from '../../constants/routes';
import './SignIn.scss';
import { Form, FormGroup,Input, Button, } from 'reactstrap';
import { withFirebase } from "../../Firebase";

function SignIn() {
    return (
        <div className="signin">
            <div className="logo">
                <Link to={ROUTES.LANDING}>
                    <img src={logo} alt="LE plan"/>

                </Link>
            </div>
            <hr />

            <div className="content">
                <SignInForm />

                <Link className="password-forget" to={ROUTES.PASSWORD_FORGET}>Forgot your password?</Link>
                <hr />
                <div className="signup">
                    <p>Don't have an account?</p>
                    <Link className="signup-button" to={ROUTES.SIGN_UP}>
                        <Button block outline>
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
        // remember: false,
        error: null,
    });

    const onSubmit = (e) => {
        const { email, password } = formValues;

        props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                setFormValues({
                    email: '',
                    password: '',
                    // remember: false,
                    error: null,
                })

                props.history.push(ROUTES.DASHBOARD);
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

    const isInvalid = formValues.password === '' || formValues.email === '';

    return (
        <Form autoComplete="new-password" onSubmit={onSubmit}>
            <FormGroup>
                <Input type="email" name="email" value={formValues.email} onChange={onChange} placeholder="Email" autoComplete="off" bsSize="lg" />
            </FormGroup>
            <FormGroup>
                <Input type="password" name="password" value={formValues.password} onChange={onChange} placeholder="Password" autoComplete="off" bsSize="lg" />
            </FormGroup>

            <div className="form-row">
                {/* <div className="remember">
                    <Input type="checkbox" />
                    <span className="label">Remember Me</span>
                </div> */}
                <div className="signin-button">
                    <Button type="submit" block disabled={isInvalid}>Log In</Button>
                </div>
            </div>
            

            {formValues.error &&
                <p>{formValues.error.message}</p>
            }
        </Form>
    )
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignIn;