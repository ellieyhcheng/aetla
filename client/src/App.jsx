import React, { Component, Suspense, lazy } from 'react';
import './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faHome, faCopy, faTrashAlt, faDownload, faSlidersH, faQuestionCircle,
	faCog, faPowerOff, faSave, faSearch, faPlusCircle, faMinusCircle, faSpinner, faTimes, faAngleDown, faAngleUp, faBars, faFile, faPenSquare, faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import * as ROUTES from './utils/routes';
import { setAuthUser, setUserProfile } from "./actions/itemActions";
import { withFirebase } from "./Firebase";
import { withApiClient } from "./ApiClient";

library.add(faHome, faCopy, faTrashAlt, faDownload, faSlidersH, faQuestionCircle,
	faCog, faPowerOff, faSave, faSearch, faPlusCircle, faMinusCircle, faSpinner, faTimes
	, faAngleDown, faAngleUp, faBars, faFile, faPenSquare, faArrowLeft);

const Planner = lazy(() => import('./pages/Planner/Planner'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Landing = lazy(() => import('./pages/Landing/Landing'));
const SignIn = lazy(() => import('./pages/SignIn/SignIn'));
const PasswordForget = lazy(() => import('./pages/PasswordForget/PasswordForget'));
const Account = lazy(() => import('./pages/Account/Account'));
const SignUp = lazy(() => import('./pages/SignUp/SignUp'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const PlanSettings = lazy(() => import('./pages/PlanSettings/PlanSettings'));

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			auth: false,
		}
	}
	componentDidMount() {
		this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
			if (authUser) {
				authUser.getIdToken().then((idToken) => {
					this.props.apiClient.setToken(idToken);
					this.props.setAuthUser({
						uid: authUser.uid,
						displayName: authUser.displayName,
						email: authUser.email,
						emailVerified: authUser.emailVerified,
					}); // save only needed data
					this.setState({
						...this.state,
						loaded: true,
						auth: true,
					})
				});
			}
			else {
				this.props.apiClient.setToken(null);
				this.props.setAuthUser(null);
				this.props.setUserProfile(null);
				this.setState({
					...this.state,
					loaded: true,
					auth: false,
				})
			}
		})
	}

	componentWillUnmount() {
		this.listener();
	}

	render() {
		return (
			<Router>
				{this.state.loaded &&

					<Suspense fallback={<div>
					</div>}>
						<Switch>

							<Route exact path={ROUTES.LANDING} component={Landing} />
							<Route path={ROUTES.SIGN_IN} component={SignIn} />
							<Route path={ROUTES.SIGN_UP} component={SignUp} />
							<Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
							<Route path={ROUTES.CONTACT} component={Contact} />

							{/* With Authorization Routes */}
							<Route path={ROUTES.DASHBOARD} component={Dashboard} />
							<Route path={ROUTES.PLAN_SETTINGS} component={PlanSettings} />
							<Route path={ROUTES.PLANNER} component={Planner} />
							<Route path={ROUTES.ACCOUNT} component={Account} />
						</Switch>
					</Suspense>
				}


			</Router>
		)
	}
}

const mapStateToProps = (state) => {
	return {
	}
}

const actionCreators = {
	setAuthUser,
	setUserProfile,
}

export default withApiClient(withFirebase(connect(mapStateToProps, actionCreators)(App)));

