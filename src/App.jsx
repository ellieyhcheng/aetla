import React, { Component } from 'react';
import './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome, faCopy, faTrashAlt, faDownload, faSlidersH, faQuestionCircle,
  faCog, faPowerOff, faSave, faSearch, faPlusCircle, faMinusCircle, faSpinner, faTimes, faAngleDown, faAngleUp
} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import { Provider } from 'react-redux'
import store from './store'

import Planner from './pages/planner/Planner';

library.add(faHome, faCopy, faTrashAlt, faDownload, faSlidersH, faQuestionCircle,
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
}

export default App;

