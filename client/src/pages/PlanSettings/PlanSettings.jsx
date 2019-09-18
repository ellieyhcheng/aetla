import React, { useEffect, useState } from "react";
import './PlanSettings.scss';
import withAuthorization from "../../components/Session/withAuthorization";
import * as ROUTES from '../../utils/routes';
import { Link } from "react-router-dom";
import { Message, Form, } from "semantic-ui-react";
import Button from '../../components/button/Button';
import SignOut from '../../components/account/SignOut/SignOut';
import { connect } from "react-redux";

function PlanSettings(props) {
    const [error, setError] = useState(null);

    const [formValues, setFormValues] = useState({
        title: props.planInfo.title,
        description: props.planInfo.description,
        courses: [],
    })

    useEffect(() => {
        document.title = 'Settings - Aetla'
    }, []);

    const onChange = (e) => {
        setFormValues({
            ...formValues,
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    const onSubmit = (e) => {
        // if (this.state.changeTitle === '') {
        //     this.setState({
        //         ...this.state,
        //         changeError: {
        //             message: "Please fill out all required fields"
        //         }
        //     })
        // }
        // else {
        //     // Make post request to update plan
        //     const newPlan = {
        //         title: this.state.changeTitle,
        //         description: this.state.changeDescription,
        //         courseList: this.props.courseList,
        //         coursePlan: this.props.coursePlan,
        //         selections: this.props.selections,
        //     }

        //     this.props.apiClient.savePlan(this.props.id, newPlan).then(data => {
        //         setTimeout(() => {
        //             if (data === 'error')
        //                 this.setState({
        //                     ...this.state,
        //                     changeError: true,
        //                     change: false,
        //                 })
        //             else {
        //                 this.setState({
        //                     ...this.state,
        //                     change: false,
        //                 })
        //                 this.props.storePlanDetails(newPlan);
        //                 this.props.updatePlan(data);
        //             }
        //         }, 500);
        //     })
        // }

        // e.preventDefault();
    }

    return (
        <div className="plan-settings">
            <div className="toolbar">
                <div className="top">
                    <div className="line-v" />
                    <ul>
                        <li>
                            <Link to={ROUTES.PLANNER.replace(':id', `${props.match.params.id}`)} >
                                <Button type="icon" icon="arrow-left" tooltip="Return to Plan" direction="right" />
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="bot">
                    <ul>
                        <li>
                            <Link to={ROUTES.ACCOUNT}>
                                <Button type="icon" icon="cog" tooltip="Account Settings" direction="right" />
                            </Link>
                        </li>
                        <li>
                            <SignOut>
                                <Button type="icon" icon="power-off" tooltip="Logout" direction="right" />
                            </SignOut>
                        </li>
                    </ul>
                    <div className="line-v" />
                </div>
            </div>

            <div className="header">
                <h2>Plan Settings</h2>
                <hr />
            </div>
            <div className="grid">
                <Form autoComplete="new-password" error={error ? true : false}>
                    <Form.Input
                        type="text"
                        name="title"
                        value={formValues.title}
                        onChange={onChange}
                        autoComplete="off"
                        required
                        fluid
                        label="Plan Title"
                        maxLength="100"
                    />
                    <Form.TextArea
                        name="description"
                        value={formValues.description}
                        onChange={onChange}
                        placeholder="Plan description"
                        autoComplete="off"
                        label="Plan Description"
                        maxLength="500"
                    />
                    <Form.Button
                        content="Save"
                        primary
                    />
                    <Message
                        error
                        content={error ? error : ''}
                        color="yellow"
                    />

                </Form>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    console.log(atob(unescape(encodeURIComponent(ownProps.match.params.id))))
    return {
        planInfo: state.auth.userProfile.plans.find(plan => plan["_id"] === atob(unescape(encodeURIComponent(ownProps.match.params.id)))),
    }
}

export default withAuthorization(connect(mapStateToProps, {})(PlanSettings));