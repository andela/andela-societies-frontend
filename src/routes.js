import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter,
} from 'react-router-dom';

import { HomeComponent } from './app/Home/components/HomeComponent';
import LoginComponent from './app/Login/components';
import DashboardComponent from './app/Dashboard/components';
import AuthenticateRoute from './app/Authentication/components';

import tokenIsValid from './app/utils';

/**
 * @name Router
 * Handles routing
 */
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={LoginComponent} />
      <AuthenticateRoute
        isAuthenticated={tokenIsValid()}
        path='/home'
        component={HomeComponent}
      />
      <AuthenticateRoute
        isAuthenticated={tokenIsValid()}
        path='/dashboard'
        component={DashboardComponent}
      />
    </Switch>
  </BrowserRouter>
);

export default Router;
