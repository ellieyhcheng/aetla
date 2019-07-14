import React, { Component } from 'react';
import './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faCopy, faTrashAlt, faDownload, faSlidersH, faQuestionCircle,
  faCog, faPowerOff  } from '@fortawesome/free-solid-svg-icons';

import Navbar from './components/navbar/Navbar';

library.add( faHome, faCopy, faTrashAlt, faDownload, faSlidersH, faQuestionCircle,
  faCog, faPowerOff );

class App extends Component {

  render() {
    return (
      <div>
        <Navbar/>
        
      </div>
    )
  }
}

export default App;

