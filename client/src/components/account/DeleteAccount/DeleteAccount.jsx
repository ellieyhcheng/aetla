import React, { useState } from "react";
import { withRouter } from 'react-router-dom';

import { Button as SButton, Message, Form } from 'semantic-ui-react';
import { withFirebase } from "../../../Firebase";
import { withApiClient } from "../../../ApiClient";

import Modal from '../../modal/Modal';
import Button from '../../button/Button';

function DeleteAccount(props) {
    const [confirm, setConfirm] = useState(false);

    const [formValues, setFormValues] = useState({
        password: '',
        email: '',
    });

    const [error, setError] = useState(null);

    const onSubmit = (e) => {
        var { email, password } = formValues;

        var isInvalid = password === '' || email === '';
        if (isInvalid) {
            setError({
                message: 'Please enter your account credentials',
            })
        }
        else {
            props.firebase
                .reauthenticateWithEmailAndPassWord(email, password)
                    .then(() => {
                        props.firebase.doDeleteUser()
                            .then(() => {
                                props.apiClient.deleteUser()
                                    .then(data => {
                                        if (data === 'error')
                                            setError({
                                                message: "Deleting user profile failed"
                                            })
                                        else {
                                        }
                                    })
                            })
                            .catch(error => {
                                setError(error);
                            })
                    })
                    .catch(error => {
                        setError(error);
                    })
                
        }
        e.preventDefault();
        
    }

    const onChange = (e) => {
        setFormValues({
            ...formValues,
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    return (
        <div className="change-form">
            <p className="title">Delete Account</p>

            <div className="form-row">
                <div className="update-button">
                    <SButton color="brown" onClick={() => setConfirm(true)}>Yes, I want to delete.</SButton>
                </div>
            </div>

            {confirm &&
                <Modal open={confirm} onClose={() => setConfirm(false)}>
                    <p style={{
                        marginBottom: '2vh',
                    }}>Please enter your email and password to confirm deletion.</p>
                    <Form autoComplete="new-password" error={error ? true : false}>
                        <Form.Input
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={onChange}
                            placeholder="Email"
                            autoComplete="new-password"
                            required
                            fluid
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
                            fluid
                            label="Password"
                        />

                        <Message
                            error
                            content={error ? error.message : ''}
                            color="yellow"
                        />
                    </Form>
                    <div className="modal-button">
                        <Button type="text" text="Cancel" onClick={() => setConfirm(false)}></Button>
                        <Button type="text" text="Submit" onClick={onSubmit} ></Button>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default withApiClient(withRouter(withFirebase(DeleteAccount)));