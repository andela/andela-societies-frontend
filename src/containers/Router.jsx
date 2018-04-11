import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Signin from '../containers/SignIn';
import pageInfo from '../helpers/pageInfo';


/**
 * @name Router
 * @summary Renders the application routes
 * @return {jsx} React node for the application routes
 */
const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Signin} />
      {
        pageInfo.pages.map(pageInfoData => (
          <Route
            path={pageInfoData.url}
            exact
            component={pageInfoData.component}
            key={pageInfoData.title}
          />
        ))
      }
    </Switch>
  </BrowserRouter>
);

export default Router;
