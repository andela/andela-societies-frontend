import React from 'react';
// <<<<<<< HEAD
// import { BrowserRouter, Switch, Route } from 'react-router-dom';

// // eslint-disable-next-line import/no-named-as-default
// import HomeComponent from './app/Home/components/HomeComponent';

// const Router = () => (
//   <BrowserRouter>
//     <Switch>
//       <Route path='/home' component={HomeComponent} />
// =======
import {
  Route,
  Switch,
  BrowserRouter,
} from 'react-router-dom';

import { HomeComponent } from './app/Home/components/HomeComponent';
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
      {/* >>>>>>> origin/ft-login */}
    </Switch>
  </BrowserRouter>
);

export default Router;
