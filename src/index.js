import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
//import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import ChartsApp from './reducers/reducers.js';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

let store = createStore(ChartsApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
   document.getElementById('root')
  );
