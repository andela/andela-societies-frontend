import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter,
} from 'react-router-dom';

import HomeComponent from './app/Home/components';
import LoginComponent from './app/Login/components';
import AuthenticateRoute from './app/Authentication/components';

import tokenIsValid from './app/utils';

/**
 * @name Router
 * Handles routing
 */
const Router = () => (
  <BrowserRouter>
    <Switch>
      <AuthenticateRoute
        isAuthenticated={tokenIsValid()}
        path='/home'
        component={HomeComponent}
      />
      <Route exact path='/' component={LoginComponent} />
    </Switch>
  </BrowserRouter>
);

export default Router;
