import React, { Component } from 'react';
import './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faHome, faCopy, faTrashAlt, faDownload, faSlidersH, faQuestionCircle,
	faCog, faPowerOff, faSave, faSearch, faPlusCircle, faMinusCircle, faSpinner, faTimes, faAngleDown, faAngleUp, faBars, faFile
} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux'
import * as ROUTES from './constants/routes';
import { setAuthUser, setUserProfile } from "./actions/itemActions";
import { withFirebase } from "./Firebase";
import { withApiClient } from "./ApiClient";

library.add(faHome, faCopy, faTrashAlt, faDownload, faSlidersH, faQuestionCircle,
	faCog, faPowerOff, faSave, faSearch, faPlusCircle, faMinusCircle, faSpinner, faTimes
	, faAngleDown, faAngleUp, faBars, faFile);

const Planner = Loadable({
	loader: () => import('./pages/planner/Planner'),
	loading: () => null,
	delay: 5000,
})

const PlanGrid = Loadable({
	loader: () => import('./pages/PlanGrid/PlanGrid'),
	loading: () => null,
	delay: 5000,
})
const Landing = Loadable({
	loader: () => import('./pages/Landing/Landing'),
	loading: () => null,
	delay: 5000,
})
const SignIn = Loadable({
	loader: () => import('./pages/SignIn/SignIn'),
	loading: () => null,
	delay: 5000,
})
const PasswordForget = Loadable({
	loader: () => import('./pages/PasswordForget/PasswordForget'),
	loading: () => null,
	delay: 5000,
})
const Account = Loadable({
	loader: () => import('./pages/Account/Account'),
	loading: () => null,
	delay: 5000,
})
const SignUp = Loadable({
	loader: () => import('./pages/SignUp/SignUp'),
	loading: () => null,
	delay: 5000,
})


class App extends Component {
	componentDidMount() {
		this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
			authUser ? this.props.setAuthUser(authUser) : this.props.setAuthUser(null);
			if (authUser)
				this.props.apiClient.getUserProfile(authUser.uid).then(data => {
					if (data === 'error') 
						this.setState({
							...this.state,
							error: true,
						})
					else {
						this.props.setUserProfile(data)
					}
				})
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
	setAuthUser,
	setUserProfile,
}

export default withApiClient(withFirebase(connect(mapStateToProps, actionCreators)(App)));

