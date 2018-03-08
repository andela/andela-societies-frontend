import React from 'react';
import { Route } from 'react-router-dom';

import App from './components/App';
import Signin from './containers/SignIn';

/**
 * @name Routes
 * @summary Renders the application routes
 * @return {jsx} React node for the application routes
 */
const Routes = () => (
  <div>
    <Route path='/' exact component={Signin} />
    <Route path='/my-activities' exact component={App} />
  </div>
);

export default Routes;
