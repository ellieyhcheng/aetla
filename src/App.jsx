import React, { Component } from 'react';
import './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faHome, faCopy, faTrashAlt, faDownload, faSlidersH, faQuestionCircle,
	faCog, faPowerOff, faSave, faSearch, faPlusCircle, faMinusCircle, faSpinner, faTimes, faAngleDown, faAngleUp, faBars, faFile
} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux'
import store from './store'
import * as ROUTES from './constants/routes';

import Planner from './pages/planner/Planner';
import PlanGrid from './pages/PlanGrid/PlanGrid';
import Landing from './pages/Landing/Landing';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Admin from './pages/Admin/Admin';
import PasswordForget from './pages/PasswordForget/PasswordForget';
import Account from './pages/Account/Account';
import Firebase, { FirebaseContext } from './Firebase';

library.add(faHome, faCopy, faTrashAlt, faDownload, faSlidersH, faQuestionCircle,
	faCog, faPowerOff, faSave, faSearch, faPlusCircle, faMinusCircle, faSpinner, faTimes
	, faAngleDown, faAngleUp, faBars, faFile);

class App extends Component {
	render() {
		return (
			// <FirebaseContext.Provider value={new Firebase()}>
				<Provider store={store}>
					<Router>
						{/* <div className="app-wrapper">
          </div> */}
						<Route exact path={ROUTES.LANDING} component={Landing} />
						<Route path={ROUTES.DASHBOARD} component={PlanGrid} />
						<Route path={ROUTES.PLANNER} component={Planner} />
						<Route path={ROUTES.SIGN_IN} component={SignIn} />
						<Route path={ROUTES.SIGN_UP} component={SignUp} />
						<Route path={ROUTES.GET_STARTED} component={Landing} />
						<Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
						<Route path={ROUTES.ACCOUNT} component={Account} />
						<Route path={ROUTES.ADMIN} component={Admin} />

					</Router>
				</Provider>
			//  </FirebaseContext.Provider>
		)
	}
}

export default App;

