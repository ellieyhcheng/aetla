import React, { useState, useEffect } from "react";
import { Link, withRouter } from 'react-router-dom';

import logo from '../../assets/aetla-dark.svg';
import * as ROUTES from '../../constants/routes';
import './SignUp.scss';
import { Form, Button, Message } from 'semantic-ui-react';
import { withFirebase } from "../../Firebase";
import { withApiClient } from "../../ApiClient";
import { connect } from 'react-redux';
import { setUserProfile } from "../../actions/itemActions";

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
            .then(authUser => {
                props.apiClient.createUser({
                    school,
                    plans: [],
                    uid: authUser.user.uid,
                }).then(res => {
                    if (res === 'error') {
                        setError({ message: 'School is a required field' })
                    }
                    else {
                        props.setUserProfile(res);

                        props.firebase.doNameUpdate(name)
                            .then(() => {
                                setFormValues({
                                    name: '',
                                    school: '',
                                    email: '',
                                    password: '',
                                    password2: '',
                                })

                                props.history.push(ROUTES.DASHBOARD);
                            })
                    }
                })

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
                options={[
                    { key: 'UCLA', text: 'University of California - Los Angeles', value: 'ucla' },
                ]}
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
                    // pointing: "left",
                } : null}
                required
                label="Confirm Password"
            />


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