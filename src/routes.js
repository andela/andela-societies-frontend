import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter,
} from 'react-router-dom';

import { HomeComponent } from './app/Home/components/HomeComponent';
import LoginContainer from './app/Login/components';
import DashboardContainer from './app/Dashboard/components';
import AuthenticateRoute from './app/Authentication/components';

import { tokenIsValid, getToken } from './app/utils';

const token = getToken();
/**
 * @name Router
 * Handles routing
 */
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={LoginContainer} />
      <AuthenticateRoute
        isAuthenticated={tokenIsValid(token)}
        path='/home'
        component={HomeComponent}
      />
      <AuthenticateRoute
        isAuthenticated={tokenIsValid(token)}
        path='/dashboard'
        component={DashboardContainer}
      />
    </Switch>
  </BrowserRouter>
);

export default Router;
