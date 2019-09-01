import React, { useState } from "react";
import { Link, withRouter } from 'react-router-dom';

import * as ROUTES from '../../../constants/routes';
import { Form, FormGroup, Input, Button, } from 'reactstrap';
import { withFirebase } from "../../../Firebase"
import { connect } from "react-redux";
import { setAuthUser } from "../../../actions/itemActions";

function NameChangeBase(props) {
    const [formValues, setFormValues] = useState({
        name: props.name,
        error: null,
    });

    const onSubmit = (e) => {
        const { name } = formValues;

        props.firebase
            .doNameUpdate(name)
            .then(() => {
                props.setAuthUser(props.firebase.getUser());
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

    const isInvalid = formValues.name === '';

    return (
        <div className="change-form">
            {/* <hr/> */}
            <p className="title">Change Name</p>

            <Form autoComplete="new-password" onSubmit={onSubmit}>
                <FormGroup>
                    <Input type="text" name="name" value={formValues.name} onChange={onChange} autoComplete="new-password" />
                </FormGroup>

                <div className="form-row">
                    <div className="update-button">
                        <Button type="submit" block disabled={isInvalid}>Update Name</Button>
                    </div>

                    <div className="submitted">
                        <p>Your name has been updated</p>
                    </div>
                </div>

                {formValues.error &&
                    <p>{formValues.error.message}</p>
                }
            </Form>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state.auth.authUser)
    return {
        name: state.auth.authUser ? state.auth.authUser.displayName : '',
    }
}

const NameChange = connect(mapStateToProps, { setAuthUser })(withRouter(withFirebase(NameChangeBase)));

export default NameChange;