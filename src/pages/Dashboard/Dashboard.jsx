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
import { majors } from "../../utils";
import Button from '../../components/button/Button'
import { addPlan, deletePlan } from "../../actions/itemActions";
import * as ROUTES from '../../constants/routes';

const plans = [
    {
        title: 'My first plan',
        description: "this is a very cool description don't you know it",
        _id: '1234556887655',
    },
    {
        title: 'My first plan',
        description: "this is a very cool description don't you know it",
        _id: '1234556887655',
    },
    {
        title: 'My first plan',
        description: "this is a very cool description don't you know it",
        _id: '1234556887655',
    },
    {
        title: 'My first plan',
        description: "this is a very cool description don't you know it",
        _id: '1234556887655',
    },
    {
        title: 'My first plan',
        description: "this is a very cool description don't you know it",
        _id: '1234556887655',
    },
    {
        title: 'My first plan',
        description: "this is a very cool description don't you know it",
        _id: '1234556887655',
    },
    {
        title: 'My first plan',
        description: "this is a very cool description don't you know it",
        _id: '1234556887655',
    },
    {
        title: 'My first plan',
        description: "this is a very cool description don't you know it",
        _id: '1234556887655',
    },
    {
        title: 'My first plan',
        description: "this is a very cool description don't you know it",
        _id: '1234556887655',
    },
    {
        title: 'My first plan',
        description: "this is a very cool description don't you know it",
        _id: '1234556887655',
    },
    {
        title: 'My first plan',
        description: "this is a very cool description don't you know it",
        _id: '1234556887655',
    },
    {
        title: 'My first plan',
        description: "this is a very cool description don't you know it",
        _id: '1234556887655',
    },
    {
        title: 'My first plan',
        description: "this is a very cool description don't you know it",
        _id: '1234556887655',
    },
    {
        title: 'My first plan',
        description: "this is a very cool description don't you know it",
        _id: '1234556887655',
    },

]

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            create: false,
            copy: false,
            title: '',
            description: '',
            major: '',
            error: null,
            copyError: null,
            copyTitle: '',
            copyDescription: '',
            copyPlanId: '',
            delete: false,
            deleteId: '',
            deleteError: null,
        }
    }

    componentDidMount() {
        document.title = 'Dashboard - Aetla';
    }

    onClick = () => {
        this.setState({
            ...this.state,
            title: '',
            description: '',
            major: '',
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
        if (this.state.title === '' || this.state.major === '') {
            this.setState({
                ...this.state,
                error: {
                    message: "Please fill out all required fields"
                }
            })
        }
        else {
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

    render() {
        return (
            <div className="dashboard">
                <Navbar />

                <div className="header">
                    <h2>Dashboard</h2>
                    <hr />
                </div>
                <div className="grid">
                    <PlanCard empty onClick={this.onClick} />
                    {this.props.plans.map((plan, i) => (
                        <PlanCard {...plan} key={i} onCopyClick={this.onCopyClick} onDeleteClick={this.onDeleteClick}/>
                    ))}
                </div>

                {this.state.create &&
                    <Modal open={this.state.create} onClose={this.onClose}>
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
                                        major: value,
                                    }
                                )}
                                required
                                label="Major"
                                fluid
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
                    <Modal open={this.state.copy} onClose={this.onCopyClose}>
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
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        plans: state.auth.userProfile ? state.auth.userProfile.plans : [],
        userId: state.auth.authUser ? state.auth.authUser.uid : '',
    }
}

const actionCreators = {
    addPlan,
    deletePlan,
}

export default withRouter(withApiClient(withAuthorization(connect(mapStateToProps, actionCreators)(Dashboard))));