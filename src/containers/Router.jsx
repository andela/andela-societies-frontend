import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './App';
import Signin from '../containers/SignIn';

/**
 * @name Router
 * @summary Renders the application routes
 * @return {jsx} React node for the application routes
 */
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Signin} />
      <Route path='/my-activities' exact component={App} />
    </Switch>
  </BrowserRouter>
);

export default Router;
