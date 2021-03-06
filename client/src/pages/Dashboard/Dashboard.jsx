import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import './Dashboard.scss';
import withAuthorization from "../../components/Session/withAuthorization";
import { connect } from "react-redux";
import PlanCard from "../../components/PlanCard/PlanCard";
import Modal from "../../components/modal/Modal";
import { withApiClient } from "../../ApiClient";
import { withRouter } from "react-router-dom";
import { Form, Message } from "semantic-ui-react";
import { majors } from "../../utils/utils";
import Button from '../../components/button/Button'
import { addPlan, deletePlan, setUserProfile } from "../../actions/itemActions";
import * as ROUTES from '../../utils/routes';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            create: false,
            copy: false,
            title: '',
            description: '',
            major: [],
            error: null,
            copyError: null,
            copyTitle: '',
            copyDescription: '',
            copyPlanId: '',
            delete: false,
            deleteId: '',
            deleteError: false,

            loadError: null,
        }
    }

    componentDidMount() {
        document.title = 'Dashboard - Aetla';

        if (this.props.verified)
            this.props.apiClient.getUserProfile().then(data => {
                if (data === 'error')
                    this.setState({
                        ...this.state,
                        loadError: true,
                    })
                else {
                    this.props.setUserProfile(data);
                    this.setState({
                        ...this.state,
                        loadError: false,
                    })
                }
            })
	}

    onClick = () => {
        if (!this.props.verified)
            return;
        this.setState({
            ...this.state,
            title: '',
            description: '',
            major: [],
            error: null,
            create: true,
        })
    }

    onClose = () => {
        this.setState({
            ...this.state,
            create: false,
        })
    }

    onCopyClick = (plan) => {
        this.setState({
            ...this.state,
            copyTitle: plan.title,
            copyDescription: plan.description,
            copyPlanId: plan.id,
            create: false,
            copyError: null,
            copy: true,
        })
    }

    onCopyClose = () => {
        this.setState({
            ...this.state,
            copy: false,
        })
    }

    onSubmit = (e) => {
        if (this.state.title === '' || this.state.major === []) {
            this.setState({
                ...this.state,
                error: {
                    message: "Please fill out all required fields"
                }
            })
        }
        else {
            this.setState({
                ...this.state,
                error: null,
            })
            const newPlan = {
                title: this.state.title,
                description: this.state.description,
                major: this.state.major,
                uid: this.props.userId,
            }
            this.props.apiClient.createPlan(newPlan)
                .then(data => {
                    if (data === 'error') {
                        this.setState({
                            ...this.state,
                            error: {
                                message: "Something went wrong, please try again."
                            }
                        })
                    }
                    else {
                        this.props.addPlan(data);
                        this.setState({
                            ...this.state,
                            create: false,
                            error: null,
                        })
                        this.props.history.push(ROUTES.PLANNER.replace(':id', `${btoa(unescape(encodeURIComponent(data["_id"])))}`))
                    }
                })
        }

        e.preventDefault();
    }

    onCopy = (e) => {
        if (this.state.copyTitle === '') {
            this.setState({
                ...this.state,
                copyError: {
                    message: "Please fill out all required fields"
                }
            })
        }
        else {
            const copy_details = {
                title: this.state.copyTitle,
                description: this.state.copyDescription,
                uid: this.props.userId,
            }
            this.props.apiClient.copyPlan(this.state.copyPlanId, copy_details)
                .then(data => {
                    if (data === 'error'){
                        this.setState({
                            ...this.state,
                            copyError: {
                                message: "Something went wrong, please try again."
                            }
                        })
                    }
                    else {
                        this.props.addPlan(data);
                        this.setState({
                            ...this.state,
                            copy: false,
                            copyError: null,
                        })
                    }
                })
        }

        e.preventDefault();
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    onDeleteClick = (planId) => {
        this.setState({
            ...this.state,
            deleteId: planId,
            delete: true,
            deleteError: null,
        })
    }

    onDelete = () => {
        this.props.apiClient.deletePlan(this.state.deleteId)
            .then(data => {
                if (data === 'error') {
                    this.setState({
                        ...this.state,
                        deleteError: {
                            message: 'Something went wrong, please try again.'
                        },
                    })
                }
                else {
                    this.props.deletePlan(this.state.deleteId);
                    this.setState({
                        ...this.state,
                        delete: false,
                        deleteError: null,
                    })
                }
            })
    }

    onDeleteClose = () => {
        this.setState({
            ...this.state,
            delete: false,
        })
    }

    onErrorClose = () => {
        this.setState({
            ...this.state,
            loadError: false,
        })
    }

    render() {
        return (
            <div className="dashboard">
                <Navbar />

                <div className="header">
                    <h2>Dashboard</h2>
                    <hr />
                </div>

                {this.props.verified ? (
                    <div className="grid">
                        {this.props.plans.map((plan, i) => {
                            if (i === 0)
                                return <PlanCard empty onClick={this.onClick} key={i} />;
                            else
                                return (
                                    <PlanCard {...plan} key={i} onCopyClick={this.onCopyClick} onDeleteClick={this.onDeleteClick}/>
                                )
                        })}
                    </div>
                ) : (
                    <div className="grid">
                        <h2>Please verify your email before you get started.</h2>
                    </div>
                )}
                

                {this.state.create &&
                    <Modal open={this.state.create} onClose={this.onClose} dimmerDismiss={false}>
                        <h2>Create New Plan</h2>
                        <hr />
                        <Form autoComplete="new-password" error={this.state.error ? true : false}>
                            <Form.Input
                                type="text"
                                name="title"
                                value={this.state.title}
                                onChange={this.onChange}
                                placeholder="My Plan"
                                autoComplete="off"
                                required
                                fluid
                                label="Plan Title"
                                maxLength="100"
                            />
                            <Form.Select
                                options={majors}
                                name="major"
                                value={this.state.major}
                                placeholder="Major"
                                onChange={(e, { value }) => this.setState(
                                    {
                                        ...this.state,
                                        major: value.length < 4 ? value : this.state.major,
                                    }
                                )}
                                required
                                label="Major"
                                fluid
                                multiple
                                search
                            />
                            <Form.TextArea
                                name="description"
                                value={this.state.description}
                                onChange={this.onChange}
                                placeholder="This is my awesome plan"
                                autoComplete="off"
                                label="Plan Description"
                                maxLength="500"
                            />
                            <Message
                                error
                                content={this.state.error ? this.state.error.message : ''}
                                color="yellow"
                            />

                        </Form>
                        <div className="modal-button">
                            <Button type="text" text="Cancel" onClick={this.onClose}></Button>
                            <Button type="text" text="Submit" onClick={this.onSubmit}></Button>
                        </div>
                    </Modal>
                }
                {this.state.copy &&
                    <Modal open={this.state.copy} onClose={this.onCopyClose} dimmerDismiss={false}>
                        <h2>Make a Copy</h2>
                        <hr />
                        <Form autoComplete="new-password" error={this.state.copyError ? true : false}>
                            <Form.Input
                                type="text"
                                name="copyTitle"
                                value={this.state.copyTitle}
                                onChange={this.onChange}
                                placeholder="My Plan"
                                autoComplete="off"
                                required
                                fluid
                                label="Plan Title"
                                maxLength="100"
                            />
                            <Form.TextArea
                                name="copyDescription"
                                value={this.state.copyDescription}
                                onChange={this.onChange}
                                placeholder="This is my awesome plan"
                                autoComplete="off"
                                label="Plan Description"
                                maxLength="500"
                            />
                            <Message
                                error
                                content={this.state.copyError ? this.state.copyError.message : ''}
                                color="yellow"
                            />

                        </Form>
                        <div className="modal-button">
                            <Button type="text" text="Cancel" onClick={this.onCopyClose}></Button>
                            <Button type="text" text="Submit" onClick={this.onCopy}></Button>
                        </div>
                    </Modal>
                }
                {this.state.delete &&
                    <Modal open={this.state.delete} onClose={this.onDeleteClose}>
                        <p>Are you sure you want to delete this plan?</p>
                        {this.state.deleteError && <Message color="yellow"/>}
                        <div className="modal-button">
                            <Button type="text" text="Cancel" onClick={this.onDeleteClose}></Button>
                            <Button type="text" text="Submit" onClick={this.onDelete}></Button>
                        </div>
                    </Modal>
                }

                {this.state.loadError &&
                    <Modal open={this.state.loadError} onClose={this.onErrorClose} >
                        <p>Something went wrong. If the problem persists, please contact us.</p>
                        <div className="modal-button">
                            <Button type="text" text="Okay, thanks." onClick={this.onErrorClose}></Button>
                        </div>
                    </Modal>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    if (state.auth.authUser)
        return {
            plans: state.auth.userProfile ? (state.auth.authUser.emailVerified ? [{}, ...state.auth.userProfile.plans] : []) : [],
            userId: state.auth.authUser.uid,
            verified: state.auth.authUser.emailVerified,
        }
    else
        return {
            plans: [],
            userId: '',
            verified: false,
        }
}

const actionCreators = {
    addPlan,
    deletePlan,
    setUserProfile,
}

export default withRouter(withApiClient(withAuthorization(connect(mapStateToProps, actionCreators)(Dashboard))));