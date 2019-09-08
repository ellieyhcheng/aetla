import React, { Component, Suspense, lazy } from 'react';
import './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faHome, faCopy, faTrashAlt, faDownload, faSlidersH, faQuestionCircle,
	faCog, faPowerOff, faSave, faSearch, faPlusCircle, faMinusCircle, faSpinner, faTimes, faAngleDown, faAngleUp, faBars, faFile
} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import * as ROUTES from './constants/routes';
import { setAuthUser, setUserProfile } from "./actions/itemActions";
import { withFirebase } from "./Firebase";
import { withApiClient } from "./ApiClient";

library.add(faHome, faCopy, faTrashAlt, faDownload, faSlidersH, faQuestionCircle,
	faCog, faPowerOff, faSave, faSearch, faPlusCircle, faMinusCircle, faSpinner, faTimes
	, faAngleDown, faAngleUp, faBars, faFile);

const Planner = lazy(() => import('./pages/planner/Planner'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Landing = lazy(() => import('./pages/Landing/Landing'));
const SignIn = lazy(() => import('./pages/SignIn/SignIn'));
const PasswordForget = lazy(() => import('./pages/PasswordForget/PasswordForget'));
const Account = lazy(() => import('./pages/Account/Account'));
const SignUp = lazy(() => import('./pages/SignUp/SignUp'));

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
				{/* Please give me a moment... I'm trying my best */}
				<Suspense fallback={<div></div>}> 
					<Switch>

						<Route exact path={ROUTES.LANDING} component={Landing} />
						<Route path={ROUTES.SIGN_IN} component={SignIn} />
						<Route path={ROUTES.SIGN_UP} component={SignUp} />
						{/* <Route path={ROUTES.GET_STARTED} component={Landing} /> */}
						<Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />

						{/* With Authorization Routes */}
						<Route path={ROUTES.DASHBOARD} component={Dashboard} />
						<Route path={ROUTES.PLANNER} component={Planner} />
						<Route path={ROUTES.ACCOUNT} component={Account} />
					</Switch>
				</Suspense>


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

