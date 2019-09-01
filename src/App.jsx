import React, { Component } from 'react';
import './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faHome, faCopy, faTrashAlt, faDownload, faSlidersH, faQuestionCircle,
	faCog, faPowerOff, faSave, faSearch, faPlusCircle, faMinusCircle, faSpinner, faTimes, faAngleDown, faAngleUp, faBars, faFile
} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { connect } from 'react-redux'
import * as ROUTES from './constants/routes';
import asyncComponent from "./AsyncComponent";
import { setAuthUser } from "./actions/itemActions";
import { withFirebase } from "./Firebase";

// import Planner from './pages/planner/Planner';
// import PlanGrid from './pages/PlanGrid/PlanGrid';
// import Landing from './pages/Landing/Landing';
// import SignIn from './pages/SignIn/SignIn';
// import SignUp from './pages/SignUp/SignUp';
// import PasswordForget from './pages/PasswordForget/PasswordForget';
// import Account from './pages/Account/Account';

const Planner = asyncComponent(() =>
    import('./pages/planner/Planner').then(module => module.default)
)
const PlanGrid = asyncComponent(() =>
    import('./pages/PlanGrid/PlanGrid').then(module => module.default)
)
const Landing = asyncComponent(() =>
    import('./pages/Landing/Landing').then(module => module.default)
)
const SignIn = asyncComponent(() =>
    import('./pages/SignIn/SignIn').then(module => module.default)
)
const SignUp = asyncComponent(() =>
    import('./pages/SignUp/SignUp').then(module => module.default)
)
const PasswordForget = asyncComponent(() =>
    import('./pages/PasswordForget/PasswordForget').then(module => module.default)
)
const Account = asyncComponent(() =>
    import('./pages/Account/Account').then(module => module.default)
)

library.add(faHome, faCopy, faTrashAlt, faDownload, faSlidersH, faQuestionCircle,
	faCog, faPowerOff, faSave, faSearch, faPlusCircle, faMinusCircle, faSpinner, faTimes
	, faAngleDown, faAngleUp, faBars, faFile);

class App extends Component {
	componentDidMount() {
		this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
			authUser
				? this.props.setAuthUser(authUser)
				: this.props.setAuthUser(null);
		})
	}

	componentWillUnmount() {
		this.listener();
	}

	render() {
		return (
			<Router>
				<Route exact path={ROUTES.LANDING} component={Landing} />
				{/* <Route path={ROUTES.GEN_PLANNER} component={Planner} /> */}
				<Route path={ROUTES.SIGN_IN} component={SignIn} />
				<Route path={ROUTES.SIGN_UP} component={SignUp} />
				<Route path={ROUTES.GET_STARTED} component={Landing} />
				<Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />

				{/* With Authorization Routes */}
				<Route path={ROUTES.DASHBOARD} component={PlanGrid} />
				<Route path={ROUTES.PLANNER} component={Planner} />
				<Route path={ROUTES.ACCOUNT} component={Account} />

			</Router>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		authUser: state.auth.authUser,
	}
}

const actionCreators = {
	setAuthUser
}

export default withFirebase(connect(mapStateToProps, actionCreators)(App));

