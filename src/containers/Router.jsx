import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from '../components/App';
import Signin from '../containers/SignIn';

/**
 * @name Router
 * @summary Renders the application routes
 * @return {jsx} React node for the application routes
 */
const Router = () => (
  <BrowserRouter>
    <Route path='/' exact component={Signin} />
    <Route path='/my-activities' exact component={App} />
  </BrowserRouter>
);

export default Router;
