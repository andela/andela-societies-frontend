import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// eslint-disable-next-line import/no-named-as-default
import HomeComponent from './app/Home/components/HomeComponent';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/home' component={HomeComponent} />
    </Switch>
  </BrowserRouter>
);

export default Router;
