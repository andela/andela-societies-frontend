import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomeComponent from './app/Home/components';
import LoginComponent from './app/Login/components';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/home' component={HomeComponent} />
      <Route path='/' component={LoginComponent} />
    </Switch>
  </BrowserRouter>
);

export default Router;
