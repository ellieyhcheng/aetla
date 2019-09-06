import React, { useState } from "react";
import { withRouter } from 'react-router-dom';

import { Form, Message, Button, } from 'semantic-ui-react';
import { withFirebase } from "../../../Firebase"

function EmailChangeBase(props) {
    const [formValues, setFormValues] = useState({
        email: '',
    });

    const [error, setError] = useState(null);

    const onSubmit = (e) => {
        const { email } = formValues;

        props.firebase
            .doEmailUpdate(email)
            .then(() => {
                setFormValues({
                    email: '',
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

    const isInvalid = formValues.email === '';

    return (
        <div className="change-form">
            {/* <hr/> */}
            <p className="title">Change Email</p>

            <Form autoComplete="new-password" error={error ? true : false} onSubmit={onSubmit}>

                <Form.Input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={onChange}
                    placeholder="Email"
                    autoComplete="new-password"
                    required
                    fluid
                />
                <div className="form-row">
                    <div className="update-button">
                        <Form.Button type="submit" color="brown" disabled={isInvalid}>Update Email</Form.Button>
                    </div>

                    <div className="submitted">
                        <p>Your email has been updated</p>
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

const EmailChange = withRouter(withFirebase(EmailChangeBase));

export default EmailChange;