import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';

import { Form, Message } from 'semantic-ui-react';
import { withFirebase } from "../../../Firebase"
import { connect } from "react-redux";
import { setAuthUser } from "../../../actions/itemActions";

function NameChangeBase(props) {
    const [name, setName] = useState(props.name);

    const [error, setError] = useState(null);

    useEffect(() => {
        setName(props.name);
    }, [props.name])

    const onSubmit = (e) => {
        props.firebase
            .doNameUpdate(name)
            .then(() => {
                props.setAuthUser(props.firebase.getUser());
                document.querySelector('.submitted').style.visibility = 'visible';
            })
            .catch(error => {
                setError(error);
            })

        e.preventDefault();
    }

    const onChange = (e) => {
        setName(e.currentTarget.value);
    }

    const isInvalid = name === '' || name === props.name;

    return (
        <div className="change-form">
            {/* <hr/> */}
            <p className="title">Change Name</p>

            <Form autoComplete="new-password" error={error ? true : false} onSubmit={onSubmit}>
                <Form.Input
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                    autoComplete="new-password"
                    required
                    fluid
                />
                <div className="form-row">
                    <div className="update-button">
                        <Form.Button type="submit" color="brown" disabled={isInvalid}>Update Name</Form.Button>
                    </div>

                    <div className="submitted">
                        <p>Your name has been updated</p>
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

const mapStateToProps = (state) => {
    return {
        name: state.auth.authUser ? state.auth.authUser.displayName : '',
    }
}

const NameChange = withRouter(withFirebase(connect(mapStateToProps, { setAuthUser })(NameChangeBase)));

export default NameChange;