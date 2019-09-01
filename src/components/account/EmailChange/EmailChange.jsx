import React, { useState } from "react";
import { Link, withRouter } from 'react-router-dom';

import * as ROUTES from '../../../constants/routes';
// import './EmailChange.scss';
import { Form, FormGroup, Input, Button, } from 'reactstrap';
import { withFirebase } from "../../../Firebase"

function EmailChangeBase(props) {
    const [formValues, setFormValues] = useState({
        email: '',
        error: null,
    });

    const onSubmit = (e) => {
        const { email } = formValues;

        props.firebase
            .doEmailUpdate(email)
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
        <div className="change-form">
            {/* <hr/> */}
                <p className="title">Change Email</p>

                <Form autoComplete="new-password" onSubmit={onSubmit}>
                    <FormGroup>
                        <Input type="email" name="email" value={formValues.email} onChange={onChange} placeholder="New Email" autoComplete="new-password" />
                    </FormGroup>

                    <div className="form-row">
                        <div className="update-button">
                            <Button type="submit" block disabled={isInvalid}>Update Email</Button>
                        </div>

                        <div className="submitted">
                            <p>Your email has been updated</p>
                        </div>
                    </div>

                    {formValues.error &&
                        <p>{formValues.error.message}</p>
                    }
                </Form>
        </div>
    )
}

const EmailChange = withRouter(withFirebase(EmailChangeBase));

export default EmailChange;