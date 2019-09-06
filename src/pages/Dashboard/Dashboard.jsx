import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import './Dashboard.scss';
import withAuthorization from "../../components/Session/withAuthorization";
import { connect } from "react-redux";
import PlanCard from "../../components/PlanCard/PlanCard";
import Modal from "../../components/modal/Modal";
import { withApiClient } from "../../ApiClient";
import { withRouter } from "react-router-dom";

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
    const [create, setCreate] = useState(false);

    useEffect(() => {
        document.title = 'Dashboard - Aetla'
    }, []);

    const onClick = () => {
        setCreate(true);
    }

    const onClose = () => {
        setCreate(false);
    }

    // props.apiClient.createPlan(props.userId)
    //         .then(data => {
    //             if (data === 'error')
    //                 return;
    //             else {
    //                 props.setUserProfile(data);
    //             }
    //         })

    return (
        <div className="dashboard">
            <Navbar />

            <div className="header">
                <h2>Dashboard</h2>
                <hr />
            </div>
            <div className="grid">
                <PlanCard empty onClick={onClick}/>

                {props.plans.map((plan, i) => (
                    <PlanCard {...plan} key={i} />
                ))}
            </div>

            <Modal open={create} onClose={onClose}>
                {/* <CreatePlanForm/> */}
            </Modal>
        </div>
    )
}

// function CreatePlanFormBase(props) {
//     const [formValues, setFormValues] = useState({
//         title: '',
//         description: '',
//         major: '',
//         error: null,
//     });

//     const onSubmit = (e) => {
//         const { title, description, major } = formValues;

//         e.preventDefault();
//     }

//     const onChange = (e) => {
//         setFormValues({
//             ...formValues,
//             [e.currentTarget.name]: e.currentTarget.value,
//         })
//     }

//     const isInvalid = formValues.title === ''

//     return (
//         <Form autoComplete="new-password" onSubmit={onSubmit}>
            
//         </Form>
//     )
// }


// const CreatePlanForm = withRouter(withApiClient(CreatePlanFormBase));

const mapStateToProps = state => {
    return {
        plans: state.auth.userProfile ? state.auth.userProfile.plans : [],

    }
}

const actionCreators = {

}

export default withAuthorization(connect(mapStateToProps, actionCreators)(Dashboard));