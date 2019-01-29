// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap';

import Router from './routes';
import configureStore from './store';

import './styles/main.scss';

const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>, document.getElementById('root'),
);
