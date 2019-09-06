import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './store'
import * as serviceWorker from './serviceWorker';

import Firebase, { FirebaseContext } from './Firebase';
import APIClient, { ApiClientContext } from './ApiClient';
import 'semantic-ui-less/semantic.less'

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <ApiClientContext.Provider value={new APIClient()}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApiClientContext.Provider>
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
