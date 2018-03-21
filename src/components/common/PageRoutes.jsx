import React from 'react';
import { Route } from 'react-router-dom';
import App from '../../containers/App';

const pages = [
  'my-activities',
  'verify-activities',
];

const PageRoutes = () => (
  pages.map(page => (
    <Route path={`/u/${page}/`} component={App} key={page} />
  ))
);

export default PageRoutes;
