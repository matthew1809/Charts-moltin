import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import store from './store';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
//import registerServiceWorker from './registerServiceWorker';

render(
  <Provider store={store}>
    <App />
  </Provider>,
   document.getElementById('root')
  );
