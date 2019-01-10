import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';


import { Provider } from 'react-redux';
import configureStore from './store';
// eslint-disable-next-line import/no-named-as-default
import HomeComponent from './app/Home/components/HomeComponent';

import './styles/main.scss';

const store = configureStore();

render(
  <Provider store={store}>
    <Router>
      <HomeComponent />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
