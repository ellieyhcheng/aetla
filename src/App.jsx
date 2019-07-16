import React, { Component } from 'react';
import './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome, faCopy, faTrashAlt, faDownload, faSlidersH, faQuestionCircle,
  faCog, faPowerOff
} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Toolbar from './components/toolbar/Toolbar';
import Planner from './components/pages/Planner';

library.add(faHome, faCopy, faTrashAlt, faDownload, faSlidersH, faQuestionCircle,
  faCog, faPowerOff);

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Planner/>
          
        </div>
        
      </Router>
    )
  }
}

export default App;

