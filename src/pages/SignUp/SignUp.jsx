import React, { useState, useEffect } from "react";
import { Link, withRouter } from 'react-router-dom';

import logo from '../../logo-dark.svg';
import * as ROUTES from '../../constants/routes';
import './SignUp.scss';
import { Form, FormGroup, Input, Button, FormFeedback, FormText } from 'reactstrap';
import { withFirebase } from "../../Firebase";
import { withApiClient } from "../../ApiClient";

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

            <div className="content">
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
        error: null,
    });

    const onSubmit = (e) => {
        const { name, school, email, password } = formValues;

        props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                props.apiClient.createUser({
                    school,
                    plans: [],
                    uid: authUser.user.uid,
                }).then(res => {
                    if (res === 'error') {
                        setFormValues({
                            ...formValues,
                            error: { message: 'School is a required field' }
                        })
                    }
                    else {
                        props.firebase.doNameUpdate(name)
                            .then(() => {
                                setFormValues({
                                    name: '',
                                    school: '',
                                    email: '',
                                    password: '',
                                    password2: '',
                                    error: null,
                                })
                                props.history.push(ROUTES.DASHBOARD);

                            })
                    }
                })

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

    const isInvalid = formValues.password === '' || formValues.email === '' || formValues.password !== formValues.password2 || formValues.school === '';

    return (
        <Form autoComplete="new-password" onSubmit={onSubmit}>
            <FormGroup>
                <Input type="text" name="name" value={formValues.name} onChange={onChange} placeholder="Name" autoComplete="off" bsSize="lg" />
            </FormGroup>
            <FormGroup>
                <Input type="text" name="school" value={formValues.school} onChange={onChange} placeholder="School" autoComplete="off" bsSize="lg" />
            </FormGroup>
            <FormGroup>
                <Input type="email" name="email" value={formValues.email} onChange={onChange} placeholder="Email" autoComplete="off" bsSize="lg" />
            </FormGroup>
            <FormGroup>
                <Input type="password" name="password" value={formValues.password} onChange={onChange} placeholder="Password" autoComplete="off" bsSize="lg" />
                <FormFeedback>Password too weak</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Input invalid={formValues.password2 !== '' && formValues.password !== formValues.password2} type="password" name="password2" value={formValues.password2} onChange={onChange} placeholder="Confirm Password" autoComplete="off" bsSize="lg" />
                <FormFeedback>Passwords don't match</FormFeedback>
                <FormText>Your password needs to be at least 8 characters long,
                    including a number, an uppercase letter, and a lowercase letter.</FormText>
            </FormGroup>

            {formValues.error &&
                <p>{formValues.error.message}</p>
            }
            <div className="signup-button">
                <Button type="submit" block disabled={isInvalid}>Sign Up</Button>
            </div>
        </Form>
    )
}

const SignUpForm = withRouter(withApiClient(withFirebase(SignUpFormBase)));

export default SignUp;
export { SignUpForm };