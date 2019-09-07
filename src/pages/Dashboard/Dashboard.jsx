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
import { addPlan } from "../../actions/itemActions";
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
    constructor(props){
        super(props)
        this.state = {
            create: false,
            title: '',
            description: '',
            major: '',
            error: null,
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
            console.log(newPlan)
            this.props.apiClient.createPlan(newPlan)
                .then(data => {
                    if (data === 'error')
                        return;
                    else {
                        this.props.addPlan(data);
                        this.setState({
                            ...this.state,
                            create: false,
                        })
                        this.props.history.push(ROUTES.PLANNER.replace(':id', `${btoa(unescape(encodeURIComponent(data["_id"])))}`))
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
                        <PlanCard {...plan} key={i} />
                    ))}
                </div>
    
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
    addPlan
}

export default withRouter(withApiClient(withAuthorization(connect(mapStateToProps, actionCreators)(Dashboard))));