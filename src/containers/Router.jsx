import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PageRoutes from '../components/common/PageRoutes';

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
      <PageRoutes />
    </Switch>
  </BrowserRouter>
);

export default Router;
