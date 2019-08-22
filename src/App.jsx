import React, { Component } from 'react';
import './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
<<<<<<< HEAD
	faHome, faCopy, faTrashAlt, faDownload, faSlidersH, faQuestionCircle,
	faCog, faPowerOff, faSave, faSearch, faPlusCircle, faMinusCircle, faSpinner, faTimes, faAngleDown, faAngleUp
=======
    faHome, faCopy, faTrashAlt, faDownload, faSlidersH, faQuestionCircle,
    faCog, faPowerOff, faSave, faSearch, faPlusCircle, faMinusCircle, faSpinner, faTimes, faAngleDown, faAngleUp
>>>>>>> master
} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux'
import store from './store'

import Planner from './pages/planner/Planner';
import PlanGrid from './pages/PlanGrid/PlanGrid';

library.add(faHome, faCopy, faTrashAlt, faDownload, faSlidersH, faQuestionCircle,
<<<<<<< HEAD
	faCog, faPowerOff, faSave, faSearch, faPlusCircle, faMinusCircle, faSpinner, faTimes
	, faAngleDown, faAngleUp);

class App extends Component {

	render() {
		return (
			<Provider store={store}>
				<Router>
					{/* <div className="app-wrapper">
          </div> */}

					<Route exact path="/" component={PlanGrid} />
					<Route path="/planner/:id" component={Planner} />

				</Router>
			</Provider>
		)
	}
=======
    faCog, faPowerOff, faSave, faSearch, faPlusCircle, faMinusCircle, faSpinner, faTimes
    , faAngleDown, faAngleUp);

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="app-wrapper">
                        <Planner />

                    </div>

                </Router>
            </Provider>
        )
    }
>>>>>>> master
}

export default App;

