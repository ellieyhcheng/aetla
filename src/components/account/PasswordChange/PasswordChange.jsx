import React, { useState } from "react";
import { withRouter } from 'react-router-dom';

import { Form, FormGroup, Input, Button, } from 'reactstrap';
import { withFirebase } from "../../../Firebase"

function PasswordChangeBase(props) {
    const [formValues, setFormValues] = useState({
        password: '',
        password1: '',
        password2: '',
        error: null,
    });

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

    const isInvalid = formValues.password === '' || formValues.password2 === '' || formValues.password1 === '' || formValues.password1 !== formValues.password2;

    return (
        <div className="change-form">
            {/* <hr/> */}
                <p className="title">Change Password</p>

                <Form autoComplete="new-password" onSubmit={onSubmit}>
                    <FormGroup>
                        <Input type="password" name="password" value={formValues.password} onChange={onChange} placeholder="Old Password" autoComplete="new-password" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password1" value={formValues.password1} onChange={onChange} placeholder="New Password" autoComplete="new-password" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password2" value={formValues.password2} onChange={onChange} placeholder="Confirm New Password" autoComplete="new-password" />
                    </FormGroup>

                    <div className="form-row">
                        <div className="update-button">
                            <Button type="submit" block disabled={isInvalid}>Update Password</Button>
                        </div>

                        <div className="submitted">
                            <p>Your password has been updated</p>
                        </div>
                    </div>


                    {formValues.error &&
                        <p>{formValues.error.message}</p>
                    }

                    
                </Form>
        </div>
    )
}

const PasswordChange = withRouter(withFirebase(PasswordChangeBase));

export default PasswordChange;