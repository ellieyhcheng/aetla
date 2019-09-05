import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import './Dashboard.scss';
import withAuthorization from "../../components/Session/withAuthorization";
import { connect } from "react-redux";
import PlanCard from "../../components/PlanCard/PlanCard";

function Dashboard(props) {
    useEffect(() => {
        document.title = 'Dashboard - Aetla'
    }, []);
    return (
        <div className="dashboard">
            <Navbar />

            <div className="header">
                <h1>Dashboard</h1>
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