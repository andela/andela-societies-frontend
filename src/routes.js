import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter,
} from 'react-router-dom';

import LoginContainer from './app/Login/components';
import DashboardContainer from './app/Dashboard/components';
import SocietiesContainer from './app/Societies/components';
import AuthenticateRoute from './app/Authentication/components';
import RedemptionsContainer from './app/Redemptions/components';
import VerifyActivitiesContainer from './app/VerifyActivities/components';

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
        userInfo={token.UserInfo}
        path='/dashboard'
        component={DashboardContainer}
      />
      <AuthenticateRoute
        isAuthenticated={tokenIsValid(token)}
        userInfo={token.UserInfo}
        path='/verify-activities'
        component={VerifyActivitiesContainer}
      />
      <AuthenticateRoute
        isAuthenticated={tokenIsValid(token)}
        userInfo={token.UserInfo}
        path='/redemptions'
        component={RedemptionsContainer}
      />
      <AuthenticateRoute
        isAuthenticated={tokenIsValid(token)}
        userInfo={token.UserInfo}
        path='/:society'
        component={SocietiesContainer}
      />
    </Switch>
  </BrowserRouter>
);

export default Router;
