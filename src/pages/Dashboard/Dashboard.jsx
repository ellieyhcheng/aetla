import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import './Dashboard.scss';
import withAuthorization from "../../components/Session/withAuthorization";
import { connect } from "react-redux";
import PlanCard from "../../components/PlanCard/PlanCard";

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

function Dashboard(props) {
    useEffect(() => {
        document.title = 'Dashboard - Aetla'
    }, []);
    return (
        <div className="dashboard">
            <Navbar />

            <div className="header">
                <h2>Dashboard</h2>
                <hr />
            </div>
            <div className="grid">
                <PlanCard empty/>

                {props.plans.map((plan, i) => (
                    <PlanCard {...plan} key={i} />
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        plans: state.auth.userProfile ? state.auth.userProfile.plans : [],

    }
}

const actionCreators = {

}

export default withAuthorization(connect(mapStateToProps, actionCreators)(Dashboard));