import React, { useState } from "react";
import { withRouter } from 'react-router-dom';

import { Form, Message } from 'semantic-ui-react';
import { withFirebase } from "../../../Firebase"

function PasswordChangeBase(props) {
    const [formValues, setFormValues] = useState({
        password: '',
        password1: '',
        password2: '',
        error: null,
    });

    const [error, setError] = useState(null);

    const onSubmit = (e) => {
        const { password1 } = formValues;

        props.firebase
            .doPasswordUpdate(password1)
            .then(() => {
                setFormValues({
                    password: '',
                    password1: '',
                    password2: '',
                    error: null,
                })

                document.querySelector('.submitted').style.visibility = 'visible';
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

    const isInvalid = formValues.password === '' || formValues.password2 === '' || formValues.password1 === '' || formValues.password1 !== formValues.password2;

    return (
        <div className="change-form">
            {/* <hr/> */}
            <p className="title">Change Password</p>

            <Form autoComplete="new-password" error={error ? true : false} onSubmit={onSubmit}>
                <Form.Input
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={onChange}
                    autoComplete="new-password"
                    required
                    fluid
                    placeholder="Old Password"
                />
                <Form.Input
                    type="password"
                    name="password1"
                    value={formValues.password1}
                    onChange={onChange}
                    autoComplete="new-password"
                    required
                    fluid
                    placeholder="New Password"
                />
                <Form.Input
                    type="password"
                    name="password2"
                    value={formValues.password2}
                    onChange={onChange}
                    autoComplete="new-password"
                    required
                    fluid
                    placeholder="Confirm Password"
                />
                <div className="form-row">
                    <div className="update-button">
                        <Form.Button type="submit" color="brown" disabled={isInvalid}>Update Password</Form.Button>
                    </div>

                    <div className="submitted">
                        <p>Your password has been updated</p>
                    </div>

                </div>
                <Message
                    error
                    content={error ? error.message : ''}
                    color="yellow"
                />
            </Form>
        </div>
    )
}

const PasswordChange = withRouter(withFirebase(PasswordChangeBase));

export default PasswordChange;